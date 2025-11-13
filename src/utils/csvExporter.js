// CSV Export Utility
export const exportToCSV = (logs, filename = "maintenance_logs.csv") => {
  if (logs.length === 0) {
    alert("No data to export!");
    return;
  }

  // CSV Header
  const headers = [
    "Machine Name",
    "Date",
    "Readings",
    "Issue",
    "Technician",
    "Next Due",
    "Status",
    "Maintenance Interval (days)",
  ];

  // CSV Body
  const rows = logs.map((log) => [
    log.machineName,
    log.date || "",
    log.readings && log.readings.length > 0 ? `"${log.readings.join(", ")}"` : "",
    log.issue ? `"${log.issue}"` : "",
    log.technician || "",
    log.nextDue || "",
    log.status || "",
    log.maintenanceInterval || "30",
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
