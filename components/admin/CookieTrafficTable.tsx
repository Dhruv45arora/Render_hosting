export type CookieDayRow = {
  date: string;
  views: number;
  uniques: number;
  calls: number;
  wa: number;
};

export type CookieTrafficData = {
  totalViews: number;
  totalUniques: number;
  totalCalls: number;
  totalWa: number;
  rows: CookieDayRow[];
};

export default function CookieTrafficTable({ data }: { data: CookieTrafficData }) {
  return (
    <section className="ac-card" style={{ marginTop: 24 }}>
      <h2 style={{ marginTop: 0 }}>Cookie traffic (site visitors)</h2>
      <p style={{ fontSize: 13, opacity: 0.8, maxWidth: 720 }}>
        There is <strong>no separate Cookie table</strong> in the database. After a visitor taps{" "}
        <strong>Accept</strong> on the cookie bar, counts are saved in{" "}
        <code>SiteSetting</code> under the key <code>analytics_v1</code> as one JSON blob (last ~90
        days). Decline means no hit is stored. Browser cookies (<code>ac_consent</code>,{" "}
        <code>ac_vid</code>) stay on the visitor’s phone — we do not save those IDs.
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
        <div className="ceo-kpi">
          <span>Call taps</span>
          <strong>{data.totalCalls}</strong>
          <em>sticky Call after consent</em>
        </div>
        <div className="ceo-kpi">
          <span>WhatsApp taps</span>
          <strong>{data.totalWa}</strong>
          <em>sticky WA after consent</em>
        </div>
      </div>
      {data.rows.length === 0 ? (
        <p className="ceo-empty">
          No cookie traffic yet. Open the public site, accept the cookie notice, then refresh this
          page. If Neon/database is down, hits fail silently and this stays empty.
        </p>
      ) : (
        <div className="ceo-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Page views</th>
                <th>Unique visitors</th>
                <th>Call taps</th>
                <th>WhatsApp taps</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r) => (
                <tr key={r.date}>
                  <td>{r.date}</td>
                  <td>{r.views}</td>
                  <td>{r.uniques}</td>
                  <td>{r.calls}</td>
                  <td>{r.wa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
