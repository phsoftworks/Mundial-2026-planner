//////////////////////////////
// WORLD CUP 2026 APP
// PARTE 1/3 - BASE COMPLETA
//////////////////////////////

//////////////////////////////
// DATOS DEL MUNDIAL
//////////////////////////////

const matches = [
  // GROUP A
  {
    id: 1,
    group: "A",
    homeTeam: "Mexico",
    awayTeam: "South Africa",
    homeFlag: "flags/mexico.png",
    awayFlag: "flags/southafrica.png",
    stage: "Group A",
    stadium: "Estadio Azteca",
    city: "Mexico City",
    datetime: "2026-06-11T15:00:00"
  },
  {
    id: 2,
    group: "A",
    homeTeam: "South Korea",
    awayTeam: "Czechia",
    homeFlag: "flags/southkorea.png",
    awayFlag: "flags/czechia.png",
    stage: "Group A",
    stadium: "Estadio Akron",
    city: "Guadalajara",
    datetime: "2026-06-11T22:00:00"
  },
  {
    id: 3,
    group: "A",
    homeTeam: "Czechia",
    awayTeam: "South Africa",
    homeFlag: "flags/czechia.png",
    awayFlag: "flags/southafrica.png",
    stage: "Group A",
    stadium: "Mercedes-Benz Stadium",
    city: "Atlanta",
    datetime: "2026-06-18T12:00:00"
  },
  {
    id: 4,
    group: "A",
    homeTeam: "Mexico",
    awayTeam: "South Korea",
    homeFlag: "flags/mexico.png",
    awayFlag: "flags/southkorea.png",
    stage: "Group A",
    stadium: "Estadio Akron",
    city: "Guadalajara",
    datetime: "2026-06-18T21:00:00"
  },
  {
    id: 5,
    group: "A",
    homeTeam: "Czechia",
    awayTeam: "Mexico",
    homeFlag: "flags/czechia.png",
    awayFlag: "flags/mexico.png",
    stage: "Group A",
    stadium: "Estadio Azteca",
    city: "Mexico City",
    datetime: "2026-06-24T21:00:00"
  },
  {
    id: 6,
    group: "A",
    homeTeam: "South Africa",
    awayTeam: "South Korea",
    homeFlag: "flags/southafrica.png",
    awayFlag: "flags/southkorea.png",
    stage: "Group A",
    stadium: "Estadio BBVA",
    city: "Monterrey",
    datetime: "2026-06-24T21:00:00"
  },

  // GROUP B
  {
    id: 7,
    group: "B",
    homeTeam: "Canada",
    awayTeam: "Bosnia & Herzegovina",
    homeFlag: "flags/canada.png",
    awayFlag: "flags/bosnia.png",
    stage: "Group B",
    stadium: "BMO Field",
    city: "Toronto",
    datetime: "2026-06-12T18:00:00"
  },
  {
    id: 8,
    group: "B",
    homeTeam: "Qatar",
    awayTeam: "Switzerland",
    homeFlag: "flags/qatar.png",
    awayFlag: "flags/switzerland.png",
    stage: "Group B",
    stadium: "Levi's Stadium",
    city: "San Francisco",
    datetime: "2026-06-13T20:00:00"
  },
  {
    id: 9,
    group: "B",
    homeTeam: "Switzerland",
    awayTeam: "Bosnia & Herzegovina",
    homeFlag: "flags/switzerland.png",
    awayFlag: "flags/bosnia.png",
    stage: "Group B",
    stadium: "SoFi Stadium",
    city: "Los Angeles",
    datetime: "2026-06-18T18:00:00"
  },
  {
    id: 10,
    group: "B",
    homeTeam: "Canada",
    awayTeam: "Qatar",
    homeFlag: "flags/canada.png",
    awayFlag: "flags/qatar.png",
    stage: "Group B",
    stadium: "BC Place",
    city: "Vancouver",
    datetime: "2026-06-18T21:00:00"
  },
  {
    id: 11,
    group: "B",
    homeTeam: "Switzerland",
    awayTeam: "Canada",
    homeFlag: "flags/switzerland.png",
    awayFlag: "flags/canada.png",
    stage: "Group B",
    stadium: "BC Place",
    city: "Vancouver",
    datetime: "2026-06-24T18:00:00"
  },
  {
    id: 12,
    group: "B",
    homeTeam: "Bosnia & Herzegovina",
    awayTeam: "Qatar",
    homeFlag: "flags/bosnia.png",
    awayFlag: "flags/qatar.png",
    stage: "Group B",
    stadium: "Lumen Field",
    city: "Seattle",
    datetime: "2026-06-24T21:00:00"
  },

  // GROUP C (inicio)
  {
    id: 13,
    group: "C",
    homeTeam: "Brazil",
    awayTeam: "Morocco",
    homeFlag: "flags/brazil.png",
    awayFlag: "flags/morocco.png",
    stage: "Group C",
    stadium: "MetLife Stadium",
    city: "New York",
    datetime: "2026-06-13T21:00:00"
  },
  {
    id: 14,
    group: "C",
    homeTeam: "Haiti",
    awayTeam: "Scotland",
    homeFlag: "flags/haiti.png",
    awayFlag: "flags/scotland.png",
    stage: "Group C",
    stadium: "Gillette Stadium",
    city: "Boston",
    datetime: "2026-06-13T18:00:00"
  }
];

