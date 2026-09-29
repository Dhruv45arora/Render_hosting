export const SITE_NAME = "Arora Cars";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aroracars.com";
export const DEFAULT_PHONE = "8445619130";
export const DEFAULT_WHATSAPP = "8445619130";
export const DEFAULT_EMAIL = "info@aroracars.com";
export const ADDRESS_LINE = "Clock Tower, Dehradun - 248001, Uttarakhand";

export const CATEGORY_LABELS: Record<string, string> = {
  bike: "Bike",
  scooty: "Scooty",
  car: "Car",
  suv: "SUV",
  luxury: "Luxury",
  wedding: "Wedding",
  tempo: "Tempo Traveller",
  three_wheeler: "3-Wheeler",
  chota_hathi: "Chota Hathi",
};

export const CATEGORY_IMAGES: Record<string, string> = {
  bike: "/images/fleet/bike-commuter.jpg",
  scooty: "/images/fleet/scooty-activa.jpg",
  car: "/images/fleet/hatchback-silver.jpg",
  suv: "/images/fleet/suv-compact-white.jpg",
  luxury: "/images/fleet/luxury-sedan-black.jpg",
  wedding: "/images/categories/wedding-car-dehradun.jpg",
  tempo: "/images/fleet/tempo-traveller-white.jpg",
  three_wheeler: "/images/categories/auto-dehradun.jpg",
  chota_hathi: "/images/categories/minitruck-dehradun.jpg",
};

export const CATEGORY_HUBS = [
  { slug: "car-rental-dehradun", label: "Car Rental", category: "car" },
  { slug: "self-drive-car-rental-dehradun", label: "Self Drive", category: "car" },
  { slug: "chauffeur-driven-car-rental-dehradun", label: "With Driver", category: "car" },
  { slug: "bike-rental-dehradun", label: "Bikes", category: "bike" },
  { slug: "scooty-on-rent-dehradun", label: "Scooty", category: "scooty" },
  { slug: "suv-rental-dehradun", label: "SUVs", category: "suv" },
  { slug: "luxury-car-rental-dehradun", label: "Luxury", category: "luxury" },
  { slug: "wedding-car-rental-dehradun", label: "Wedding", category: "wedding" },
  { slug: "tempo-traveller-rental-dehradun", label: "Tempo", category: "tempo" },
  { slug: "three-wheeler-auto-rental-dehradun", label: "Auto", category: "three_wheeler" },
  { slug: "chota-hathi-mini-truck-rental-dehradun", label: "Mini Truck", category: "chota_hathi" },
];

/** Map vehicle category → primary hub for breadcrumbs / internal links */
export const CATEGORY_HUB_PATH: Record<string, string> = {
  bike: "/bike-rental-dehradun",
  scooty: "/scooty-on-rent-dehradun",
  car: "/car-rental-dehradun",
  suv: "/suv-rental-dehradun",
  luxury: "/luxury-car-rental-dehradun",
  wedding: "/wedding-car-rental-dehradun",
  tempo: "/tempo-traveller-rental-dehradun",
  three_wheeler: "/three-wheeler-auto-rental-dehradun",
  chota_hathi: "/chota-hathi-mini-truck-rental-dehradun",
};

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+91${digits.slice(-10)}`;
}

export function whatsappHref(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  const num = digits.startsWith("91") ? digits : `91${digits.slice(-10)}`;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

export function formatInr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
