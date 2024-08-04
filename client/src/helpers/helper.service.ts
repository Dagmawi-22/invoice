import { Invoice } from "@/app/interfaces/interface";
import API_BASE_URL from "../../public/config";

export const getInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`);
    const data: Invoice[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch invoices", error);
    return [];
  }
};

export const createInvoice = async (invoiceData: Invoice): Promise<Invoice> => {
  const response = await fetch(`${API_BASE_URL}/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });

  if (!response.ok) {
    throw new Error("Failed to create invoice");
  }

  return response.json();
};

export const updateInvoice = async (
  id: string,
  invoiceData: Invoice
): Promise<Invoice> => {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });

  if (!response.ok) {
    throw new Error("Failed to update invoice");
  }

  return response.json();
};

export const deleteInvoice = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete invoice");
  }
};
