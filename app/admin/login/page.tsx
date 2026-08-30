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
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="login-box">
      <h1>Arora Cars admin</h1>
      <form className="ac-form" onSubmit={onSubmit}>
        <input name="user" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign in</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
