"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_STORAGE_KEY = "mcc-cookie-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  function savePreference(value: "accepted" | "declined") {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    window.dispatchEvent(new Event("mcc-consent-updated"));
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="max-w-3xl text-sm text-slate-700">
          We use a minimal cookie setup for website functionality and privacy-friendly analytics. You can accept or
          decline analytics cookies. See our <Link href="/contact" className="font-medium text-brand-700 underline">contact page</Link> for privacy requests.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => savePreference("declined")}
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => savePreference("accepted")}
            className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}