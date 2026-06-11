// =====================
// WORLD CUP 2026 PLANNER
// =====================

let currentDate = new Date();

let matches = JSON.parse(
  localStorage.getItem("wc2026_matches")
) || [

  {
    id: 1,

    home: "México",

    away: "TBD",

    date: "2026-06-11",

    time: "20:00",

    stadium: "Estadio Azteca",

    favorite: false,

    watched: false
  }

];

// =====================
// SAVE
// =====================

function save() {

  localStorage.setItem(
    "wc2026_matches",
    JSON.stringify(matches)
  );

}

// =====================
// STATS
// =====================

function updateStats() {

  document.getElementById(
    "totalMatches"
  ).textContent = matches.length;

  document.getElementById(
    "favoriteMatches"
  ).textContent =
    matches.filter(
      m => m.favorite
    ).length;

  document.getElementById(
    "watchedMatches"
  ).textContent =
    matches.filter(
      m => m.watched
    ).length;

}

// =====================
// FAVORITES
// =====================

function toggleFavorite(id) {

  const match =
    matches.find(
      m => m.id === id
    );

  if (!match) return;

  match.favorite =
    !match.favorite;

  save();

  renderAll();

}

// =====================
// WATCHED
// =====================

function toggleWatched(id) {

  const match =
    matches.find(
      m => m.id === id
    );

  if (!match) return;

  match.watched =
    !match.watched;

  save();

  renderAll();

}

// =====================
// MATCH LIST
// =====================

function renderMatches() {

  const container =
    document.getElementById(
      "matchList"
    );

  container.innerHTML = "";

  const search =
    document.getElementById(
      "searchInput"
    ).value
      .toLowerCase();

  matches

    .filter(m =>

      m.home.toLowerCase().includes(search)

      ||

      m.away.toLowerCase().includes(search)

    )

    .forEach(match => {

      container.innerHTML += `

        <div class="match-card">

          <div class="match-info">

            <div class="match-title">

              ${match.home}

              vs

              ${match.away}

            </div>

            <div class="match-time">

              📅 ${match.date}

              ·

              🕒 ${match.time}

            </div>

            <div>

              🏟️

              ${match.stadium}

            </div>

          </div>

          <div class="match-actions">

            <button
              class="favorite"
              onclick="toggleFavorite(${match.id})"
            >

              ${match.favorite ? "⭐" : "☆"}

            </button>

            <button
              class="watched"
              onclick="toggleWatched(${match.id})"
            >

              ${match.watched ? "👀" : "✔"}

            </button>

          </div>

        </div>

      `;

    });

}

// =====================
// FAVORITE LIST
// =====================

function renderFavorites() {

  const container =
    document.getElementById(
      "favoriteList"
    );

  container.innerHTML = "";

  matches

    .filter(
      m => m.favorite
    )

    .forEach(match => {

      container.innerHTML += `

        <div class="match-card">

          <div class="match-title">

            ⭐

            ${match.home}

            vs

            ${match.away}

          </div>

        </div>

      `;

    });

}

// =====================
// NOTIFICATIONS
// =====================

function requestNotifications() {

  if (
    "Notification" in window
  ) {

    Notification.requestPermission();

  }

}

// =====================
// MONTH NAV
// =====================

function prevMonth() {

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderCalendar();

}

function nextMonth() {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderCalendar();

}

// =====================
// CALENDAR
// =====================

function renderCalendar() {

  const title =
    document.getElementById(
      "monthTitle"
    );

  title.textContent =
    currentDate.toLocaleDateString(
      "es-ES",
      {
        month: "long",
        year: "numeric"
      }
    );

}

// =====================
// RENDER
// =====================

function renderAll() {

  updateStats();

  renderMatches();

  renderFavorites();

  renderCalendar();

}

// =====================
// INIT
// =====================

window.addEventListener(
  "load",

  () => {

    renderAll();

    document

      .getElementById(
        "searchInput"
      )

      .addEventListener(
        "input",

        renderMatches
      );

  }

);
