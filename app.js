const API_URL = "https://script.google.com/macros/s/AKfycby2DvyIRUqqbpKmg8JM5sQJXO37TqWSI1Qbx4fiOJu8uJwzpCENkWW2smZw61kkdSXpeA/exec"; // must end with /exec

function buildUrl(route){
  const u = new URL(API_URL);
  u.searchParams.set("route", route);
  return u.toString();
}

async function apiGet(route){
  const res = await fetch(buildUrl(route), { method:"GET" });
  return await res.json();
}

async function apiPost(route, payload){
  const res = await fetch(buildUrl(route), {
    method:"POST",
    headers:{ "Content-Type":"text/plain;charset=utf-8" },
    body: JSON.stringify(payload || {})
  });
  return await res.json();
}

