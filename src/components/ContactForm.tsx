"use client";

import { FormEvent, useState } from "react";
import { site } from "@/data/site";

const interests = [
  "Product Enquiries",
  "Bulk Orders",
  "Corporate Gifting",
  "Partnerships",
  "International Collaboration",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const interest = String(data.get("interest") || "");
    const message = String(data.get("message") || "");
    const text = encodeURIComponent(
      `Namaste, I am ${name}.\nPhone: ${phone}\nInterest: ${interest}\n\n${message}`
    );
    window.open(`${site.whatsapp}?text=${text}`, "_blank");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-8 border border-forest/10">
        <p className="font-serif text-2xl text-forest">Thank you.</p>
        <p className="mt-2 text-muted">
          WhatsApp should open with your message. If it did not, write to us at {site.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 md:p-8 border border-forest/10 space-y-4">
      <div>
        <label className="text-sm" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-xl border border-forest/15 bg-cream px-3 py-2.5 outline-none focus:border-leaf"
        />
      </div>
      <div>
        <label className="text-sm" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          required
          className="mt-1 w-full rounded-xl border border-forest/15 bg-cream px-3 py-2.5 outline-none focus:border-leaf"
        />
      </div>
      <div>
        <label className="text-sm" htmlFor="interest">
          I am interested in
        </label>
        <select
          id="interest"
          name="interest"
          className="mt-1 w-full rounded-xl border border-forest/15 bg-cream px-3 py-2.5 outline-none focus:border-leaf"
        >
          {interests.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1 w-full rounded-xl border border-forest/15 bg-cream px-3 py-2.5 outline-none focus:border-leaf"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-forest py-3 text-cream font-medium hover:bg-leaf"
      >
        Get in Touch
      </button>
    </form>
  );
}
