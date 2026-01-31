export type InvoiceStatus = "PENDING" | "PAID" | "CANCELED";
export type Invoice = {
  id: string;
  msisdn: string;
  provider: "TELCO_A" | "TELCO_B";
  amount: number;
  status: InvoiceStatus;
  noteHtml?: string; // para el ejercicio de XSS
};

export type PayMethod = "CARD" | "TRANSFER" | "WALLET";

let invoices: Invoice[] = [
  {
    id: "INV-001",
    msisdn: "5512345678",
    provider: "TELCO_A",
    amount: 199,
    status: "PENDING",
    noteHtml: `Nota del usuario: <b>Pago atrasado</b>`,
  },
  {
    id: "INV-002",
    msisdn: "5598765432",
    provider: "TELCO_B",
    amount: 299,
    status: "PENDING",
    // para demostrar por qué no usar dangerouslySetInnerHTML sin sanitizar
    noteHtml: `Observación: <img src=x onerror="alert('XSS: no deberías ver esto en Good')">`,
  },
  {
    id: "INV-003",
    msisdn: "5544455566",
    provider: "TELCO_A",
    amount: 0,
    status: "PENDING",
    noteHtml: `Monto cero (debería fallar validación)`,
  },
];

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const fakeApi = {
  async listInvoices() {
    await sleep(450);
    return invoices.map((x) => ({ ...x }));
  },

  async payInvoice(input: { invoiceId: string; method: PayMethod }) {
    await sleep(700);

    const inv = invoices.find((x) => x.id === input.invoiceId);
    if (!inv) throw new Error("Factura no encontrada");
    if (inv.status !== "PENDING") throw new Error("Factura no pagable");
    if (inv.amount <= 0) throw new Error("Monto inválido");

    // Simula un fallo si el método es TRANSFER y el invoice es INV-002
    if (input.method === "TRANSFER" && inv.id === "INV-002") {
      throw new Error("Transferencia rechazada por banco");
    }

    inv.status = "PAID";
    const paymentId = `${input.method}-${Date.now()}`;

    return { paymentId };
  },
};
