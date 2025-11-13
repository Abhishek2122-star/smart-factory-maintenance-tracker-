import React, { useEffect, useState } from "react";
import MaintenanceStatusChart from "../Component/charts/MaintenanceStatusChart";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = () => {
      try {
        const data = localStorage.getItem("maintenance_logs");
        const logs = data ? JSON.parse(data) : [];
        // Sort by timestamp descending
        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setLogs(logs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getStatus = (nextDueDate) => {
    if (!nextDueDate) return "Pending";
    const today = new Date().toISOString().split("T")[0];
    const daysUntilDue = Math.ceil(
      (new Date(nextDueDate) - new Date(today)) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDue < 0) return "Overdue";
    if (daysUntilDue <= 7) return "Due Soon";
    return "On Time";
  };

  const countByStatus = (status) => {
    return logs.filter((log) => getStatus(log.nextDue) === status).length;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On Time":
        return { bg: "#d4edda", text: "#155724", border: "#c3e6cb" };
      case "Due Soon":
        return { bg: "#fff3cd", text: "#856404", border: "#ffeaa7" };
      case "Overdue":
        return { bg: "#f8d7da", text: "#721c24", border: "#f5c6cb" };
      default:
        return { bg: "#e2e3e5", text: "#383d41", border: "#d6d8db" };
    }
  };

  const onTimeCount = countByStatus("On Time");
  const dueSoonCount = countByStatus("Due Soon");
  const overdueCount = countByStatus("Overdue");

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏭 Factory Maintenance Dashboard</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Total Machines Logged: <strong>{logs.length}</strong>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#d4edda",
            border: "2px solid #155724",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#155724", margin: "0 0 10px 0" }}>✅ On Time</h3>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#155724" }}>
            {onTimeCount}
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff3cd",
            border: "2px solid #856404",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#856404", margin: "0 0 10px 0" }}>⚠️ Due Soon</h3>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#856404" }}>
            {dueSoonCount}
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8d7da",
            border: "2px solid #721c24",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#721c24", margin: "0 0 10px 0" }}>🔴 Overdue</h3>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#721c24" }}>
            {overdueCount}
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading maintenance logs...</p>
      ) : logs.length > 0 ? (
        <>
          <h2>📊 Maintenance Status Chart</h2>
          <MaintenanceStatusChart data={logs} />

          <h2 style={{ marginTop: "30px" }}>📝 Recent Maintenance Logs</h2>
          <div
            style={{
              overflowX: "auto",
              marginTop: "15px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderBottom: "2px solid #dee2e6",
                  }}
                >
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                    Machine
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                    Date
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                    Technician
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                    Next Due
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.slice(0, 10).map((log) => {
                  const status = getStatus(log.nextDue);
                  const colors = getStatusColor(status);
                  return (
                    <tr
                      key={log.id}
                      style={{
                        borderBottom: "1px solid #dee2e6",
                        backgroundColor: colors.bg,
                      }}
                    >
                      <td style={{ padding: "12px" }}><strong>{log.machineName}</strong></td>
                      <td style={{ padding: "12px" }}>
                        {new Date(log.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "12px" }}>{log.technician}</td>
                      <td style={{ padding: "12px" }}>
                        {log.nextDue
                          ? new Date(log.nextDue).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "bold",
                          color: colors.text,
                        }}
                      >
                        {status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#999", marginTop: "40px" }}>
          No maintenance logs yet. Start by adding a log!
        </p>
      )}
    </div>
  );
};

export default Dashboard;
