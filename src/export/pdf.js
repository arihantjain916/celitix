import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (col, row, name) => {
  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

  pdf.setFont("Arial");

  pdf.text(name, 20, 20);

  autoTable(pdf, {
    head: [col],
    body: row,
    startY: 30,
    styles: { fontSize: 10, textColor: [50, 50, 50] },
    headStyles: { fillColor: [244, 244, 244], textColor: 0, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [249, 249, 249] },
    margin: { top: 30 },
  });

  pdf.save(`${name}.pdf`);
};
