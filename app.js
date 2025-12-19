const API_URL = "https://script.google.com/macros/s/AKfycby2DvyIRUqqbpKmg8JM5sQJXO37TqWSI1Qbx4fiOJu8uJwzpCENkWW2smZw61kkdSXpeA/exec";

function esc(x) {
  return String(x || "").replace(/[&<>"']/g, m =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
  );
}

async function apiGet(route) {
  const r = await fetch(`${API_URL}?route=${route}`);
  return r.json();
}

async function apiPost(data) {
  const qs = new URLSearchParams(data).toString();
  const r = await fetch(`${API_URL}?${qs}`);
  return r.json();
}
