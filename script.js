//////////////////////////////
// ⚽ WORLD CUP PULSE 26 - CORE CLEAN V1
//////////////////////////////

const state = {
  user: null,
  leagueId: null,
  db: null,
  matches: [],
  favorites: [],
  watched: [],
  stats: {
    xp: 0,
    level: 1,
    streak: 0,
    medals: []
  }
};

//////////////////////////////
// ⚽ MATCHES BASE (DEMO LIMPIO)
//////////////////////////////

state.matches = [
  {
    id: 1,
    stage: "group",
    group: "A",
    homeTeam: "Mexico",
    awayTeam: "South Africa",
    homeFlag: "flags/mexico.svg",
    awayFlag: "flags/southafrica.svg",
    stadium: "Estadio Azteca",
    city: "Mexico City",
    datetime: "2026-06-11T15:00:00"
  },
  {
    id: 2,
    stage: "group",
    group: "A",
    homeTeam: "South Korea",
    awayTeam: "Czechia",
    homeFlag: "flags/southkorea.svg",
    awayFlag: "flags/czechia.svg",
    stadium: "Estadio Akron",
    city: "Guadalajara",
    datetime: "2026-06-11T22:00:00"
  },
  {
    id: 3,
    stage: "group",
    group: "B",
    homeTeam: "Canada",
    awayTeam: "Switzerland",
    homeFlag: "flags/canada.svg",
    awayFlag: "flags/switzerland.svg",
    stadium: "BMO Field",
    city: "Toronto",
    datetime: "2026-06-12T18:00:00"
  }
];

//////////////////////////////
// 👤 INIT USER + LIGA
//////////////////////////////

function initUser() {
  state.user = localStorage.getItem("user") || prompt("Tu nombre:");
  localStorage.setItem("user", state.user);

  state.leagueId = localStorage.getItem("leagueId") || prompt("Código de liga:");
  localStorage.setItem("leagueId", state.leagueId);
}

//////////////////////////////
// 💾 DB LOCAL
//////////////////////////////

function loadDB() {
  state.db = JSON.parse(localStorage.getItem("db")) || { leagues: {} };

  if (!state.db.leagues[state.leagueId]) {
    state.db.leagues[state.leagueId] = {
      users: [],
      predictions: {},
      polls: {}
    };
  }

  if (!state.db.leagues[state.leagueId].users.includes(state.user)) {
    state.db.leagues[state.leagueId].users.push(state.user);
  }

  saveDB();
}

function saveDB() {
  localStorage.setItem("db", JSON.stringify(state.db));
}

//////////////////////////////
// ⭐ FAVORITOS / 👁️ VISTOS
//////////////////////////////

function toggleFavorite(id) {
  if (!state.favorites.includes(id)) {
    state.favorites.push(id);
  } else {
    state.favorites = state.favorites.filter(x => x !== id);
  }

  localStorage.setItem("favorites", JSON.stringify(state.favorites));

  renderFavorites();
  renderMatches();
}

function renderFavorites() {
  const el = document.getElementById("favoriteList");
  if (!el) return;

  const favMatches = state.matches.filter(m =>
    state.favorites.includes(m.id)
  );

  el.innerHTML = favMatches.map(m => `
    <div class="match-card favorite">
      <div>
        <b>${m.homeTeam}</b> vs <b>${m.awayTeam}</b>
        <div class="match-location">${m.city}</div>
      </div>
    </div>
  `).join("");
}

function toggleWatched(id) {
  if (state.watched.includes(id)) {
    state.watched = state.watched.filter(x => x !== id);
  } else {
    state.watched.push(id);
  }

  localStorage.setItem("watched", JSON.stringify(state.watched));
  renderMatches();
}

//////////////////////////////
// 🗳️ POLLS
//////////////////////////////

function votePoll(matchId, option) {
  const l = state.db.leagues[state.leagueId];

  if (!l.polls[matchId]) {
    l.polls[matchId] = { home: 0, draw: 0, away: 0 };
  }

  l.polls[matchId][option]++;

  saveDB();
  renderMatches();
}

