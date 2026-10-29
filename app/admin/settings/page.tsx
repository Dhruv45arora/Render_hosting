import { getSettings } from "@/lib/settings";
import SettingsAdmin from "@/components/admin/SettingsAdmin";
import { getAdminRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [settings, role] = await Promise.all([getSettings(), getAdminRole()]);
  return (
    <div>
      <h1>{role === "developer" ? "Contact numbers" : "Site-wide contact"}</h1>
      <p>
        Change phone, WhatsApp, email and trust numbers. Header, footer and sticky buttons follow
        these.
      </p>
      <SettingsAdmin settings={settings} />
    </div>
  );
}
