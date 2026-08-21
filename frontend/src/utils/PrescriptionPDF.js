import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePrescription = (record) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(0, 102, 153);
  doc.text("MediCare Hospital", 20, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Professional Healthcare Services", 20, 27);

  doc.setDrawColor(0, 102, 153);
  doc.line(20, 32, 190, 32);

  autoTable(doc, {
    startY: 40,
    theme: "grid",
    body: [
      ["OP Number", record.op_number],
      ["Patient", record.patient_name],
      ["Age", record.age],
      ["Gender", record.gender],
      ["Doctor", record.doctor_name],
      ["Department", record.specialization],
    ],
  });

  let y = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(14);
  doc.text("Diagnosis", 20, y);

  doc.setFontSize(11);
  doc.text(record.diagnosis || "-", 20, y + 8);

  y += 25;

  doc.setFontSize(14);
  doc.text("Prescription", 20, y);

  doc.setFontSize(11);
  doc.text(record.prescription || "-", 20, y + 8);

  y += 35;

  doc.setFontSize(14);
  doc.text("Doctor Notes", 20, y);

  doc.setFontSize(11);
  doc.text(record.notes || "-", 20, y + 8);

  y += 30;

  doc.text(`Next Visit: ${record.next_visit || "Not Required"}`, 20, y);

  doc.line(120, y + 25, 185, y + 25);
  doc.text("Doctor Signature", 130, y + 32);

  doc.save(`${record.op_number}-Prescription.pdf`);
};