import React, { useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const TestFirebase = () => {
  const [status, setStatus] = useState("Ready to test");
  const [loading, setLoading] = useState(false);

  const testSave = async () => {
    setLoading(true);
    setStatus("Testing...");

    try {
      console.log("1. Starting test...");
      console.log("2. DB object:", db);

      const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: "Test from diagnostics page",
      };

      console.log("3. Attempting to save:", testData);

      const docRef = await addDoc(collection(db, "maintenance_logs"), testData);

      console.log("4. SUCCESS! Document ID:", docRef.id);
      setStatus(`✅ SUCCESS! Saved with ID: ${docRef.id}`);
    } catch (error) {
      console.error("ERROR:", error);
      console.error("Code:", error.code);
      console.error("Message:", error.message);
      setStatus(`❌ ERROR: ${error.code} - ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h1>🧪 Firebase Test Page</h1>

      <div
        style={{
          padding: "20px",
          border: "2px solid #007bff",
          borderRadius: "8px",
          backgroundColor: "#f0f8ff",
          marginBottom: "20px",
        }}
      >
        <h2>Current Status:</h2>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{status}</p>
      </div>

      <button
        onClick={testSave}
        disabled={loading}
        style={{
          padding: "15px 30px",
          fontSize: "16px",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Testing..." : "🧪 Test Firebase Save"}
      </button>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <h3>📋 Instructions:</h3>
        <ol>
          <li>Click the "🧪 Test Firebase Save" button</li>
          <li>Check the status above</li>
          <li>
            Open browser console (F12) to see detailed logs
          </li>
          <li>
            If you see ✅ SUCCESS - Firebase is working and rules are correct
          </li>
          <li>
            If you see ❌ ERROR - Read the error code below:
          </li>
        </ol>

        <h3>Common Errors & Fixes:</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#ddd" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                Error Code
              </th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Fix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                permission-denied
              </td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                Update Firestore rules (allow write)
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                The default Firebase App does not exist
              </td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                Check firebaseConfig.js credentials
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                Network error
              </td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                Check internet connection
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#fffacd", borderRadius: "4px" }}>
        <strong>💡 Tip:</strong> If this test succeeds, then your Add Maintenance form should work. If it fails,
        you need to fix the issue shown above.
      </div>
    </div>
  );
};

export default TestFirebase;
