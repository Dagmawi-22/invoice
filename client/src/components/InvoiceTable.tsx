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
    invoice.id.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "Invoice Number", selector: (row: Invoice) => row.id },
    {
      name: "Items",
      selector: (row: Invoice) =>
        row.items.map((item) => item.description).join(", "),
    },
    { name: "Total Amount", selector: (row: Invoice) => row.totalAmount },
    { name: "Due Date", selector: (row: Invoice) => row.dueDate },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={invoices}
        pagination
        className="shadow-lg rounded-md"
      />
    </div>
  );
};

export default InvoiceTable;
