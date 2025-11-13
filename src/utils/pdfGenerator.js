import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateMaintenanceReport = (logs) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text("🏭 Smart Factory Maintenance Report", 14, 20);
  
  // Add date generated
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 28);
  doc.text(`Total Records: ${logs.length}`, 14, 34);
  
  // Add summary statistics
  const onTime = logs.filter(log => log.status === "On Time").length;
  const dueSoon = logs.filter(log => log.status === "Due Soon").length;
  const overdue = logs.filter(log => log.status === "Overdue").length;
  
  doc.setFontSize(11);
  doc.text("Summary:", 14, 42);
  doc.setFontSize(10);
  doc.text(`✅ On Time: ${onTime}`, 14, 48);
  doc.text(`⚠️ Due Soon: ${dueSoon}`, 14, 54);
  doc.text(`🔴 Overdue: ${overdue}`, 14, 60);
  
  // Add table
  const tableData = logs.map((log) => [
    log.machineName,
    new Date(log.date).toLocaleDateString(),
    log.readings && log.readings.length > 0 ? log.readings.join(", ") : "N/A",
    log.issue || "N/A",
    log.technician,
    log.nextDue ? new Date(log.nextDue).toLocaleDateString() : "N/A",
    log.status || "N/A",
  ]);

  doc.autoTable({
    startY: 68,
    head: [["Machine", "Date", "Readings", "Issue", "Technician", "Next Due", "Status"]],
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  // Save PDF
  const filename = `maintenance_report_${new Date().getTime()}.pdf`;
  doc.save(filename);
};

export const generateMachineReport = (machineName, logs) => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text(`🏭 Maintenance Report - ${machineName}`, 14, 20);
  
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 28);
  doc.text(`Total Records: ${logs.length}`, 14, 34);
  
  const tableData = logs.map((log) => [
    new Date(log.date).toLocaleDateString(),
    log.readings && log.readings.length > 0 ? log.readings.join(", ") : "N/A",
    log.issue || "N/A",
    log.technician,
    log.nextDue ? new Date(log.nextDue).toLocaleDateString() : "N/A",
  ]);

  doc.autoTable({
    startY: 42,
    head: [["Date", "Readings", "Issue", "Technician", "Next Due"]],
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
  });

  const filename = `${machineName}_report_${new Date().getTime()}.pdf`;
  doc.save(filename);
};
