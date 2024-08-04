"use client";

import React, { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoiceTable";
import { Invoice } from "./interfaces/interface";
import API_BASE_URL from "../../public/config";
import Button from "@/components/Button";
import Header from "@/components/Header";

const Home: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/invoices`);
        const data: Invoice[] = await response.json();
        console.log("dataa", data);
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
          className="border h-9 border-gray-300 p-2 rounded-lg text-black transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transform focus:scale-105 shadow-lg"
        />
        <Button variant="primary" size="small" onClick={() => {}}>
          Add Invoice
        </Button>
      </div>

      <div className="p-8">
        <InvoiceTable invoices={filteredInvoices} />
      </div>
    </>
  );
};

export default Home;
