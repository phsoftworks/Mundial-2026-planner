//////////////////////////////
// ⚽ WORLD CUP 2026 - CORE CLEAN
//////////////////////////////

const matches = [
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
    group: "B",
    homeTeam: "Canada",
    awayTeam: "Switzerland",
    homeFlag: "flags/canada.png",
    awayFlag: "flags/switzerland.png",
    stage: "Group B",
    stadium: "BMO Field",
    city: "Toronto",
    datetime: "2026-06-12T18:00:00"
  }
];

//////////////////////////////
// 👤 USER + LEAGUE
//////////////////////////////

let user = localStorage.getItem("user") || prompt("Tu nombre:");
localStorage.setItem("user", user);

let league = localStorage.getItem("league") || prompt("Código liga:");
localStorage.setItem("league", league);

//////////////////////////////
// 💾 DATABASE LOCAL
//////////////////////////////

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

function saveDB() {
  localStorage.setItem("db", JSON.stringify(db));
}
//////////////////////////////
// ❤️ FAVORITOS / 👁️ VISTOS
//////////////////////////////

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let watched = JSON.parse(localStorage.getItem("watched")) || [];

function toggleFavorite(id) {
  favorites = favorites.includes(id)
    ? favorites.filter(x => x !== id)
    : [...favorites, id];

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderMatches(matches);
}

function toggleWatched(id) {
  watched = watched.includes(id)
    ? watched.filter(x => x !== id)
    : [...watched, id];

  localStorage.setItem("watched", JSON.stringify(watched));
  renderMatches(matches);
}

//////////////////////////////
// 🗳️ POLLS
//////////////////////////////

function votePoll(matchId, option) {
  const l = db.leagues[league];

  if (!l.polls[matchId]) {
    l.polls[matchId] = { home: 0, draw: 0, away: 0 };
  }

  l.polls[matchId][option]++;

  saveDB();
}
//////////////////////////////
// 🏆 PREDICCIONES (FANTASY)
//////////////////////////////

function predict(matchId, pick) {
  const l = db.leagues[league];

  if (!l.predictions[matchId]) {
    l.predictions[matchId] = {};
  }

  l.predictions[matchId][user] = pick;

  saveDB();
}

//////////////////////////////
// 🧮 RESULTADOS (SIMULADO)
//////////////////////////////

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

function renderRanking() {
  const container = document.getElementById("ranking");
  if (!container) return;

  const ranking = getRanking();

  container.innerHTML = `
    <h3>🏆 Liga ${league}</h3>
    ${ranking.map(([name, pts], i) => `
      <div>${i + 1}. ${name} - ${pts} pts</div>
    `).join("")}
  `;
}
//////////////////////////////
// ⚽ RENDER PARTIDOS
//////////////////////////////

const matchList = document.getElementById("matchList");

function renderMatches(list) {
  matchList.innerHTML = "";

  list.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card";

    const poll = db.leagues[league].polls[match.id] || { home: 0, draw: 0, away: 0 };

    card.innerHTML = `
      <div class="match-info">
        <div>
          <b>${match.homeTeam}</b> vs <b>${match.awayTeam}</b>
        </div>

        <div>${match.city} · ${match.stadium}</div>

        <div>⏰ ${new Date(match.datetime).toLocaleString()}</div>

        <div class="poll">
          🏠 ${poll.home} 🤝 ${poll.draw} ✈️ ${poll.away}
        </div>
      </div>

      <div class="match-actions">
        <button onclick="toggleFavorite(${match.id})">⭐</button>
        <button onclick="toggleWatched(${match.id})">👁️</button>
        <button onclick="predict(${match.id}, 'home')">🏠</button>
        <button onclick="predict(${match.id}, 'draw')">🤝</button>
        <button onclick="predict(${match.id}, 'away')">✈️</button>
        <button onclick="votePoll(${match.id}, 'home')">📊</button>
      </div>
    `;

    matchList.appendChild(card);
  });

  renderRanking();
}

//////////////////////////////
// 🚀 INIT APP
//////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  renderMatches(matches);
});

//////////////////////////////
// 🌍 WORLD CUP DATA (MEJORADO)
//////////////////////////////

