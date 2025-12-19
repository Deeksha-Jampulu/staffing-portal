// 🔹 PASTE YOUR WEB APP EXEC URL HERE
const API_BASE =
  "https://script.google.com/macros/s/AKfycby2DvyIRUqqbpKmg8JM5sQJXO37TqWSI1Qbx4fiOJu8uJwzpCENkWW2smZw61kkdSXpeA/exec";

// ---------- GET ----------
async function apiGet(route) {
  try {
    const res = await fetch(`${API_BASE}?route=${route}`, {
      method: "GET",
    });
    return await res.json();
  } catch (err) {
    console.error("API GET error:", err);
    throw err;
  }
}

// ---------- POST ----------
async function apiPost(route, data) {
  try {
    const res = await fetch(`${API_BASE}?route=${route}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("API POST error:", err);
    throw err;
  }
}
