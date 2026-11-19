export type CookieDayRow = {
  date: string;
  views: number;
  uniques: number;
  calls: number;
  wa: number;
};

export type CookiePathRow = {
  path: string;
  calls: number;
  wa: number;
  total: number;
};

export type CookieLeadRow = {
  at: string;
  kind: "call" | "wa";
  path: string;
};

export type CookieTrafficData = {
  totalViews: number;
  totalUniques: number;
  totalCalls: number;
  totalWa: number;
  rows: CookieDayRow[];
  topPaths?: CookiePathRow[];
  recentLeads?: CookieLeadRow[];
};

function formatLeadWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "—", time: "—" };
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }),
  };
}

/** showLeads: Call/WA (no consent) — full admin only. Cookie views stay visible to CEO. */
export default function CookieTrafficTable({
  data,
  showLeads = true,
}: {
  data: CookieTrafficData;
  showLeads?: boolean;
}) {
  const topPaths = showLeads ? data.topPaths || [] : [];
  const recentLeads = showLeads ? data.recentLeads || [] : [];
  return (
    <section className="ac-card" style={{ marginTop: 24 }}>
      <h2 style={{ marginTop: 0 }}>{showLeads ? "Traffic & lead taps" : "Cookie traffic"}</h2>
      <p style={{ fontSize: 13, opacity: 0.8, maxWidth: 720 }}>
        Counts live in <code>SiteSetting</code> key <code>analytics_v1</code> (JSON, last ~90 days).{" "}
        <strong>Page views / uniques</strong> require cookie Accept.
        {showLeads ? (
          <>
            {" "}
            <strong>Call &amp; WhatsApp taps</strong> are counted for every visitor on every page (no
            consent required) with date/time and page path.{" "}
            <em>Visitor phone cannot be read from a WA/Call tap</em> — that stays on their phone;
            numbers only appear when someone submits a booking form.
          </>
        ) : (
          <> Call / WhatsApp tap totals are visible to full admin only.</>
        )}
      </p>
      <div className="ceo-kpis" style={{ margin: "16px 0" }}>
        <div className="ceo-kpi">
          <span>All-time views</span>
          <strong>{data.totalViews}</strong>
          <em>page loads with consent</em>
        </div>
        <div className="ceo-kpi">
          <span>All-time uniques</span>
          <strong>{data.totalUniques}</strong>
          <em>first hit per visitor-day</em>
        </div>
        {showLeads ? (
          <>
            <div className="ceo-kpi">
              <span>Call taps</span>
              <strong>{data.totalCalls}</strong>
              <em>all tel: links · no consent</em>
            </div>
            <div className="ceo-kpi">
              <span>WhatsApp taps</span>
              <strong>{data.totalWa}</strong>
              <em>all WA links · no consent</em>
            </div>
          </>
        ) : null}
      </div>
      {showLeads ? (
        <div className="ceo-table-wrap" style={{ marginBottom: 20 }}>
          <h3 style={{ marginTop: 0, fontSize: 15 }}>Recent Call / WhatsApp taps</h3>
          {recentLeads.length === 0 ? (
            <p className="ceo-empty" style={{ margin: "8px 0 0" }}>
              No timed taps yet. New clicks after deploy will show date &amp; time here (IST).
            </p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Page</th>
                  <th>Visitor phone</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((r, i) => {
                  const when = formatLeadWhen(r.at);
                  return (
                    <tr key={`${r.at}-${r.path}-${i}`}>
                      <td>{when.date}</td>
                      <td>{when.time}</td>
                      <td>{r.kind === "wa" ? "WhatsApp" : "Call"}</td>
                      <td>
                        <code>{r.path}</code>
                      </td>
                      <td style={{ opacity: 0.65 }}>—</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : null}

      {topPaths.length > 0 ? (
        <div className="ceo-table-wrap" style={{ marginBottom: 20 }}>
          <h3 style={{ marginTop: 0, fontSize: 15 }}>Top pages by Call / WhatsApp taps</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>WhatsApp</th>
                <th>Call</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {topPaths.map((r) => (
                <tr key={r.path}>
                  <td>
                    <code>{r.path}</code>
                  </td>
                  <td>{r.wa}</td>
                  <td>{r.calls}</td>
                  <td>{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {data.rows.length === 0 ? (
        <p className="ceo-empty">
          No traffic yet.
          {showLeads
            ? " Tap WhatsApp on any public page (consent not required for WA/Call), then refresh admin. Page views still need Accept on the cookie bar."
            : " Page views need Accept on the cookie bar, then refresh."}
        </p>
      ) : (
        <div className="ceo-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Page views</th>
                <th>Unique visitors</th>
                {showLeads ? (
                  <>
                    <th>Call taps</th>
                    <th>WhatsApp taps</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r) => (
                <tr key={r.date}>
                  <td>{r.date}</td>
                  <td>{r.views}</td>
                  <td>{r.uniques}</td>
                  {showLeads ? (
                    <>
                      <td>{r.calls}</td>
                      <td>{r.wa}</td>
                    </>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