//////////////////////////////
// 🧠 PREDICCIONES
//////////////////////////////

function predict(matchId, pick) {
  const l = state.db.leagues[state.leagueId];

  if (!l.predictions[matchId]) {
    l.predictions[matchId] = {};
  }

  l.predictions[matchId][state.user] = pick;

  saveDB();
  addXP(10);
  showToast("⚽ Predicción guardada +10 XP");

  renderMatches();
}

//////////////////////////////
// 🏆 XP SYSTEM
//////////////////////////////

function addXP(amount) {
  state.stats.xp += amount;

  let next = state.stats.level * 100;

  if (state.stats.xp >= next) {
    state.stats.level++;
    state.stats.xp = 0;
    showToast("🔥 Nivel subido!");
  }

  saveStats();
  updateProfile();
}

function saveStats() {
  localStorage.setItem("stats", JSON.stringify(state.stats));
}

function loadStats() {
  const s = JSON.parse(localStorage.getItem("stats"));
  if (s) state.stats = s;
}

//////////////////////////////
// 🎨 TOAST
//////////////////////////////

function showToast(msg) {
  const t = document.createElement("div");

  t.textContent = msg;
  t.style.position = "fixed";
  t.style.bottom = "20px";
  t.style.left = "50%";
  t.style.transform = "translateX(-50%)";
  t.style.background = "rgba(0,0,0,0.85)";
  t.style.color = "#fff";
  t.style.padding = "12px 18px";
  t.style.borderRadius = "12px";
  t.style.zIndex = 9999;

  document.body.appendChild(t);

  setTimeout(() => t.remove(), 2000);
}

//////////////////////////////
// ⚽ RENDER MATCHES
//////////////////////////////

function renderMatches() {
  const el = document.getElementById("matchList");
  if (!el) return;

  el.innerHTML = "";

  state.matches.forEach(m => {
    const card = document.createElement("div");
    card.className = "match-card";

    const poll = state.db.leagues[state.leagueId].polls[m.id] || { home: 0, draw: 0, away: 0 };

    card.innerHTML = `
      <div class="match-info">

        <div class="teams">
          <div class="team">
            <img src="${m.homeFlag}">
            ${m.homeTeam}
          </div>

          <div class="vs">VS</div>

          <div class="team">
            <img src="${m.awayFlag}">
            ${m.awayTeam}
          </div>
        </div>

        <div class="match-location">
          ${m.city} · ${m.stadium}
        </div>

        <div class="match-time">
          ⏰ ${new Date(m.datetime).toLocaleString()}
        </div>

        <div>
          🏠 ${poll.home} 🤝 ${poll.draw} ✈️ ${poll.away}
        </div>

      </div>

      <div class="match-actions">
        <button onclick="toggleFavorite(${m.id})">⭐</button>
        <button onclick="toggleWatched(${m.id})">👁️</button>
        <button onclick="predict(${m.id}, 'home')">🏠</button>
        <button onclick="predict(${m.id}, 'draw')">🤝</button>
        <button onclick="predict(${m.id}, 'away')">✈️</button>
        <button onclick="votePoll(${m.id}, 'home')">📊</button>
        <button onclick="bet(${m.id}, 'home', 10)">💰 H</button>
<button onclick="bet(${m.id}, 'draw', 10)">💰 D</button>
<button onclick="bet(${m.id}, 'away', 10)">💰 A</button>
      </div>
    `;

    el.appendChild(card);
  });

  updateProfile();
}

//////////////////////////////
// 👤 PROFILE
//////////////////////////////

function updateProfile() {
  const el = document.getElementById("profile");
  if (!el) return;

  el.innerHTML = `
    <div class="profile-card">
      <h2>${state.user}</h2>
      <p>🏆 Nivel: ${state.stats.level}</p>
      <p>⚡ XP: ${state.stats.xp}</p>
      <p>🪙 Coins: ${state.stats.coins || 100}</p>
    </div>
  `;
}