const groups = {
  A: ["Mexico", "South Africa", "South Korea", "Czechia"],
  B: ["Canada", "Switzerland", "Qatar", "Bosnia & Herzegovina"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"]
};

//////////////////////////////
// 🧠 USER STATS (XP SYSTEM)
//////////////////////////////

let stats = JSON.parse(localStorage.getItem("stats")) || {
  xp: 0,
  level: 1,
  streak: 0,
  medals: []
};

function saveStats() {
  localStorage.setItem("stats", JSON.stringify(stats));
}

function addXP(amount) {
  stats.xp += amount;

  let nextLevelXP = stats.level * 100;

  if (stats.xp >= nextLevelXP) {
    stats.level++;
    stats.xp = 0;

    showToast(`🔥 Nivel ${stats.level} desbloqueado!`);
    unlockMedal("LEVEL_UP");
  }

  saveStats();
  updateProfileUI();
}

function addStreak() {
  stats.streak++;
  saveStats();

  if (stats.streak === 3) unlockMedal("HOT_STREAK");
  if (stats.streak === 5) unlockMedal("FIRE_MODE");
}

function resetStreak() {
  stats.streak = 0;
  saveStats();
}

function unlockMedal(type) {
  if (!stats.medals.includes(type)) {
    stats.medals.push(type);
    showToast(`🏅 Medalla desbloqueada: ${type}`);
    saveStats();
  }
}

//////////////////////////////
// 🎮 MEDALLAS DEFINIDAS
//////////////////////////////

const medalNames = {
  LEVEL_UP: "Subiendo nivel",
  HOT_STREAK: "Racha caliente 🔥",
  FIRE_MODE: "Modo leyenda ⚡",
  PREDICT_MASTER: "Maestro de predicciones",
  FANS_CHOICE: "Favorito de la afición"
};

//////////////////////////////
// ⚽ MEJORAR PREDICCIÓN (CON XP)
//////////////////////////////

const oldPredict = predict;

predict = function(matchId, pick) {
  oldPredict(matchId, pick);

  addXP(10);
  addStreak();

  showToast("⚽ Predicción guardada +10 XP");

  if (navigator.vibrate) navigator.vibrate(50);
};

//////////////////////////////
// 🗳️ VOTOS XP
//////////////////////////////

const oldVotePoll = votePoll;

votePoll = function(matchId, option) {
  oldVotePoll(matchId, option);

  addXP(5);
  showToast("📊 Voto registrado +5 XP");

  if (navigator.vibrate) navigator.vibrate(30);
};

//////////////////////////////
// 🎨 TOAST SYSTEM (UI FEEDBACK)
//////////////////////////////

function showToast(msg) {
  let toast = document.createElement("div");

  toast.textContent = msg;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(0,0,0,0.85)";
  toast.style.color = "white";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "12px";
  toast.style.zIndex = 99999;
  toast.style.fontSize = "14px";
  toast.style.backdropFilter = "blur(10px)";
  toast.style.animation = "fadeInOut 2s ease";

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}

//////////////////////////////
// 📊 PERFIL UI UPDATE
//////////////////////////////

function updateProfileUI() {
  let el = document.getElementById("profile");
  if (!el) return;

  el.innerHTML = `
    <div class="profile-card">
      <h2>👤 ${user}</h2>
      <p>🏆 Nivel: ${stats.level}</p>
      <p>⚡ XP: ${stats.xp}/${stats.level * 100}</p>
      <p>🔥 Racha: ${stats.streak}</p>
      <p>🏅 Medallas: ${stats.medals.length}</p>
    </div>
  `;
}

//////////////////////////////
// 🏆 MEJOR RANKING VISUAL
//////////////////////////////

function renderRankingEnhanced() {
  const el = document.getElementById("ranking");
  if (!el) return;

  const ranking = getRanking();

  el.innerHTML = `
    <div class="ranking-title">🏆 CLASIFICACIÓN LIGA</div>
    ${ranking.map(([name, pts], i) => `
      <div class="rank-card ${i === 0 ? "leader" : ""}">
        <span>${i + 1}. ${name}</span>
        <b>${pts} pts</b>
      </div>
    `).join("")}
  `;
}

//////////////////////////////
// 🎬 ANIMACIONES AUTOMÁTICAS
//////////////////////////////

function animateCards() {
  document.querySelectorAll(".match-card").forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "0.4s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, i * 60);
  });
}

//////////////////////////////
// ⚡ AUTO REFRESH PRO
//////////////////////////////

setInterval(() => {
  renderMatches(matches);
  renderRankingEnhanced();
  updateProfileUI();
  animateCards();
}, 15000);

//////////////////////////////
// 📱 INIT FINAL HOOK
//////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  updateProfileUI();
  renderRankingEnhanced();
});

//////////////////////////////
// 🎨 CSS INJECT (ANIMACIONES PRO)
//////////////////////////////

const style = document.createElement("style");

style.innerHTML = `
@keyframes fadeInOut {
  0% {opacity:0; transform:translateY(20px) translateX(-50%);}
  20% {opacity:1;}
  80% {opacity:1;}
  100% {opacity:0; transform:translateY(-10px) translateX(-50%);}
}

.rank-card {
  display:flex;
  justify-content:space-between;
  padding:10px;
  margin:5px 0;
  border-radius:12px;
  background:rgba(255,255,255,0.08);
  transition:0.3s;
}

.rank-card:hover {
  transform:scale(1.03);
}

.leader {
  background:linear-gradient(90deg,#ffd70033,#ffffff11);
  border:1px solid gold;
}

.profile-card {
  padding:15px;
  border-radius:15px;
  background:rgba(255,255,255,0.08);
  margin-bottom:10px;
}
`;

document.head.appendChild(style);

