"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Invoice } from "@/app/interfaces/interface";

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  const [filterText, setFilterText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredInvoices = isMounted
    ? invoices.filter((invoice) =>
        invoice.clientName.toLowerCase().includes(filterText.toLowerCase())
      )
    : invoices;

  const columns = [
    {
      name: "Invoice Number",
      selector: (row: Invoice) => row.invoiceNumber,
      sortable: true,
    },
    {
      name: "Client Name",
      selector: (row: Invoice) => row.clientName,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row: Invoice) => row.totalAmount,
      sortable: true,
      right: true,
    },
    {
      name: "Due Date",
      selector: (row: Invoice) => row.dueDate,
      sortable: true,
    },
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by client name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="border border-gray-300 p-2 px-5 rounded-md mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-md placeholder-gray-500"
      />

      <DataTable
        title="Invoices"
        columns={columns}
        data={filteredInvoices}
        pagination
        highlightOnHover
        selectableRows
      />
    </div>
  );
};

export default InvoiceTable;
