// // CRA: central API base
// export const API_BASE = process.env.REACT_APP_API_BASE;

// // Simple helpers (optional)
// export async function apiGet(path, options = {}) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     headers: { "Content-Type": "application/json" },
//     ...options, method: "GET",
//   });
//   if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
//   return res.json();
// }
// export async function apiPost(path, body) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
//   return res.json();
// }


// === API helpers (CRA) ===
// We export BOTH named and default so that both styles work:
//  - import { API_BASE } from "./api";
//  - import API_BASE from "./api";

// const API_BASE = process.env.REACT_APP_API_BASE;

// // Turn relative paths like "uploads/..." or "/uploads/..." into absolute URL
// export function withBase(path) {
//   if (!path) return path;
//   if (typeof path !== "string") return path;
//   if (/^https?:\/\//i.test(path)) return path;
//   if (path.startsWith("/")) return `${API_BASE}${path}`;
//   return `${API_BASE}/${path}`;
// }

// // Simple fetch helpers
// export async function apiGet(path, options = {}) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     headers: { "Content-Type": "application/json" },
//     ...options,
//     method: "GET",
//   });
//   if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
//   return res.json();
// }

// export async function apiPost(path, body) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
//   return res.json();
// }

// // Expose both named and default
// export { API_BASE };
// export default API_BASE;

// === API helpers (CRA) ===
// We export BOTH named and default so that both styles work:
//  - import { API_BASE } from "./api";
//  - import API_BASE from "./api";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://bible-mining-backend-jxj5.onrender.com"; // <== fallback so dev works even if .env not loaded

// Turn relative paths like "uploads/..." or "/uploads/..." into absolute URL
export function withBase(path) {
  if (!path) return path;
  if (typeof path !== "string") return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/")) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
}

// Simple fetch helpers with safer JSON handling
async function parseJsonOrThrow(res) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  const text = await res.text();
  throw new Error(
    `Non-JSON ${res.status} from ${res.url}: ${text.slice(0, 120)}…`
  );
}

export async function apiGet(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    method: "GET",
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GET ${path} failed: ${res.status} ${txt.slice(0, 120)}…`);
  }
  return parseJsonOrThrow(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`POST ${path} failed: ${res.status} ${txt.slice(0, 120)}…`);
  }
  return parseJsonOrThrow(res);
}

// Expose both named and default
export { API_BASE };
export default API_BASE;

// Helpful log (you can remove later)
if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.log("DEBUG API_BASE =", API_BASE);
}
