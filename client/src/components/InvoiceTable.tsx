"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Invoice } from "@/app/interfaces/interface";
import Button from "@/components/Button";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Fill } from "react-icons/ri";

const InvoiceTable: React.FC<{
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (invoiceId: string) => void;
}> = ({ invoices, onEdit, onDelete }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const columns = [
    { name: "Invoice Number", selector: (row: Invoice) => row.id },
    {
      name: "Items",
      selector: (row: Invoice) =>
        row.items.map((item) => item.description).join(", "),
    },
    { name: "Total Amount", selector: (row: Invoice) => row.totalAmount },
    { name: "Due Date", selector: (row: Invoice) => row.dueDate },
    {
      name: "Actions",
      cell: (row: Invoice) => (
        <div className="flex space-x-2">
          <Button variant="primary" size="small" onClick={() => onEdit(row)}>
            <div className="flex flex-row gap-1">
              <GrEdit />
              <span className="text-xs">Edit</span>
            </div>
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(row.id)}
          >
            <div className="flex flex-row gap-1">
              <RiDeleteBin6Fill />
              <span className="text-xs">Delete</span>
            </div>
          </Button>
        </div>
      ),
    },
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
