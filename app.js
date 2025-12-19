// ===============================
// CONFIG – THIS IS THE KEY LINE
// ===============================
const API_BASE =
  "https://script.google.com/macros/s/AKfycby2DvyIRUqqbpKmg8JM5sQJXO37TqWSI1Qbx4fiOJu8uJwzpCENkWW2smZw61kkdSXpeA/exec";

// ===============================
// GET helper
// ===============================
async function apiGet(route) {
  const url = `${API_BASE}?route=${encodeURIComponent(route)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("API failed to load");
  return await res.json();
}

// ===============================
// POST helper
// ===============================
async function apiPost(route, data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ route, ...data }),
  });
  if (!res.ok) throw new Error("API failed to load");
  return await res.json();
}
