"use client";

import QuoteForm from "@/components/QuoteForm";

export default function BookingForm({
  vehicleSlug,
  vehicleName,
  whatsapp,
}: {
  vehicleSlug: string;
  vehicleName: string;
  whatsapp: string;
}) {
  return (
    <QuoteForm
      defaultCity="Dehradun"
      whatsapp={whatsapp}
      vehicleSlug={vehicleSlug}
      vehicleName={vehicleName}
      submitLabel="Send booking request"
    />
  );
}