//////////////////////////////
// ESTADO (LOCALSTORAGE)
//////////////////////////////

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let watched = JSON.parse(localStorage.getItem("watched")) || [];

//////////////////////////////
// DOM
//////////////////////////////

const matchList = document.getElementById("matchList");

//////////////////////////////
// INICIO APP
//////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  hideSplash();
  renderMatches(matches);
});

//////////////////////////////
// RENDER PARTIDOS
//////////////////////////////

function renderMatches(list) {
  matchList.innerHTML = "";

  list.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card";
<div class="predictions">
  <button onclick="predict(${match.id}, 'home')">🏠</button>
  <button onclick="predict(${match.id}, 'draw')">🤝</button>
  <button onclick="predict(${match.id}, 'away')">✈️</button>
</div>
    if (favorites.includes(match.id)) card.classList.add("favorite");
    if (watched.includes(match.id)) card.classList.add("watched");

    card.innerHTML = `
      <div class="match-info">

        <div class="teams">
          <span class="team">
            <img src="${match.homeFlag}">
            ${match.homeTeam}
          </span>

          <span class="vs">VS</span>

          <span class="team">
            <img src="${match.awayFlag}">
            ${match.awayTeam}
          </span>
        </div>

        <span class="match-stage">${match.stage}</span>

        <div class="match-location">
          ${match.city} · ${match.stadium}
        </div>

        <div class="match-time">
          ⏰ ${new Date(match.datetime).toLocaleString("es-ES")}
        </div>

      </div>

      <div class="match-actions">
        <button onclick="toggleFavorite(${match.id})">⭐</button>
        <button onclick="toggleWatched(${match.id})">👁️</button>
        <button class="share-btn" onclick="shareMatch(${match.id})">🔗</button>
      </div>
    `;

    matchList.appendChild(card);
  });
}

//////////////////////////////
// FAVORITOS
//////////////////////////////

function toggleFavorite(id) {
  favorites = favorites.includes(id)
    ? favorites.filter(x => x !== id)
    : [...favorites, id];

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderMatches(matches);
}

//////////////////////////////
// VISTOS
//////////////////////////////

function toggleWatched(id) {
  watched = watched.includes(id)
    ? watched.filter(x => x !== id)
    : [...watched, id];

  localStorage.setItem("watched", JSON.stringify(watched));
  renderMatches(matches);
}

//////////////////////////////
// SHARE
//////////////////////////////

function shareMatch(id) {
  const match = matches.find(m => m.id === id);
  if (!match) return;

  if (navigator.share) {
    navigator.share({
      title: `${match.homeTeam} vs ${match.awayTeam}`,
      text: `${match.stage} - ${match.city}`,
      url: window.location.href
    });
  }
}

//////////////////////////////
// HELPERS
//////////////////////////////

function hideSplash() {
  const splash = document.getElementById("splash");
  if (splash) {
    setTimeout(() => splash.style.display = "none", 1000);
  }
}
//////////////////////////////
// WORLD CUP 2026 APP
// PARTE 2/3 - FILTROS + BUSCADOR + CALENDARIO + NEXT MATCH + COUNTDOWN
//////////////////////////////

//////////////////////////////
// FILTROS
//////////////////////////////

function setupFilters() {
  const container = document.querySelector(".filters-section");
  if (!container) return;

  container.innerHTML = `
    <select id="groupFilter">
      <option value="ALL">Todos los grupos</option>
      <option value="A">Grupo A</option>
      <option value="B">Grupo B</option>
      <option value="C">Grupo C</option>
    </select>

    <button id="favoritesFilter">⭐ Favoritos</button>
    <button id="watchedFilter">👁️ Vistos</button>
    <button id="resetFilter">Reset</button>
  `;

  const groupFilter = document.getElementById("groupFilter");
  const favBtn = document.getElementById("favoritesFilter");
  const watchedBtn = document.getElementById("watchedFilter");
  const resetBtn = document.getElementById("resetFilter");

  groupFilter.addEventListener("change", () => applyFilters());
  favBtn.addEventListener("click", () => filterFavorites());
  watchedBtn.addEventListener("click", () => filterWatched());
  resetBtn.addEventListener("click", () => renderMatches(matches));
}

