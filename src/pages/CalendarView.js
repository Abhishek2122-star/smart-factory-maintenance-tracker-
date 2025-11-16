import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

const CalendarView = () => {
  const [logs, setLogs] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Subscribe to real-time updates from Firestore
    const unsubscribe = onSnapshot(
      collection(db, "maintenance_logs"),
      (snapshot) => {
        const logsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLogs(logsData);
      },
      (error) => {
        // Handle error silently
      }
    );
    
    return () => unsubscribe();
  }, []);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return logs.filter((log) => {
      const logDate = new Date(log.nextDue).toISOString().split("T")[0];
      return logDate === dateStr;
    });
  };

  const getStatusColor = (nextDueDate) => {
    const today = new Date().toISOString().split("T")[0];
    const daysUntilDue = Math.ceil(
      (new Date(nextDueDate) - new Date(today)) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDue < 0) return "#f8d7da";
    if (daysUntilDue <= 7) return "#fff3cd";
    return "#d4edda";
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>📅 Maintenance Calendar</h1>

      <div style={{ marginBottom: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <button
            onClick={previousMonth}
            style={{
              padding: "8px 15px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ← Previous
          </button>
          <h2 style={{ margin: "0" }}>{monthName}</h2>
          <button
            onClick={nextMonth}
            style={{
              padding: "8px 15px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Next →
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              style={{
                padding: "10px",
                backgroundColor: "#e9ecef",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {day}
            </div>
          ))}

          {days.map((date, index) => {
            const events = date ? getEventsForDate(date) : [];
            const bgColor = events.length > 0 ? getStatusColor(events[0].nextDue) : "white";

            return (
              <div
                key={index}
                style={{
                  padding: "10px",
                  border: "1px solid #dee2e6",
                  backgroundColor: bgColor,
                  borderRadius: "4px",
                  minHeight: "80px",
                  cursor: events.length > 0 ? "pointer" : "default",
                }}
              >
                {date && (
                  <>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      {date.getDate()}
                    </div>
                    {events.length > 0 && (
                      <div style={{ fontSize: "11px" }}>
                        {events.map((event) => (
                          <div key={event.id} style={{ marginBottom: "3px", color: "#333" }}>
                            <strong>{event.machineName}</strong>
                            <br />
                            <small>{event.technician}</small>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
        <h2>📌 Legend</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#d4edda",
                borderRadius: "4px",
              }}
            />
            <span>✅ On Time (8+ days)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#fff3cd",
                borderRadius: "4px",
              }}
            />
            <span>⚠️ Due Soon (1-7 days)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#f8d7da",
                borderRadius: "4px",
              }}
            />
            <span>🔴 Overdue (0 days)</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "30px", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
        <h2>📋 Upcoming Maintenance (Next 30 Days)</h2>
        {logs.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#2973bcff", borderBottom: "2px solid #dee2e6" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Machine</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Due Date</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Days Left</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Technician</th>
                </tr>
              </thead>
              <tbody>
                {logs
                  .filter((log) => {
                    const daysLeft = Math.ceil(
                      (new Date(log.nextDue) - new Date()) / (1000 * 60 * 60 * 24)
                    );
                    return daysLeft >= 0 && daysLeft <= 30;
                  })
                  .sort(
                    (a, b) =>
                      new Date(a.nextDue) - new Date(b.nextDue)
                  )
                  .map((log) => {
                    const daysLeft = Math.ceil(
                      (new Date(log.nextDue) - new Date()) / (1000 * 60 * 60 * 24)
                    );
                    const bgColor = daysLeft <= 7 ? "#fff3cd" : "#d4edda";

                    return (
                      <tr key={log.id} style={{ backgroundColor: bgColor, borderBottom: "1px solid #dee2e6" }}>
                        <td style={{ padding: "10px" }}><strong>{log.machineName}</strong></td>
                        <td style={{ padding: "10px" }}>
                          {new Date(log.nextDue).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "10px", fontWeight: "bold" }}>
                          {daysLeft} days
                        </td>
                        <td style={{ padding: "10px" }}>{log.technician}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "#999" }}>No upcoming maintenance scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
