"use client";

import { useEffect } from "react";

function hasExtensionOrigin(value: unknown): boolean {
  return typeof value === "string" && value.includes("chrome-extension://");
}

function getReasonText(reason: unknown): string {
  if (typeof reason === "string") return reason;
  if (reason && typeof reason === "object") {
    const maybeMessage = (reason as { message?: unknown }).message;
    if (typeof maybeMessage === "string") return maybeMessage;
  }
  return "";
}

/**
 * Prevent extension-originated runtime errors (e.g. MetaMask injection)
 * from interrupting the app in development.
 */
export function ExtensionErrorGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const onError = (event: ErrorEvent) => {
      const source = event.filename ?? "";
      if (hasExtensionOrigin(source)) {
        event.preventDefault();
      }
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reasonText = getReasonText(event.reason);
      if (hasExtensionOrigin(reasonText) || /metamask/i.test(reasonText)) {
        event.preventDefault();
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
