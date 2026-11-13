import { redirect } from "next/navigation";
import { getAdminRole } from "@/lib/auth";
import { readAnalytics, toCookieTrafficData } from "@/lib/analytics";
import CookieTrafficTable from "@/components/admin/CookieTrafficTable";

export const dynamic = "force-dynamic";

export default async function AdminTrafficPage() {
  const role = await getAdminRole();
  if (!role) redirect("/admin/login");

  const analytics = await readAnalytics();

  return (
    <div>
      <h1>Cookie / visit data</h1>
      <p style={{ opacity: 0.8, fontSize: 14 }}>
        Daily counts from the public site cookie banner. This is visit analytics, not a list of
        names or phone numbers.
      </p>
      <CookieTrafficTable data={toCookieTrafficData(analytics)} />
    </div>
  );
}
