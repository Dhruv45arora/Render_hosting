"use client";

import { useRouter } from "next/navigation";

type Row = {
  id: number;
  name: string;
  phone: string;
  email: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function BookingsAdmin({ rows }: { rows: Row[] }) {
  const router = useRouter();
  async function setStatus(id: number, status: string) {
    await fetch("/api/admin/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>When</th>
          <th>Guest</th>
          <th>Vehicle</th>
          <th>Dates</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td>{new Date(r.createdAt).toLocaleString("en-IN")}</td>
            <td>
              {r.name}
              <br />
              {r.phone}
              <br />
              {r.email}
              <div style={{ color: "#666" }}>{r.message}</div>
            </td>
            <td>{r.vehicleName}</td>
            <td>
              {r.startDate} → {r.endDate}
            </td>
            <td>
              <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)}>
                <option value="new">new</option>
                <option value="confirmed">confirmed</option>
                <option value="done">done</option>
                <option value="cancelled">cancelled</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
