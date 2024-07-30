import React from "react";
import { Invoice } from "@/app/interfaces/interface";

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border text-left">Invoice Number</th>
              <th className="px-4 py-2 border text-left">Client Name</th>
              <th className="px-4 py-2 border text-left">Items</th>
              <th className="px-4 py-2 border text-left">Total Amount</th>
              <th className="px-4 py-2 border text-left">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr
                key={index}
                className="bg-white hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-4 py-2 border text-gray-700">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-4 py-2 border text-gray-700">
                  {invoice.clientName}
                </td>
                <td className="px-4 py-2 border text-gray-700">
                  <ul>
                    {invoice.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.description} - ${item.amount}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 border text-gray-700">
                  ${invoice.totalAmount.toFixed(2)}
                </td>
                <td className="px-4 py-2 border text-gray-700">
                  {invoice.dueDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
