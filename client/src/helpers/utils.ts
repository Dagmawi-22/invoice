import { Invoice } from "@/app/interfaces/interface";
import * as XLSX from "xlsx";

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
