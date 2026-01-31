import React, { useEffect, useState } from "react";
import { fakeApi, type Invoice } from "./shared/fakeAPI/db";

export function InvoicesPage() {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    fakeApi
      .listInvoices()
      .then(setInvoices)
      .finally(() => setLoading(false));
  }, []);

  const filtered = invoices.filter((x) => x.id.includes(filter));

  return (
    <div>
      <h3>Mis facturas</h3>

      <label>Filtrar por InvoiceId</label>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="INV-00" />

      <div className="hr" />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        filtered.map((x) => (
          <div key={x.id} className="card" style={{ marginTop: 10 }}>
            <div className="mono">{x.id}</div>
            <div className="small">
              {x.provider} • {x.msisdn}
            </div>
            <div style={{ marginTop: 6 }}>
              <span className="badge">Monto: ${x.amount}</span>{" "}
              <span className="badge">Status: {x.status}</span>
            </div>

            <div className="hr" />
          </div>
        ))
      )}
    </div>
  );
}
