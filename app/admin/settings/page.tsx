import { getSettings } from "@/lib/settings";
import SettingsAdmin from "@/components/admin/SettingsAdmin";
import { getAdminRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [settings, role] = await Promise.all([getSettings(), getAdminRole()]);
  const isCeo = role === "developer";
  return (
    <div>
      <h1>{isCeo ? "Contact numbers" : "Site-wide contact"}</h1>
      <p>
        {isCeo
          ? "Email and trust labels only. Phone and WhatsApp are locked — owner controls those."
          : "Change phone, WhatsApp, email and trust numbers. Header, footer and sticky buttons follow these."}
      </p>
      <SettingsAdmin settings={settings} lockPhone={isCeo} />
    </div>
  );
}
