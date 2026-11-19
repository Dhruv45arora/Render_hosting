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

export type CookieTrafficData = {
  totalViews: number;
  totalUniques: number;
  totalCalls: number;
  totalWa: number;
  rows: CookieDayRow[];
  topPaths?: CookiePathRow[];
};

/** showLeads: Call/WA (no consent) — full admin only. Cookie views stay visible to CEO. */
export default function CookieTrafficTable({
  data,
  showLeads = true,
}: {
  data: CookieTrafficData;
  showLeads?: boolean;
}) {
  const topPaths = showLeads ? data.topPaths || [] : [];
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
            consent required) and include the page path. We do not store personal IDs.
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
