import React from "react";
import { PayInvoicePage } from "./PayInvoicePage";
import { InvoicesPage } from "./InvoicesPage";

export function Dashboard({ page }: { page: "PAY" | "INVOICES" }) {
  return (
    <div className="row">
      <div className="card">
        {page === "PAY" ? <PayInvoicePage /> : <InvoicesPage />}
      </div>
    </div>
  );
}
