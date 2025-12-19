// ✅ Your Apps Script Web App URL (must end with /exec)
const API_BASE = "https://script.google.com/macros/s/AKfycby2DvyIRUqqbpKmg8JM5sQJXO37TqWSI1Qbx4fiOJu8uJwzpCENkWW2smZw61kkdSXpeA/exec";

/* ---------- HTML escape helper ---------- */
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

/* ---------- JSONP core (works on GitHub Pages without CORS issues) ---------- */
function jsonp(route, params = {}) {
  return new Promise((resolve, reject) => {
    const cbName = "cb_" + Math.random().toString(36).slice(2);

    const url = new URL(API_BASE);
    url.searchParams.set("route", route);
    url.searchParams.set("callback", cbName);

    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).length > 0) {
        url.searchParams.set(k, v);
      }
    });

    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Request timed out"));
    }, 12000);

    function cleanup() {
      clearTimeout(timer);
      try { delete window[cbName]; } catch (e) {}
      if (script && script.parentNode) script.parentNode.removeChild(script);
    }

    window[cbName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("API failed to load"));
    };

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

/* ---------- These two functions are what your pages expect ---------- */
async function apiGet(route, params = {}) {
  return await jsonp(route, params);
}

async function apiPost(payload = {}) {
  const route = payload.route;
  const copy = { ...payload };
  delete copy.route;
  return await jsonp(route, copy);
}
