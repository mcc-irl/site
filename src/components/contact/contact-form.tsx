"use client";

import { FormEvent, useMemo, useState } from "react";

type ContactFormProps = {
  services: string[];
  initialService?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

export function ContactForm({ services, initialService }: ContactFormProps) {
  const defaultService = useMemo(() => {
    if (!initialService) {
      return "";
    }

    return services.includes(initialService) ? initialService : "";
  }, [initialService, services]);

  const [form, setForm] = useState<FormState>({
    ...initialState,
    service: defaultService,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setErrorMessage(result.message ?? "Unable to send your enquiry right now.");
        return;
      }

      setSuccessMessage("Thanks for your enquiry. Michelle will get back to you soon.");
      setForm({
        ...initialState,
        service: defaultService,
      });
    } catch {
      setErrorMessage("Network error. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            required
            maxLength={120}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none ring-brand-200 transition focus:border-brand-500 focus:ring"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
            maxLength={120}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none ring-brand-200 transition focus:border-brand-500 focus:ring"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Phone (optional)</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            maxLength={40}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none ring-brand-200 transition focus:border-brand-500 focus:ring"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Service interest</span>
          <select
            name="service"
            value={form.service}
            onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
            required
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-brand-200 transition focus:border-brand-500 focus:ring"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-slate-700">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          required
          maxLength={2000}
          rows={6}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none ring-brand-200 transition focus:border-brand-500 focus:ring"
        />
      </label>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
          />
        </label>
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send enquiry"}
      </button>
    </form>
  );
}