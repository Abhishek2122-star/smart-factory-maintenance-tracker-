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

  const deleteRecord = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updatedLogs = logs.filter((log) => log.id !== id);
      localStorage.setItem("maintenance_logs", JSON.stringify(updatedLogs));
      setLogs(updatedLogs);
      alert("✅ Record deleted successfully!");
    }
  };

  const completeRecord = (id) => {
    const updatedLogs = logs.map((log) => {
      if (log.id === id) {
        return { ...log, status: "completed", completedDate: new Date().toISOString() };
      }
      return log;
    });
    localStorage.setItem("maintenance_logs", JSON.stringify(updatedLogs));
    setLogs(updatedLogs);
    alert("✅ Record marked as completed!");
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
    <div style={{ padding: "30px 20px" }}>
      <h1 style={{ 
        fontSize: "2.2rem", 
        marginBottom: "10px",
        color: "#2c3e50",
      }}>
        🏭 Factory Maintenance Dashboard
      </h1>
      <p style={{ 
        color: "#555", 
        marginBottom: "30px",
        fontSize: "1rem",
        fontWeight: "500",
      }}>
        📊 Total Machines Logged: <strong style={{ color: "#3498db", fontSize: "1.1rem" }}>{logs.length}</strong>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            padding: "25px",
            background: "#27ae60",
            borderRadius: "10px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <h3 style={{ margin: "0 0 12px 0", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>✅ On Time</h3>
          <div style={{ fontSize: "3rem", fontWeight: "800" }}>
            {onTimeCount}
          </div>
        </div>

        <div
          style={{
            padding: "25px",
            background: "#f39c12",
            borderRadius: "10px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <h3 style={{ margin: "0 0 12px 0", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>⚠️ Due Soon</h3>
          <div style={{ fontSize: "3rem", fontWeight: "800" }}>
            {dueSoonCount}
          </div>
        </div>

        <div
          style={{
            padding: "25px",
            background: "#e74c3c",
            borderRadius: "10px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <h3 style={{ margin: "0 0 12px 0", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>🔴 Overdue</h3>
          <div style={{ fontSize: "3rem", fontWeight: "800" }}>
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
                  <th style={{ padding: "12px", textAlign: "center", fontWeight: "bold" }}>
                    Actions
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
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() => completeRecord(log.id)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          title="Mark as completed"
                        >
                          ✓ Done
                        </button>
                        <button
                          onClick={() => deleteRecord(log.id)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          title="Delete record"
                        >
                          🗑️ Delete
                        </button>
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
