"use client";

import dynamic from "next/dynamic";

const CookieAnalytics = dynamic(() => import("@/components/CookieAnalytics"), {
  ssr: false,
  loading: () => null,
});

/** Client boundary so public layout can defer the cookie banner off the critical path. */
export default function CookieAnalyticsLoader() {
  return <CookieAnalytics />;
}
