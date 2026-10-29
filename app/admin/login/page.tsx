"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: fd.get("user"), password: fd.get("password") }),
    });
    if (!res.ok) {
      setError("Invalid login");
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { role?: string };
    router.push(data.role === "developer" ? "/admin/vehicles" : "/admin");
    router.refresh();
  }

  return (
    <div className="login-box">
      <h1>Arora Cars admin</h1>
      <p style={{ fontSize: 13, opacity: 0.75, marginTop: -8 }}>
        Full admin or developer (product cards only)
      </p>
      <form className="ac-form" onSubmit={onSubmit}>
        <input name="user" placeholder="Username" required autoComplete="username" />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          autoComplete="current-password"
        />
        <button type="submit">Sign in</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
