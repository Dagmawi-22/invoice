// pages/index.tsx
import React from "react";
import InvoiceTable from "../components/InvoiceTable";
import { Invoice } from "./interfaces/interface";

const sampleInvoices: Invoice[] = [
  {
    invoiceNumber: "INV-001",
    clientName: "Client A",
    items: [
      { description: "Item 1", amount: 100 },
      { description: "Item 2", amount: 200 },
    ],
    totalAmount: 300,
    dueDate: "2024-08-01",
  },
  {
    invoiceNumber: "INV-002",
    clientName: "Client B",
    items: [
      { description: "Item 1", amount: 150 },
      { description: "Item 2", amount: 250 },
    ],
    totalAmount: 400,
    dueDate: "2024-09-01",
  },
];

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center my-4 text-gray-700">
        Invoice Listing
      </h1>
      <InvoiceTable invoices={sampleInvoices} />
    </div>
  );
};

export default Home;
