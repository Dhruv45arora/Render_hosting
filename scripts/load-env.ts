import fs from "node:fs";
import path from "node:path";

/** Load repo `.env` into process.env. Overrides stale localhost DB URLs from the shell. */
export function loadEnv() {
  const file = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    const current = process.env[key];
    const staleLocal =
      key === "DATABASE_URL" &&
      !!current &&
      (current.includes("localhost") || current.includes("127.0.0.1"));
    if (!current || staleLocal) process.env[key] = value;
  }
}