//////////////////////////////
// 🧑‍🤝‍🧑 LIGAS PRIVADAS ONLINE (SIN FIREBASE)
//////////////////////////////

const API_URL = "https://api.jsonbin.io/v3/b/6a2c308df5f4af5e29e762af"; 
// 👉 luego te explico cómo crear esto gratis

let leagueId = localStorage.getItem("leagueId") || prompt("Código de liga:");
localStorage.setItem("leagueId", leagueId);

async function loadLeague() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    window.onlineLeague = data.record || {};

    if (!window.onlineLeague[leagueId]) {
      window.onlineLeague[leagueId] = {
        users: [],
        predictions: {},
        polls: {}
      };
    }

    saveOnline();
  } catch (e) {
    console.log("Offline mode");
  }
}

async function saveOnline() {
  await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(window.onlineLeague)
  });
}

function joinLeague() {
  const l = window.onlineLeague[leagueId];

  if (!l.users.includes(user)) {
    l.users.push(user);
    saveOnline();
  }
}

function predictOnline(matchId, pick) {
  const l = window.onlineLeague[leagueId];

  if (!l.predictions[matchId]) {
    l.predictions[matchId] = {};
  }

  l.predictions[matchId][user] = pick;

  saveOnline();
}

function votePollOnline(matchId, option) {
  const l = window.onlineLeague[leagueId];

  if (!l.polls[matchId]) {
    l.polls[matchId] = { home: 0, draw: 0, away: 0 };
  }

  l.polls[matchId][option]++;

  saveOnline();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadLeague();
  joinLeague();
});

//////////////////////////////
// ⚽ RESULTADOS EN VIVO
//////////////////////////////

const LIVE_API = "https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=2026-06-11&s=Soccer";

async function getLiveMatches() {
  try {
    const res = await fetch(LIVE_API);
    const data = await res.json();

    return data.events.map(ev => ({
      id: ev.idEvent,
      homeTeam: ev.strHomeTeam,
      awayTeam: ev.strAwayTeam,
      score: `${ev.intHomeScore ?? 0}-${ev.intAwayScore ?? 0}`,
      time: ev.strTime,
      stadium: ev.strVenue
    }));
  } catch (e) {
    console.log("API error fallback");
    return matches; // fallback local
  }
}

async function renderLive() {
  const live = await getLiveMatches();

  renderMatches(
    live.map(m => ({
      id: m.id,
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      city: "Live",
      stadium: m.stadium,
      datetime: new Date().toISOString(),
      group: "LIVE"
    }))
  );
}

//////////////////////////////
// 🎨 UI FINAL - WORLD CUP PRO MODE
//////////////////////////////

function enhanceUI() {
  injectParticles();
  injectMatchGlow();
  injectHeaderFX();
  addScrollFX();
  addHapticUI();
}

//////////////////////////////
// ✨ PARTICLES BACKGROUND (WORLD CUP STYLE)
//////////////////////////////

function injectParticles() {
  const canvas = document.createElement("canvas");
  canvas.id = "wc-particles";

  Object.assign(canvas.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none"
  });

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5,
      d: Math.random() * 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.15)";

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.y += 0.3 + p.d;

      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

//////////////////////////////
// ⚽ MATCH CARD GLOW FX
//////////////////////////////

function injectMatchGlow() {
  const style = document.createElement("style");

  style.innerHTML = `
    .match-card {
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .match-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent);
      transition: 0.5s;
    }

    .match-card:hover::before {
      left: 100%;
    }

    .match-card:hover {
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 15px 35px rgba(0,0,0,0.35);
    }

    .match-card img {
      width: 28px;
      height: 18px;
      border-radius: 4px;
      margin: 0 6px;
    }
  `;

  document.head.appendChild(style);
}

//////////////////////////////
// 🏆 HEADER FX (GLASS + GLOW)
//////////////////////////////

function injectHeaderFX() {
  const style = document.createElement("style");

  style.innerHTML = `
    .hero {
      background: rgba(255,255,255,0.06) !important;
      backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 10px 40px rgba(0,0,0,0.25);
    }

    .hero h1 {
      background: linear-gradient(90deg, #ffd54a, #fff, #4fc3f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shine 4s infinite linear;
    }

    @keyframes shine {
      0% { filter: hue-rotate(0deg); }
      50% { filter: hue-rotate(30deg); }
      100% { filter: hue-rotate(0deg); }
    }
  `;

  document.head.appendChild(style);
}

//////////////////////////////
// 📱 SCROLL ANIMATIONS
//////////////////////////////

function addScrollFX() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = "translateY(0)";
      }
    });
  });

  document.querySelectorAll(".match-card").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "0.5s ease";
    observer.observe(el);
  });
}

//////////////////////////////
// 📲 HAPTIC + MOBILE FEEL
//////////////////////////////

function addHapticUI() {
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (navigator.vibrate) navigator.vibrate(30);
    });
  });
}

//////////////////////////////
// 🚀 INIT UI
//////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  enhanceUI();
});