import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import MaintenanceStatusChart from "../Component/charts/MaintenanceStatusChart";

const Dashboard = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      const querySnapshot = await getDocs(collection(db, "machines"));
      setMachines(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchMachines();
  }, []);

  const countByStatus = (status) =>
    machines.filter((m) => m.status === status).length;

  return (
    <div className="p-6">
      <h2>Factory Maintenance Dashboard</h2>
      <div className="stats-grid">
        <div className="card green">On Time: {countByStatus("On Time")}</div>
        <div className="card yellow">Due Soon: {countByStatus("Due Soon")}</div>
        <div className="card red">Overdue: {countByStatus("Overdue")}</div>
      </div>

      <MaintenanceStatusChart data={machines} />
    </div>
  );
};

export default Dashboard;
