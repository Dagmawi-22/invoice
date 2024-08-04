"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Invoice } from "@/app/interfaces/interface";

const InvoiceTable: React.FC<{ invoices: Invoice[] }> = ({ invoices }) => {
  const [filterText, setFilterText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.clientName.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "Invoice Number", selector: (row: Invoice) => row.invoiceNumber },
    { name: "Client Name", selector: (row: Invoice) => row.clientName },
    { name: "Total Amount", selector: (row: Invoice) => row.totalAmount },
    { name: "Due Date", selector: (row: Invoice) => row.dueDate },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by client name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 text-black"
      />
      <DataTable columns={columns} data={filteredInvoices} pagination />
    </div>
  );
};

export default InvoiceTable;
