import React, { useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { calculateNextDueDate } from "../utils/calculateNextDue";

const AddMaintenance = () => {
  const [form, setForm] = useState({
    machineName: "",
    date: "",
    issue: "",
    technician: "",
    nextDue: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextDue = calculateNextDueDate(form.date);
    await addDoc(collection(db, "maintenance_logs"), { ...form, nextDue });
    alert("Maintenance record added successfully!");
    setForm({ machineName: "", date: "", issue: "", technician: "", nextDue: "" });
  };

  return (
    <div className="form-container">
      <h2>Add Maintenance Record</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Machine Name"
          value={form.machineName}
          onChange={(e) => setForm({ ...form, machineName: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Issue Found"
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })}
        />
        <input
          type="text"
          placeholder="Technician Name"
          value={form.technician}
          onChange={(e) => setForm({ ...form, technician: e.target.value })}
        />
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default AddMaintenance;
