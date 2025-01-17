"use client";

import React, { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoiceTable";
import { Invoice } from "./interfaces/interface";
import API_BASE_URL from "../../public/config";
import Button from "@/components/Button";
import Header from "@/components/Header";
import AddInvoiceModal from "@/components/InvoiceForm";
import { IoIosAdd } from "react-icons/io";
import { FaFileExport } from "react-icons/fa";
import SearchBar from "@/components/Searchbar";
import {
  createInvoice,
  deleteInvoice,
  getInvoices,
  updateInvoice,
} from "@/helpers/helper.service";
import { handleExportToExcel } from "@/helpers/utils";

const Home: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterText, setFilterText] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);

  const handleAddInvoice = () => {
    setInvoiceData(null);
    setShowModal(true);
  };

  const handleEditInvoice = (data: Invoice) => {
    setInvoiceData(data);
    setShowModal(true);
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const response = await deleteInvoice(invoiceId);
        setInvoices((prev) =>
          prev.filter((invoice) => invoice.id !== invoiceId)
        );
      } catch (error) {
        console.error("Failed to delete invoice", error);
      }
    }
  };

  const handleModalSubmit = async (invoice: Invoice) => {
    const updatedInvoice = {
      ...invoice,
      dueDate: new Date(invoice.dueDate.toLocaleString()),
      items: invoice.items.map(
        ({ id, createdAt, invoiceId, updatedAt, ...item }) => item
      ),
      totalAmount: invoice.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0),
    };

    try {
      console.log("main");
      if (invoiceData) {
        // Update existing invoice
        const response = await updateInvoice(invoiceData.id, updatedInvoice);

        if (response) {
          setInvoices((prev) =>
            prev.map((inv) => (inv.id === response.id ? response : inv))
          );
        } else {
          console.error("Failed to update invoice");
        }
      } else {
        // Create new invoice
        const response = await createInvoice(updatedInvoice);
        if (response) {
          setInvoices((prev) => [...prev, response]);
        } else {
          console.error("Failed to create invoice");
        }
      }
      setShowModal(false);
      setInvoiceData(null);
    } catch (error) {
      console.error("Failed to save invoice", error);
    }
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = await getInvoices();
      setInvoices(data);
      setLoading(false);
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
      <div className="flex justify-between flex-wrap items-center p-8">
        <SearchBar value={filterText} onChange={setFilterText} />
        <div className="flex flex-row gap-2 mt-2">
          <Button variant="primary" size="small" onClick={handleAddInvoice}>
            <div className="flex flex-row gap-1">
              <IoIosAdd />
              <span className="text-xs">Add</span>
            </div>
          </Button>
        </div>
      </div>

      {!!filteredInvoices.length && (
        <div className="flex justify-end px-8 py-3">
          <Button
            variant="secondary"
            size="small"
            onClick={() => {
              filteredInvoices?.length > 0 &&
                handleExportToExcel(filteredInvoices);
            }}
          >
            <div className="flex flex-row gap-1">
              <FaFileExport />
              <span className="text-xs">Export</span>
            </div>
          </Button>
        </div>
      )}

      <div className="px-8 py-2">
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
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default Home;