//////////////////////////////
// 🚀 INIT APP
//////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  initUser();
  loadDB();
  loadStats();
  renderMatches();
  updateProfile();
  document.addEventListener("DOMContentLoaded", () => {
  initUser();
  loadDB();
  loadStats();

  renderMatches();
  updateProfile();

  buildCalendar();
  renderFavorites();
  renderRanking();
});
});
//////////////////////////////
// 📅 CALENDARIO WORLD CUP
//////////////////////////////

let currentDate = new Date();

function buildCalendar() {
  const el = document.getElementById("calendar");
  if (!el) return;

  el.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  document.getElementById("monthTitle").innerText =
    currentDate.toLocaleString("es", { month: "long", year: "numeric" });

  for (let i = 0; i < firstDay; i++) {
    el.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day).toISOString().split("T")[0];

    const matchesDay = state.matches.filter(m =>
      m.datetime.startsWith(date)
    );

    const div = document.createElement("div");
    div.className = "day";

    if (matchesDay.length) div.classList.add("has-match");

    const today = new Date().toISOString().split("T")[0];
    if (date === today) div.classList.add("today");

    div.innerHTML = `
      <div class="day-number">${day}</div>
      <div style="font-size:12px;">
        ${matchesDay.length ? "⚽ " + matchesDay.length : ""}
      </div>
    `;

    el.appendChild(div);
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  buildCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  buildCalendar();
}
function getPoints() {
  const l = state.db.leagues[state.leagueId];
  const points = {};

  const results = {}; // luego API real

  for (let matchId in l.predictions) {
    const real = results[matchId];

    for (let user in l.predictions[matchId]) {
      if (!points[user]) points[user] = 0;

      if (l.predictions[matchId][user] === real) {
        points[user] += 3;
      }
    }
  }

  return points;
}

function renderRanking() {
  const el = document.getElementById("ranking");
  if (!el) return;

  const ranking = Object.entries(getPoints())
    .sort((a, b) => b[1] - a[1]);

  el.innerHTML = ranking.map(([user, pts], i) => `
    <div class="rank-row">
      <b>${i + 1}. ${user}</b> — ${pts} pts
    </div>
  `).join("");
}
//////////////////////////////
// 💰 SISTEMA DE MONEDAS
//////////////////////////////

function initWallet() {
  if (!state.stats.coins) {
    state.stats.coins = 100; // inicio
  }
}

function saveWallet() {
  saveStats();
}

function addCoins(amount) {
  state.stats.coins += amount;
  saveWallet();
  updateProfile();
}

function spendCoins(amount) {
  if (state.stats.coins < amount) return false;

  state.stats.coins -= amount;
  saveWallet();
  updateProfile();
  return true;
}
//////////////////////////////
// 🎮 BET SYSTEM
//////////////////////////////

function bet(matchId, pick, amount) {
  const multiplier = amount > 20 ? 2.5 : 2;

  if (!spendCoins(amount)) {
    showToast("❌ No coins");
    return;
  }

  const l = state.db.leagues[state.leagueId];

  if (!l.bets) l.bets = {};
  if (!l.bets[matchId]) l.bets[matchId] = {};

  l.bets[matchId][state.user] = {
    pick,
    amount,
    multiplier
  };

  saveDB();
  showToast(`💰 Apuesta: ${amount} coins`);
}
function resolveBets(matchId, correctResult) {
  const l = state.db.leagues[state.leagueId];

  const bets = l.bets?.[matchId];
  if (!bets) return;

  for (let user in bets) {
    const bet = bets[user];

    if (bet.pick === correctResult) {
      const win = bet.amount * 2; // multiplicador

      if (user === state.user) {
        addCoins(win);
        showToast(`🏆 Ganaste ${win} coins`);
      }
    }
  }

  saveDB();
}