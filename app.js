const API_URL = "https://script.google.com/macros/s/AKfycby2DvyIRUqqbpKmg8JM5sQJXO37TqWSI1Qbx4fiOJu8uJwzpCENkWW2smZw61kkdSXpeA/exec";

async function apiGet(route) {
  const res = await fetch(`${API_URL}?route=${route}`);
  return await res.json();
}

async function apiPost(route, payload) {
  const res = await fetch(`${API_URL}?route=${route}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return await res.json();
}
// Auto-highlight active nav link based on current file name
document.addEventListener("DOMContentLoaded", () => {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".topbar .navlinks a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
    else a.classList.remove("active");
  });
});

