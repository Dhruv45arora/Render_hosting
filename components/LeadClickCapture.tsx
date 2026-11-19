"use client";

import { useEffect } from "react";
import { installLeadClickCapture } from "@/lib/lead-track";

/** Counts Call / WhatsApp taps on every public page (no cookie consent required). */
export default function LeadClickCapture() {
  useEffect(() => installLeadClickCapture(), []);
  return null;
}
