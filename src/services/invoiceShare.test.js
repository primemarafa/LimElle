import test from "node:test";
import assert from "node:assert/strict";
import { buildInvoiceMailtoUrl, buildInvoiceWhatsAppUrl, getInvoiceUrl } from "./invoiceShare.js";

test("invoice URL encodes lookup token", () => {
  const originalWindow = globalThis.window;
  globalThis.window = { location: { origin: "https://limelle.example" } };
  try {
    assert.equal(getInvoiceUrl("token/with space"), "https://limelle.example/api/orders/token%2Fwith%20space/invoice");
  } finally {
    globalThis.window = originalWindow;
  }
});

test("WhatsApp invoice link contains invoice reference, total and URL", () => {
  const url = buildInvoiceWhatsAppUrl({
    phone: "+227 90 00 00 00",
    reference: "LE-20260811-abcd1234",
    total: 49000,
    invoiceUrl: "https://limelle.example/api/orders/token/invoice",
  });
  assert.match(url, /^https:\/\/wa\.me\/2279000000\?text=/);
  assert.match(decodeURIComponent(url), /LE-20260811-abcd1234/);
  assert.match(decodeURIComponent(url), /49000 FCFA/);
  assert.match(decodeURIComponent(url), /https:\/\/limelle\.example\/api\/orders\/token\/invoice/);
});

test("email link encodes recipient, subject and invoice URL", () => {
  const url = buildInvoiceMailtoUrl({
    email: "client@example.com",
    reference: "LE-20260811-abcd1234",
    total: 49000,
    invoiceUrl: "https://limelle.example/api/orders/token/invoice",
  });
  assert.match(url, /^mailto:client%40example\.com\?/);
  assert.match(decodeURIComponent(url), /Facture Lim'Elle LE-20260811-abcd1234/);
  assert.match(decodeURIComponent(url), /49000 FCFA/);
  assert.match(decodeURIComponent(url), /https:\/\/limelle\.example\/api\/orders\/token\/invoice/);
});
