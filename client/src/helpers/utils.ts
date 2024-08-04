import { Invoice } from "@/app/interfaces/interface";
import * as XLSX from "xlsx";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";

export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const handleExportToExcel = (invoices: Invoice[]) => {
  const worksheet = XLSX.utils.json_to_sheet(invoices);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: EXCEL_TYPE });
  const fileName = "invoices.xlsx";

  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleExportToPDF = (invoice: Invoice) => {
  const doc = new jsPDF();

  doc.setFont("Roboto", "normal");

  doc.setFontSize(16);
  doc.text("Demo Company", 20, 20);
  doc.setFontSize(12);
  doc.text("Gerji, Mebrat Hail", 20, 30);
  doc.text("Addis Ababa, 1000", 20, 35);
  doc.text("Phone: (251) 918 888 225", 20, 40);
  doc.text("email: dagmawi.teka22@gmail.com", 20, 45);

  doc.setFontSize(20);
  doc.text("Invoice", 20, 60);
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${invoice.id}`, 20, 70);
  doc.text(`Due Date: ${dayjs(invoice.dueDate).format("MMM D, YYYY")}`, 20, 75);

  doc.line(20, 80, 190, 80);

  const tableData = invoice.items.map((item) => [
    item.description,
    item.quantity,
    formatCurrency(item.price),
    formatCurrency(item.quantity * item.price),
  ]);

  doc.autoTable({
    head: [["Description", "Quantity", "Price", "Total"]],
    body: tableData,
    startY: 85,
    theme: "grid",
    styles: {
      cellPadding: 5,
      fontSize: 10,
    },
    headStyles: {
      fillColor: [22, 160, 133],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    margin: { left: 20, right: 20 },
  });

  const totalAmount = formatCurrency(invoice.totalAmount);
  doc.text(`Total Amount: ${totalAmount}`, 20, doc.lastAutoTable.finalY + 10);

  doc.setFontSize(10);
  doc.text("Thank you for your business!", 20, doc.lastAutoTable.finalY + 20);

  doc.save(`invoice_${invoice.id}.pdf`);
};
