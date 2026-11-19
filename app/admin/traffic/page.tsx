import { redirect } from "next/navigation";
import { getAdminRole } from "@/lib/auth";
import { readAnalytics, toCookieTrafficData } from "@/lib/analytics";
import CookieTrafficTable from "@/components/admin/CookieTrafficTable";

export const dynamic = "force-dynamic";

/** Cookie views: admin + CEO. Call / WhatsApp (no consent) columns: full admin only. */
export default async function AdminTrafficPage() {
  const role = await getAdminRole();
  if (!role) redirect("/admin/login");

  const isFullAdmin = role === "admin";
  const analytics = await readAnalytics();

  return (
    <div>
      <h1>{isFullAdmin ? "Traffic & WA / Call stats" : "Cookie traffic"}</h1>
      <p style={{ opacity: 0.8, fontSize: 14 }}>
        {isFullAdmin
          ? "Page views need cookie Accept. WhatsApp and Call taps are counted for every visitor (no consent). This is not a list of names or phone numbers."
          : "Page views and unique visitors (cookie Accept only). WhatsApp / Call tap totals are full admin only."}
      </p>
      <CookieTrafficTable data={toCookieTrafficData(analytics)} showLeads={isFullAdmin} />
    </div>
  );
}
