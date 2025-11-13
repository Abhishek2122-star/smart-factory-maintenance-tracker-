import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Diagnostics = () => {
  const [status, setStatus] = useState({
    firebaseConnected: "Checking...",
    canRead: "Checking...",
    canWrite: "Checking...",
    logs: [],
  });

  useEffect(() => {
    const runDiagnostics = async () => {
      console.log("=== STARTING DIAGNOSTICS ===");
      console.log("1. Firebase DB object:", db);

      // Test 1: Check if db exists
      if (!db) {
        setStatus((prev) => ({ ...prev, firebaseConnected: "❌ DB object is null/undefined" }));
        return;
      }
      setStatus((prev) => ({ ...prev, firebaseConnected: "✅ DB object exists" }));

      // Test 2: Try to read
      try {
        console.log("2. Attempting to read from maintenance_logs...");
        const querySnapshot = await getDocs(collection(db, "maintenance_logs"));
        console.log("Documents found:", querySnapshot.size);
        setStatus((prev) => ({ ...prev, canRead: `✅ Can read (${querySnapshot.size} records)` }));
      } catch (error) {
        console.error("Read error:", error);
        setStatus((prev) => ({
          ...prev,
          canRead: `❌ ${error.message}`,
        }));
      }

      // Test 3: Try to write
      try {
        console.log("3. Attempting to write test document...");
        const testData = {
          test: true,
          timestamp: new Date().toISOString(),
          message: "This is a test document",
        };
        const docRef = await addDoc(collection(db, "maintenance_logs"), testData);
        console.log("Test document added with ID:", docRef.id);
        setStatus((prev) => ({
          ...prev,
          canWrite: `✅ Can write (ID: ${docRef.id})`,
        }));
      } catch (error) {
        console.error("Write error:", error);
        setStatus((prev) => ({
          ...prev,
          canWrite: `❌ ${error.message}`,
        }));
      }
    };

    runDiagnostics();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>🔍 Firebase Diagnostics</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "4px" }}>
          <strong>Firebase Connection:</strong>
          <p>{status.firebaseConnected}</p>
        </div>
        <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "4px" }}>
          <strong>Read Permission:</strong>
          <p>{status.canRead}</p>
        </div>
        <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "4px" }}>
          <strong>Write Permission:</strong>
          <p>{status.canWrite}</p>
        </div>
        <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
          <strong>📋 Instructions:</strong>
          <ol>
            <li>Check browser console (F12 → Console tab)</li>
            <li>Look for "=== STARTING DIAGNOSTICS ===" message</li>
            <li>Check all test results above</li>
            <li>If Write fails: Check Firebase Firestore rules</li>
            <li>If Connection fails: Check Firebase config credentials</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
