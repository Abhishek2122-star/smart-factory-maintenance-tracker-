import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateMaintenanceReport = (logs) => {
  const doc = new jsPDF();
  doc.text("Smart Factory Maintenance Report", 14, 20);
  const tableData = logs.map((log) => [
    log.machineName,
    log.date,
    log.issue,
    log.technician,
    log.nextDue
  ]);
  doc.autoTable({
    startY: 30,
    head: [["Machine", "Date", "Issue", "Technician", "Next Due"]],
    body: tableData,
  });
  doc.save("maintenance_report.pdf");
};
