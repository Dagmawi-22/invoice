"use client";

import React, { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoiceTable";
import { Invoice } from "./interfaces/interface";
import API_BASE_URL from "../../public/config";
import Button from "@/components/Button";
import Header from "@/components/Header";
import AddInvoiceModal from "@/components/InvoiceForm";
import { IoIosAdd } from "react-icons/io";

const Home: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterText, setFilterText] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);

  const handleAddInvoice = () => {
    setInvoiceData(null); // Clear data for new invoice
    setShowModal(true);
  };

  const handleEditInvoice = (data: Invoice) => {
    setInvoiceData(data); // Set data for editing
    setShowModal(true);
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await fetch(`${API_BASE_URL}/invoices/${invoiceId}`, {
          method: "DELETE",
        });
        setInvoices((prev) =>
          prev.filter((invoice) => invoice.id !== invoiceId)
        );
      } catch (error) {
        console.error("Failed to delete invoice", error);
      }
    }
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/invoices`);
        const data: Invoice[] = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Failed to fetch invoices", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.id.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="flex justify-between items-center p-4">
        <input
          type="text"
          placeholder="Filter by id"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="border h-9 border-gray-300 p-2 rounded text-black transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transform focus:scale-105 shadow-lg"
        />
        <Button variant="primary" size="small" onClick={handleAddInvoice}>
          <div className="flex flex-row gap-1">
            <IoIosAdd />
            <span className="text-xs">Add Invoice</span>
          </div>
        </Button>
      </div>

      <div className="p-8">
        <InvoiceTable
          invoices={filteredInvoices}
          onEdit={handleEditInvoice}
          onDelete={handleDeleteInvoice}
        />
      </div>

      <AddInvoiceModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        initialData={invoiceData}
      />
    </>
  );
};

export default Home;
