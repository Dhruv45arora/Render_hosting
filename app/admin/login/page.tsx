"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    router.push(data.role === "developer" ? "/admin" : "/admin");
    router.refresh();
  }

  return (
    <div className="login-box">
      <h1>Arora Cars desk</h1>
      <p style={{ fontSize: 13, opacity: 0.75, marginTop: -8 }}>
        Full admin (CMS) or CEO desk (bookings, fleet, numbers)
      </p>
      <form className="ac-form" onSubmit={onSubmit}>
        <input name="user" placeholder="Username" required autoComplete="username" />
        <div className="login-pass-row">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            className="login-pass-toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-pressed={showPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit">Sign in</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
