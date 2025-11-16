import React, { useEffect, useState } from "react";

const SpareParts = () => {
  const [parts, setParts] = useState([]);
  const [form, setForm] = useState({
    partName: "",
    quantity: "",
    cost: "",
    machineUsed: "",
    replacementDate: "",
    technician: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchParts = () => {
      try {
        const data = localStorage.getItem("spare_parts");
        const parts = data ? JSON.parse(data) : [];
        parts.sort((a, b) => new Date(b.replacementDate) - new Date(a.replacementDate));
        setParts(parts);
      } catch (error) {
        // Handle error silently
      }
    };
    fetchParts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "cost" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.partName || !form.quantity || !form.machineUsed) {
      setMessage("❌ Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
      const partEntry = {
        id: Date.now().toString(),
        ...form,
        quantity: parseFloat(form.quantity),
        cost: parseFloat(form.cost) || 0,
        timestamp: new Date().toISOString(),
      };

      // Get existing parts
      const existing = localStorage.getItem("spare_parts");
      const parts = existing ? JSON.parse(existing) : [];
      
      // Add new part
      parts.push(partEntry);
      
      // Save back
      localStorage.setItem("spare_parts", JSON.stringify(parts));
      
      setParts([partEntry, ...parts]);
      setMessage("✅ Spare part recorded successfully!");
      setForm({
        partName: "",
        quantity: "",
        cost: "",
        machineUsed: "",
        replacementDate: "",
        technician: "",
        notes: "",
      });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Error recording part: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    return {
      totalParts: parts.length,
      totalCost: parts.reduce((sum, p) => sum + (p.cost || 0), 0),
      totalQuantity: parts.reduce((sum, p) => sum + (p.quantity || 0), 0),
      uniqueParts: new Set(parts.map((p) => p.partName)).size,
    };
  };

  const stats = calculateStats();

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>🔧 Spare Parts Management</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            padding: "15px",
            backgroundColor: "#e7f3ff",
            border: "2px solid #0066cc",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#666" }}>Total Records</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0066cc" }}>
            {stats.totalParts}
          </div>
        </div>

        <div
          style={{
            padding: "15px",
            backgroundColor: "#fff3e0",
            border: "2px solid #ff9800",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#666" }}>Total Cost</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#ff9800" }}>
            ${stats.totalCost.toFixed(2)}
          </div>
        </div>

        <div
          style={{
            padding: "15px",
            backgroundColor: "#f3e5f5",
            border: "2px solid #9c27b0",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#666" }}>Unique Parts</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#9c27b0" }}>
            {stats.uniqueParts}
          </div>
        </div>

        <div
          style={{
            padding: "15px",
            backgroundColor: "#e8f5e9",
            border: "2px solid #4caf50",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#666" }}>Total Items</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#4caf50" }}>
            {stats.totalQuantity}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }}>
        {/* Form */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <h2>📝 Record New Part</h2>
          {message && (
            <div
              style={{
                padding: "10px",
                margin: "10px 0",
                borderRadius: "4px",
                backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
                color: message.includes("✅") ? "#155724" : "#721c24",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label htmlFor="partName" style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>
                Part Name *
              </label>
              <input
                id="partName"
                type="text"
                name="partName"
                placeholder="e.g., Bearing, Belt, Seal"
                value={form.partName}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label htmlFor="quantity" style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>
                  Quantity *
                </label>
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  placeholder="0"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  step="0.1"
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                />
              </div>
              <div>
                <label htmlFor="cost" style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>
                  Cost ($)
                </label>
                <input
                  id="cost"
                  type="number"
                  name="cost"
                  placeholder="0.00"
                  value={form.cost}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="machineUsed" style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>
                Machine Used *
              </label>
              <input
                id="machineUsed"
                type="text"
                name="machineUsed"
                placeholder="e.g., CNC-01"
                value={form.machineUsed}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </div>

            <div>
              <label htmlFor="replacementDate" style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>
                Replacement Date
              </label>
              <input
                id="replacementDate"
                type="date"
                name="replacementDate"
                value={form.replacementDate}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </div>

            <div>
              <label htmlFor="technician" style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>
                Technician
              </label>
              <input
                id="technician"
                type="text"
                name="technician"
                placeholder="Your name"
                value={form.technician}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </div>

            <div>
              <label htmlFor="notes" style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Additional notes..."
                value={form.notes}
                onChange={handleChange}
                rows="3"
                style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px",
                backgroundColor: loading ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              {loading ? "Recording..." : "✅ Record Part"}
            </button>
          </form>
        </div>

        {/* History */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <h2>📋 Recent Parts</h2>
          {parts.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {parts.slice(0, 10).map((part) => (
                <div
                  key={part.id}
                  style={{
                    backgroundColor: "white",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                >
                  <div style={{ fontWeight: "bold", color: "#007bff" }}>{part.partName}</div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                    <div>Machine: <strong>{part.machineUsed}</strong></div>
                    <div>Qty: <strong>{part.quantity}</strong> | Cost: <strong>${(part.cost || 0).toFixed(2)}</strong></div>
                    <div>Date: <strong>{part.replacementDate || "N/A"}</strong></div>
                    {part.notes && <div style={{ marginTop: "4px", fontStyle: "italic" }}>{part.notes}</div>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#999" }}>No spare parts recorded yet.</p>
          )}
        </div>
      </div>

      {/* Full History Table */}
      {parts.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>📊 All Parts History</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
              <thead>
                <tr style={{ backgroundColor: "#2d72b6ff", borderBottom: "2px solid #dee2e6" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Part Name</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Quantity</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Cost</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Machine</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Date</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Technician</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((part) => (
                  <tr key={part.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td style={{ padding: "12px" }}>
                      <strong>{part.partName}</strong>
                    </td>
                    <td style={{ padding: "12px" }}>{part.quantity}</td>
                    <td style={{ padding: "12px" }}>${(part.cost || 0).toFixed(2)}</td>
                    <td style={{ padding: "12px" }}>{part.machineUsed}</td>
                    <td style={{ padding: "12px" }}>
                      {part.replacementDate ? new Date(part.replacementDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td style={{ padding: "12px" }}>{part.technician || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpareParts;