function applyFilters() {
  const group = document.getElementById("groupFilter").value;

  let filtered = matches;

  if (group !== "ALL") {
    filtered = filtered.filter(m => m.group === group);
  }

  renderMatches(filtered);
}

function filterFavorites() {
  const filtered = matches.filter(m => favorites.includes(m.id));
  renderMatches(filtered);
}

function filterWatched() {
  const filtered = matches.filter(m => watched.includes(m.id));
  renderMatches(filtered);
}

//////////////////////////////
// BUSCADOR
//////////////////////////////

function setupSearch() {
  const input = document.querySelector("input");

  if (!input) return;

  input.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = matches.filter(m =>
      m.homeTeam.toLowerCase().includes(value) ||
      m.awayTeam.toLowerCase().includes(value) ||
      m.city.toLowerCase().includes(value) ||
      m.stadium.toLowerCase().includes(value)
    );

    renderMatches(filtered);
  });
}

//////////////////////////////
// PRÓXIMO PARTIDO
//////////////////////////////

function getNextMatch() {
  const now = new Date();

  const future = matches
    .filter(m => new Date(m.datetime) > now)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  return future[0];
}

function showNextMatch() {
  const next = getNextMatch();
  const container = document.getElementById("nextMatchCard");

  if (!next || !container) return;

  container.innerHTML = `
    <div>
      <strong>Próximo partido</strong><br><br>
      ${next.homeTeam} vs ${next.awayTeam}<br>
      📍 ${next.city}<br>
      🏟️ ${next.stadium}<br>
      ⏰ ${new Date(next.datetime).toLocaleString("es-ES")}
    </div>
  `;
}

//////////////////////////////
// COUNTDOWN
//////////////////////////////

