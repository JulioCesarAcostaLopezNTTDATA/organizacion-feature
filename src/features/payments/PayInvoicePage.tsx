import React, { useState } from "react";
import { fakeApi, type PayMethod } from "../../shared/fakeAPI/db";

export function PayInvoicePage() {
  const [invoiceId, setInvoiceId] = useState("INV-001");
  const [method, setMethod] = useState<PayMethod>("CARD");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function pay() {
    setMsg("");
    setLoading(true);

    if (!invoiceId.trim()) {
      setMsg("InvoiceId requerido");
      setLoading(false);
      return;
    }

    try {
      const r = await fakeApi.payInvoice({ invoiceId, method });
      setMsg(`Pago OK: ${r.paymentId}`);
    } catch (e: any) {
      setMsg(`Pago fallido: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Pagar factura</h3>

      <label>InvoiceId</label>
      <input value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} />

      <label>Método</label>
      <select value={method} onChange={(e) => setMethod(e.target.value as PayMethod)}>
        <option value="CARD">Tarjeta</option>
        <option value="TRANSFER">Transferencia</option>
        <option value="WALLET">Wallet</option>
      </select>

      <div style={{ marginTop: 12 }}>
        <button disabled={loading} onClick={pay}>
          {loading ? "Pagando..." : "Pagar"}
        </button>
      </div>

      <div style={{ marginTop: 10, minHeight: 24 }}>
        <span className={msg.includes("OK") ? "ok" : msg ? "err" : ""}>{msg}</span>
      </div>

      <div className="hr" />
      <div className="small">
        Prueba: <span className="mono">INV-002 + TRANSFER</span> falla.
        <br />
        Prueba: <span className="mono">INV-003</span> falla por monto 0.
      </div>
    </div>
  );
}
