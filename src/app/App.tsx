import React, { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./Dashboard";
import "./App.css";

type Mode = "BAD" | "GOOD";
type Page = "PAY" | "INVOICES";

export function App() {
  const [mode, setMode] = useState<Mode>("BAD");
  const [page, setPage] = useState<Page>("PAY");

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <div className="tabs">
          <button className={`tab ${page === "PAY" ? "tabActive" : ""}`} onClick={() => setPage("PAY")}>
            Pago de factura
          </button>
          <button className={`tab ${page === "INVOICES" ? "tabActive" : ""}`} onClick={() => setPage("INVOICES")}>
            Mis facturas
          </button>
        </div>

        <div className="hr" />
          <Dashboard page={page} />
      </div>
    </QueryClientProvider>
  );
}
