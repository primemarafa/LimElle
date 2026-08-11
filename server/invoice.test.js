import assert from "node:assert/strict";
import test from "node:test";
import { renderInvoice } from "./invoice.js";

test("invoice renderer escapes customer and product content", () => {
  const html = renderInvoice({
    reference: "LE-20260811-abcd1234",
    createdAt: "2026-08-11T12:00:00.000Z",
    status: "EN_ATTENTE",
    customer: { fullName: "Awa <Diallo>", phone: "+221000000000", city: "Dakar" },
    deliveryMode: "point_retrait",
    deliveryAddress: "",
    items: [{ product: { name: "Robe <élégante>", price: 35000 }, quantity: 2 }],
    totals: { productTotal: 70000, transport: 4000, total: 74000 },
  });

  assert.match(html, /Awa &lt;Diallo&gt;/);
  assert.match(html, /Robe &lt;élégante&gt;/);
  assert.doesNotMatch(html, /Awa <Diallo>/);
  assert.match(html, /74[\u202f ]?000 FCFA|74,000 FCFA|74 000 FCFA/);
});
