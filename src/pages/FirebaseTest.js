import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";

const FirebaseTest = () => {
  const [status, setStatus] = useState("Testing Firebase connection...");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const testFirebaseConnection = async () => {
    try {
      setStatus("🔄 Connecting to Firebase...");
      setErrors([]);
      
      console.log("📡 Attempting to connect to Firestore...");
      console.log("Database instance:", db);
      
      // Try real-time listener first
      const unsubscribe = onSnapshot(
        collection(db, "maintenance_logs"),
        (snapshot) => {
          console.log("✅ Real-time connection successful!");
          console.log("Snapshot docs:", snapshot.docs.length);
          
          const docs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setData(docs);
          setStatus(`✅ Connected! Found ${docs.length} records in Firestore`);
          setLoading(false);
          
          // Log each document
          docs.forEach((doc, index) => {
            console.log(`Document ${index}:`, doc);
          });
        },
        (error) => {
          console.error("❌ Firestore Error:", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          
          setErrors([...errors, `Error Code: ${error.code}`, `Message: ${error.message}`]);
          setStatus(`❌ Connection Error: ${error.message}`);
          setLoading(false);
        }
      );
      
      return unsubscribe;
    } catch (error) {
      console.error("Firebase Test Error:", error);
      setErrors([...errors, error.message]);
      setStatus(`❌ Error: ${error.message}`);
      setLoading(false);
    }
  };

  const addTestRecord = async () => {
    try {
      setStatus("Adding test record...");
      console.log("🔄 Attempting to add test record...");
      
      const testDoc = {
        machineName: "TEST-MACHINE-" + Date.now(),
        date: new Date().toISOString().split("T")[0],
        technician: "Test User",
        issue: "Test Issue",
        readings: ["100", "200"],
        maintenanceInterval: 30,
        nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        timestamp: new Date().toISOString(),
        status: "Pending"
      };

      console.log("📝 Test document:", testDoc);
      
      const docRef = await addDoc(collection(db, "maintenance_logs"), testDoc);
      
      console.log("✅ Document added successfully!");
      console.log("📄 Document ID:", docRef.id);
      
      // Refresh data
      await new Promise(resolve => setTimeout(resolve, 500));
      testFirebaseConnection();
      setStatus("✅ Test record added successfully! Check browser console (F12)");
    } catch (error) {
      console.error("❌ Error adding test record:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      setErrors([...errors, `Failed to add: ${error.code}`, `${error.message}`]);
      setStatus(`❌ Error adding record: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🔥 Firebase Connection Test</h1>
      
      <div style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "16px",
        fontWeight: "bold"
      }}>
        Status: {status}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={testFirebaseConnection}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
            fontSize: "14px"
          }}
        >
          🔄 Refresh Data
        </button>
        
        <button
          onClick={addTestRecord}
          style={{
            padding: "10px 20px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          ➕ Add Test Record
        </button>
      </div>

      <h2>📊 Records from Firebase</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p style={{ color: "#999" }}>No records found. Click "Add Test Record" to create one.</p>
      ) : (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Machine</th>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Date</th>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Technician</th>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(record => (
              <tr key={record.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{record.machineName}</td>
                <td style={{ padding: "10px" }}>{record.date}</td>
                <td style={{ padding: "10px" }}>{record.technician}</td>
                <td style={{ padding: "10px" }}>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#fffbea", borderRadius: "8px" }}>
        <h3>📋 Debug Info</h3>
        <p><strong>Total Records:</strong> {data.length}</p>
        <p><strong>Project ID:</strong> smart-factory-tracker-832a5</p>
        <p><strong>Collection:</strong> maintenance_logs</p>
        <p><strong>Status:</strong> {status}</p>
        
        {errors.length > 0 && (
          <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#f8d7da", borderRadius: "4px" }}>
            <h4>⚠️ Errors Found:</h4>
            <ul>
              {errors.map((err, idx) => (
                <li key={idx} style={{ color: "#721c24", fontSize: "12px", marginTop: "5px" }}>
                  {err}
                </li>
              ))}
            </ul>
            
            <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#fff3cd", borderRadius: "4px" }}>
              <strong>🔧 Fix:</strong> Go to Firebase Console and update Firestore Security Rules:
              <pre style={{ marginTop: "10px", fontSize: "11px", overflow: "auto" }}>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebaseTest;