function startCountdown() {
  const container = document.getElementById("countdownCard");
  if (!container) return;

  setInterval(() => {
    const next = getNextMatch();
    if (!next) return;

    const now = new Date();
    const matchTime = new Date(next.datetime);

    const diff = matchTime - now;

    if (diff <= 0) {
      container.innerHTML = "🔥 ¡Partido en juego!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    container.innerHTML = `
      ⏳ ${days}d ${hours}h ${minutes}m ${seconds}s
    `;
  }, 1000);
}

//////////////////////////////
// CALENDARIO SIMPLE
//////////////////////////////

function buildCalendar() {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  const days = 30; // mes simple demo
  calendar.innerHTML = "";

  for (let i = 1; i <= days; i++) {
    const day = document.createElement("div");
    day.className = "day";

    const hasMatch = matches.some(m =>
      new Date(m.datetime).getDate() === i
    );

    if (hasMatch) day.classList.add("has-match");

    day.innerHTML = `
      <div class="day-number">${i}</div>
      ${hasMatch ? "⚽ Partido" : ""}
    `;

    calendar.appendChild(day);
  }
}

//////////////////////////////
// INIT EXTRA
//////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  setupSearch();
  showNextMatch();
  buildCalendar();
  startCountdown();
});
//////////////////////////////
// WORLD CUP 2026 APP
// PARTE 3/3 - PWA + OFFLINE + POLISH FINAL
//////////////////////////////

//////////////////////////////
// PWA INSTALL PROMPT
//////////////////////////////

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  showInstallButton();
});

function showInstallButton() {
  const container = document.querySelector(".info-section");
  if (!container) return;

  const btn = document.createElement("button");
  btn.textContent = "📲 Instalar App";

  btn.style.marginTop = "15px";

  btn.onclick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("App instalada");
    }

    deferredPrompt = null;
  };

  container.appendChild(btn);
}

//////////////////////////////
// SERVICE WORKER (OFFLINE MODE)
//////////////////////////////

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("SW registrado"))
      .catch(err => console.log("SW error", err));
  });
}

//////////////////////////////
// UI POLISH (MOBILE UX)
//////////////////////////////

function enableMobileUX() {
  // Evita zoom raro en iOS al tocar botones
  document.addEventListener("touchstart", () => {}, { passive: true });

  // Scroll suave
  document.documentElement.style.scrollBehavior = "smooth";
}

enableMobileUX();

//////////////////////////////
// AUTO UPDATE VIEW (LIVE APP STYLE)
//////////////////////////////

function autoRefreshMatches() {
  setInterval(() => {
    renderMatches(matches);
    showNextMatch();
  }, 60000); // cada 1 minuto
}

autoRefreshMatches();

//////////////////////////////
// DARK MODE READY HOOK (FUTURO)
//////////////////////////////

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
  );
}

(function initTheme() {
  const dark = localStorage.getItem("darkMode") === "true";
  if (dark) document.body.classList.add("dark");
})();

//////////////////////////////
// PERFORMANCE OPTIMIZATION
//////////////////////////////

function lazyRender() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll(".match-card")
    .forEach(el => observer.observe(el));
}

//////////////////////////////
// NOTIFICACIONES (OPCIONAL FUTURO)
//////////////////////////////

function enableNotifications() {
  if (!("Notification" in window)) return;

  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notificaciones activadas");
    }
  });
}

//////////////////////////////
// FINAL INIT HOOKS
//////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  enableMobileUX();
  lazyRender();
});

//////////////////////////////
// MINI SW FILE (CREADO EN JS PARA FACILIDAD)
// ⚠️ EN PRODUCCIÓN DEBE IR EN sw.js
//////////////////////////////

const swCode = `
const CACHE_NAME = "wc2026-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
`;
//////////////////////////////
// NOTIFICACIONES PRO
//////////////////////////////

function requestNotifications() {
  if (!("Notification" in window)) return;

  Notification.requestPermission();
}

function notifyMatch(match) {
  new Notification("⚽ Partido del día", {
    body: `${match.homeTeam} vs ${match.awayTeam} - ${match.city}`,
  });
}
function getTodayMatches() {
  const today = new Date().toISOString().split("T")[0];

  return matches.filter(m =>
    m.datetime.startsWith(today)
  );
}
function dailyNotificationSystem() {
  const last = localStorage.getItem("lastNotifDate");
  const today = new Date().toISOString().split("T")[0];

  if (last === today) return;

  const todayMatches = getTodayMatches();

  if (todayMatches.length > 0) {
    todayMatches.forEach(m => notifyMatch(m));
  }

  localStorage.setItem("lastNotifDate", today);
}
document.addEventListener("DOMContentLoaded", () => {
  requestNotifications();
  dailyNotificationSystem();
});
let polls = JSON.parse(localStorage.getItem("polls")) || {};

function initPoll(matchId) {
  if (!polls[matchId]) {
    polls[matchId] = {
      home: 0,
      draw: 0,
      away: 0,
      users: {}
    };
  }
}

function vote(matchId, type, user = "anon") {
  initPoll(matchId);

  polls[matchId][type]++;

  polls[matchId].users[user] = type;

  localStorage.setItem("polls", JSON.stringify(polls));

  renderMatches(matches);
}
function getPoll(matchId) {
  initPoll(matchId);
  return polls[matchId];
}

function getPollUI(matchId) {
  const p = getPoll(matchId);
  const total = p.home + p.draw + p.away || 1;

  return `
    🏠 ${Math.round(p.home / total * 100)}%
    🤝 ${Math.round(p.draw / total * 100)}%
    ✈️ ${Math.round(p.away / total * 100)}%
  `;
}
{
  id: 1,
  group: "A",
  homeTeam: "Mexico",
  awayTeam: "South Africa",
  datetime: "2026-06-11T15:00:00",
  stadium: "Estadio Azteca",
  city: "Mexico City",
  stage: "Group Stage"
}
//////////////////////////////
// LIGA PRO - USUARIOS
//////////////////////////////

let user = localStorage.getItem("user") || prompt("Tu nombre de jugador:");
localStorage.setItem("user", user);

let league = localStorage.getItem("league") || prompt("Código de tu liga (ej: FRIENDS1):");
localStorage.setItem("league", league);
let leagueData = JSON.parse(localStorage.getItem("leagueData")) || {
  users: {},
  predictions: {}
};
function predict(matchId, choice) {
  if (!leagueData.predictions[matchId]) {
    leagueData.predictions[matchId] = {};
  }

  leagueData.predictions[matchId][user] = choice;

  saveLeague();
}
function saveLeague() {
  localStorage.setItem("leagueData", JSON.stringify(leagueData));
}
const results = {
  1: "home",
  2: "away",
  3: "draw"
};
function calculatePoints() {
  const points = {};

  Object.keys(leagueData.predictions).forEach(matchId => {
    const real = results[matchId];

    const preds = leagueData.predictions[matchId];

    Object.keys(preds).forEach(u => {
      if (!points[u]) points[u] = 0;

      if (preds[u] === real) {
        points[u] += 3; // acierto
      }
    });
  });

  return points;
}
function getRanking() {
  const points = calculatePoints();

  const sorted = Object.entries(points)
    .sort((a, b) => b[1] - a[1]);

  return sorted;
}
function renderRanking() {
  const container = document.getElementById("ranking");

  if (!container) return;

  const ranking = getRanking();

  container.innerHTML = `
    <h3>🏆 Ranking Liga: ${league}</h3>
    ${ranking.map(([name, pts], i) => `
      <div class="rank-row">
        <b>${i + 1}. ${name}</b> - ${pts} pts
      </div>
    `).join("")}
  `;
}
document.addEventListener("DOMContentLoaded", () => {
  renderRanking();

  setInterval(() => {
    renderRanking();
  }, 5000);
});
let user = localStorage.getItem("user") || prompt("Tu nombre:");
localStorage.setItem("user", user);

let league = localStorage.getItem("league") || prompt("Código liga (ej: WCFRIENDS):");
localStorage.setItem("league", league);

let db = JSON.parse(localStorage.getItem("db")) || {
  leagues: {}
};

if (!db.leagues[league]) {
  db.leagues[league] = {
    users: [],
    predictions: {},
    polls: {}
  };
}
function predict(matchId, pick) {
  const l = db.leagues[league];

  if (!l.predictions[matchId]) {
    l.predictions[matchId] = {};
  }

  l.predictions[matchId][user] = pick;

  saveDB();
}
function votePoll(matchId, option) {
  const l = db.leagues[league];

  if (!l.polls[matchId]) {
    l.polls[matchId] = { home: 0, draw: 0, away: 0 };
  }

  l.polls[matchId][option]++;

  saveDB();
}
const results = {}; // luego API real

function getPoints() {
  const l = db.leagues[league];
  const points = {};

  for (let matchId in l.predictions) {
    const real = results[matchId];

    for (let u in l.predictions[matchId]) {
      if (!points[u]) points[u] = 0;

      if (l.predictions[matchId][u] === real) {
        points[u] += 3;
      }
    }
  }

  return points;
}
function getRanking() {
  return Object.entries(getPoints())
    .sort((a, b) => b[1] - a[1]);
}
function saveDB() {
  localStorage.setItem("db", JSON.stringify(db));
}
function notifyTodayMatches() {
  const today = new Date().toISOString().split("T")[0];

  const todayMatches = matches.filter(m =>
    m.datetime.startsWith(today)
  );

  if (!todayMatches.length) return;

  if (Notification.permission === "granted") {
    todayMatches.forEach(m => {
      new Notification("⚽ Partido hoy", {
        body: `${m.homeTeam} vs ${m.awayTeam}`
      });
    });
  }
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

function initApp() {
  notifyTodayMatches();
}
document.addEventListener("DOMContentLoaded", () => {
  initApp();
  renderMatches(matches);
  renderRanking?.();
});
let user = localStorage.getItem("user") || prompt("Tu nombre:");
localStorage.setItem("user", user);

let league = localStorage.getItem("league") || prompt("Código liga (ej: WC2026):");
localStorage.setItem("league", league);

let db = JSON.parse(localStorage.getItem("db")) || {
  leagues: {}
};

if (!db.leagues[league]) {
  db.leagues[league] = {
    users: [],
    predictions: {},
    polls: {}
  };
}

if (!db.leagues[league].users.includes(user)) {
  db.leagues[league].users.push(user);
}
function predict(matchId, pick) {
  const l = db.leagues[league];

  if (!l.predictions[matchId]) {
    l.predictions[matchId] = {};
  }

  l.predictions[matchId][user] = pick;

  saveDB();
}
function votePoll(matchId, option) {
  const l = db.leagues[league];

  if (!l.polls[matchId]) {
    l.polls[matchId] = { home: 0, draw: 0, away: 0 };
  }

  l.polls[matchId][option]++;

  saveDB();
}
function saveDB() {
  localStorage.setItem("db", JSON.stringify(db));
}
function getPoints() {
  const l = db.leagues[league];
  const points = {};

  const results = {}; // luego lo actualizamos

  for (let matchId in l.predictions) {
    const real = results[matchId];

    for (let u in l.predictions[matchId]) {
      if (!points[u]) points[u] = 0;

      if (l.predictions[matchId][u] === real) {
        points[u] += 3;
      }
    }
  }

  return Object.entries(points)
    .sort((a, b) => b[1] - a[1]);
}
function exportLeague() {
  const data = JSON.stringify(db);
  prompt("Copia esto para compartir liga:", data);
}

function importLeague() {
  const data = prompt("Pega la liga:");
  db = JSON.parse(data);
  saveDB();
}
