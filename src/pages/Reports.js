import React, { useEffect, useState } from "react";
import { generateMaintenanceReport } from "../utils/pdfGenerator";
import { exportToCSV } from "../utils/csvExporter";

const Reports = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = () => {
      try {
        const data = localStorage.getItem("maintenance_logs");
        const logs = data ? JSON.parse(data) : [];
        // Sort by timestamp descending
        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setLogs(logs);
        setFilteredLogs(logs);

        // Extract unique machine names
        const uniqueMachines = [...new Set(logs.map((log) => log.machineName))];
        setMachines(uniqueMachines);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    let filtered = logs;

    // Filter by machine
    if (selectedMachine !== "all") {
      filtered = filtered.filter((log) => log.machineName === selectedMachine);
    }

    // Filter by search text (machine name or technician)
    if (searchText.trim()) {
      filtered = filtered.filter(
        (log) =>
          log.machineName.toLowerCase().includes(searchText.toLowerCase()) ||
          log.technician.toLowerCase().includes(searchText.toLowerCase()) ||
          (log.issue && log.issue.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter((log) => log.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter((log) => log.date <= endDate);
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((log) => getStatus(log.nextDue) === statusFilter);
    }

    setFilteredLogs(filtered);
  }, [selectedMachine, searchText, startDate, endDate, statusFilter, logs]);

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
        return { bg: "#d4edda", text: "#155724" };
      case "Due Soon":
        return { bg: "#fff3cd", text: "#856404" };
      case "Overdue":
        return { bg: "#f8d7da", text: "#721c24" };
      default:
        return { bg: "#e2e3e5", text: "#383d41" };
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>📊 Maintenance Reports</h1>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>🔍 Filters</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <div>
            <label htmlFor="machineFilter" style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Machine:
            </label>
            <select
              id="machineFilter"
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
                width: "100%",
              }}
            >
              <option value="all">All Machines</option>
              {machines.map((machine) => (
                <option key={machine} value={machine}>
                  {machine}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="searchFilter" style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Search (Machine/Technician/Issue):
            </label>
            <input
              id="searchFilter"
              type="text"
              placeholder="Type to search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label htmlFor="statusFilter" style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Status:
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
                width: "100%",
              }}
            >
              <option value="all">All Statuses</option>
              <option value="On Time">On Time ✅</option>
              <option value="Due Soon">Due Soon ⚠️</option>
              <option value="Overdue">Overdue 🔴</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Start Date:
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label htmlFor="endDate" style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              End Date:
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
            <button
              onClick={() => {
                setSelectedMachine("all");
                setSearchText("");
                setStartDate("");
                setEndDate("");
                setStatusFilter("all");
              }}
              style={{
                padding: "8px 15px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                flex: 1,
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "10px",
          }}
        >
          <button
            onClick={() => generateMaintenanceReport(filteredLogs)}
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            📥 Export PDF
          </button>
          <button
            onClick={() => exportToCSV(filteredLogs, `maintenance_report_${new Date().getTime()}.csv`)}
            style={{
              padding: "10px 15px",
              backgroundColor: "#17a2b8",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            📊 Export CSV
          </button>
        </div>

        <p style={{ marginTop: "15px", color: "#666" }}>
          Total Records: <strong>{filteredLogs.length}</strong> / {logs.length}
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "#999" }}>Loading reports...</p>
      ) : filteredLogs.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
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
                  Readings
                </th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                  Issue
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
              {filteredLogs.map((log) => {
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
                    <td style={{ padding: "12px" }}>
                      <strong>{log.machineName}</strong>
                    </td>
                    <td style={{ padding: "12px" }}>
                      {new Date(log.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "12px", fontSize: "12px" }}>
                      {log.readings && log.readings.length > 0
                        ? log.readings.join(", ")
                        : "N/A"}
                    </td>
                    <td style={{ padding: "12px", fontSize: "12px", maxWidth: "200px" }}>
                      {log.issue || "N/A"}
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
      ) : (
        <p style={{ textAlign: "center", color: "#999", marginTop: "40px" }}>
          No maintenance logs found. Start logging maintenance records!
        </p>
      )}
    </div>
  );
};

export default Reports;
