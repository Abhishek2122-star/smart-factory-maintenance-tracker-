import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { calculateNextDueDate } from "../utils/calculateNextDue";

const AddMaintenance = () => {
  const [form, setForm] = useState({
    machineName: "",
    date: "",
    readings: "",
    issue: "",
    technician: "",
    maintenanceInterval: 30,
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "maintenanceInterval" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.machineName || !form.date || !form.technician) {
      setMessage("❌ Please fill all required fields!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);
    try {
      const nextDue = calculateNextDueDate(form.date, form.maintenanceInterval);

      const logEntry = {
        ...form,
        nextDue,
        timestamp: new Date().toISOString(),
        readings: form.readings ? form.readings.split(",").map((r) => r.trim()) : [],
        status: form.status || "Pending",
      };

      // Add to Firebase Firestore
      await addDoc(collection(db, "maintenance_logs"), logEntry);

      setMessage("✅ Maintenance record added successfully!");
      setForm({
        machineName: "",
        date: "",
        readings: "",
        issue: "",
        technician: "",
        maintenanceInterval: 30,
        status: "Pending",
      });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error adding record: " + error.message);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>📋 Log Daily Machine Maintenance</h2>
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
          <label htmlFor="machineName">Machine Name *</label>
          <input
            id="machineName"
            type="text"
            name="machineName"
            placeholder="e.g., CNC-01, Lathe-02"
            value={form.machineName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div>
          <label htmlFor="date">Maintenance Date *</label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div>
          <label htmlFor="readings">Machine Readings (comma-separated)</label>
          <input
            id="readings"
            type="text"
            name="readings"
            placeholder="e.g., Temperature: 85°C, RPM: 1200, Pressure: 150 PSI"
            value={form.readings}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div>
          <label htmlFor="issue">Issue Found</label>
          <textarea
            id="issue"
            name="issue"
            placeholder="Describe any issues or observations"
            value={form.issue}
            onChange={handleChange}
            rows="3"
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div>
          <label htmlFor="technician">Technician Name *</label>
          <input
            id="technician"
            type="text"
            name="technician"
            placeholder="Your name"
            value={form.technician}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label htmlFor="maintenanceInterval">Maintenance Interval (days)</label>
            <input
              id="maintenanceInterval"
              type="number"
              name="maintenanceInterval"
              value={form.maintenanceInterval}
              onChange={handleChange}
              min="1"
              max="365"
              style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
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
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Adding..." : "✅ Add Maintenance Record"}
        </button>
      </form>
    </div>
  );
};

export default AddMaintenance;
