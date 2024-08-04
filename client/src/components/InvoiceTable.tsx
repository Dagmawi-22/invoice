import React from "react";
import DataTable from "react-data-table-component";
import { Invoice } from "@/app/interfaces/interface";
import dayjs from "dayjs";
import Button from "./Button";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

interface InvoiceTableProps {
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (invoiceId: string) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onEdit,
  onDelete,
}) => {
  const columns = [
    { name: "Invoice Number", selector: (row: Invoice) => row.id },
    {
      name: "Items",
      selector: (row: Invoice) =>
        row.items.map((item) => item.description).join(", "),
    },
    { name: "Total Amount", selector: (row: Invoice) => row.totalAmount },
    {
      name: "Due Date",
      selector: (row: Invoice) =>
        dayjs(new Date(row.dueDate)).format("MMM D, YYYY HH:mm a"),
    },
    {
      name: "Actions",
      cell: (row: Invoice) => (
        <div className="flex space-x-2">
          <Button size="small" variant="primary" onClick={() => onEdit(row)}>
            <div className="flex flex-row gap-1">
              <MdModeEditOutline />
              <span className="text-xs">Edit</span>
            </div>
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={() => onDelete(row.id)}
          >
            <div className="flex flex-row gap-1">
              <MdDeleteOutline />
              <span className="text-xs">Delete</span>
            </div>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={invoices}
      pagination
      className="shadow-lg rounded-md"
    />
  );
};

export default InvoiceTable;
