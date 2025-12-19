const API_BASE = "https://script.google.com/macros/s/AKfycby2DvyIRUqqbpKmg8JM5sQJXO37TqWSI1Qbx4fiOJu8uJwzpCENkWW2smZw61kkdSXpeA/exec";

function jsonp(route, params = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = "cb_" + Date.now();

    window[callbackName] = function (data) {
      resolve(data);
      delete window[callbackName];
      script.remove();
    };

    const url = new URL(API_BASE);
    url.searchParams.set("route", route);
    url.searchParams.set("callback", callbackName);

    Object.keys(params).forEach(key => {
      if (params[key]) url.searchParams.set(key, params[key]);
    });

    const script = document.createElement("script");
    script.src = url.toString();

    script.onerror = function () {
      reject(new Error("API load failed"));
      delete window[callbackName];
      script.remove();
    };

    document.body.appendChild(script);
  });
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
