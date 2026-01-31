import React from "react";
import { PayInvoicePage } from "../features/payments/PayInvoicePage";
import { InvoicesPage } from "../features/invoices/InvoicesPage";

export function Dashboard({ page }: { page: "PAY" | "INVOICES" }) {
  return (
    <div className="row">
      <div className="card">
        {page === "PAY" ? <PayInvoicePage /> : <InvoicesPage />}
      </div>
    </div>
  );
}
