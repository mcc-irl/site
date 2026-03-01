"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_STORAGE_KEY = "mcc-cookie-consent";

export function PrivacyAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    setEnabled(saved === "accepted");

    function onStorage(event: StorageEvent) {
      if (event.key === CONSENT_STORAGE_KEY) {
        setEnabled(event.newValue === "accepted");
      }
    }

    function onConsentChanged() {
      const latest = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      setEnabled(latest === "accepted");
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("mcc-consent-updated", onConsentChanged as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("mcc-consent-updated", onConsentChanged as EventListener);
    };
  }, []);

  if (!enabled || !plausibleDomain) {
    return null;
  }

  return (
    <Script
      defer
      src="https://plausible.io/js/script.js"
      data-domain={plausibleDomain}
      strategy="afterInteractive"
    />
  );
}