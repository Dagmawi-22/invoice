"use client";

import React, { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoiceTable";
import { Invoice } from "./interfaces/interface";
import API_BASE_URL from "../../public/config";

const Home: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/invoices`);
        console.log("dataa", response?.json());
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

  return (
    <>
      <header className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold">INVOICE</span>
          </div>
          <nav className="flex space-x-4"></nav>
        </div>
      </header>

      <div className="p-8">
        <InvoiceTable invoices={invoices} />
      </div>
    </>
  );
};

export default Home;
