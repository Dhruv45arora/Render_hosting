import { getSettings } from "@/lib/settings";
import SettingsAdmin from "@/components/admin/SettingsAdmin";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1>Site-wide contact</h1>
      <p>Change the phone once. Header, footer, sticky buttons and WhatsApp links all follow this.</p>
      <SettingsAdmin settings={settings} />
    </div>
  );
}
