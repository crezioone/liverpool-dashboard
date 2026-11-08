// --- 1. COUNTDOWN TIMER (До реального матча: 4 ноября 2026 в 18:45) ---
// Создаем точную дату матча в формате JavaScript (Год, Месяц с 0 (ноябрь = 10), День, Часы, Минуты)
const matchDate = new Date("2026-11-22T18:30:00").getTime(); 

function updateCountdown() {
    const now = new Date().getTime();
    const distance = matchDate - now;

    const countdownElement = document.getElementById("countdown");

    if (distance < 0) {
        countdownElement.innerHTML = "Das Spiel hat begonnen oder ist vorbei!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Выводим таймер и сразу пишем дату матча для наглядности
    countdownElement.innerHTML = `Anpfiff (22.11.2026, 18:30): ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// --- 2. AKTUELLER KADER & SUCHE ---
const players = [
    { name: "Virgil van Dijk", position: "Abwehrspieler", number: 4, photo: "virgil.webp", goals: 2, assists: 1, minutesPlayed: 1080 },
    { name: "Alexis Mac Allister", position: "Mittelfeldspieler", number: 10, photo: "macca.webp", goals: 3, assists: 4, minutesPlayed: 950 },
    { name: "Alisson Becker", position: "Torwart", number: 1, photo: "ali.webp", goals: 0, assists: 0, minutesPlayed: 810 },
    { name: "Dominik Szoboszlai", position: "Mittelfeldspieler", number: 8, photo: "szobo.webp", goals: 2, assists: 5, minutesPlayed: 900 },
    { name: "Florian Wirtz", position: "Mittelfeldspieler", number: 7, photo: "wirtz.webp", goals: 4, assists: 6, minutesPlayed: 920 },
    { name: "Alexander Isak", position: "Angriff", number: 9, photo: "isak.webp", goals: 6, assists: 2, minutesPlayed: 900 },
    { name: "Bradley Barcola", position: "Angriff", number: 29, photo: "barcola.webp", goals: 3, assists: 2, minutesPlayed: 700 },
    { name: "Ronald Araujo", position: "Abwehrspieler", number: 33, photo: "ara1.webp", goals: 1, assists: 0, minutesPlayed: 850 },
    { name: "Giorgi Mamardashvili", position: "Torwart", number: 25, photo: "mamar.webp", goals: 0, assists: 0, minutesPlayed: 270 },
    { name: "Victor Muñoz", position: "Angriff", number: 23, photo: "munoz.webp", goals: 2, assists: 1, minutesPlayed: 600 },
    { name: "Jérémy Jacquet", position: "Abwehrspieler", number: 5, photo: "jeremy.webp", goals: 0, assists: 0, minutesPlayed: 775 },
    { name: "Cody Gakpo", position: "Angriff", number: 18, photo: "cody.webp", goals: 1, assists: 3, minutesPlayed: 750 },
];

const playersContainer = document.getElementById("playersContainer");
const searchInput = document.getElementById("searchInput");

function displayPlayers(playersArray) {
    playersContainer.innerHTML = ""; 

    playersArray.forEach(player => {
        const card = document.createElement("div");
        card.classList.add("player-card");
        
        // Создаем четкую структуру через JS, чтобы ничего не ломалось
        card.innerHTML = `
            <div class="player-info">
                <h3>${player.name}</h3>
                <p>Position: ${player.position}</p>
                <p>Rückennummer: #${player.number}</p>
            </div>
            <img src="${player.photo}" alt="${player.name}" class="player-photo">
        `;
        
        playersContainer.appendChild(card);
    });
}

// Изначально карточки не отображаются
playersContainer.innerHTML = "";

searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase().trim();
    
    if (searchText === "") {
        playersContainer.innerHTML = "";
        return;
    }

    const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(searchText) ||
        player.position.toLowerCase().includes(searchText)
    );

    if (filteredPlayers.length === 0) {
        playersContainer.innerHTML = "<p style='color: white; grid-column: 1 / -1; text-align: center;'>Keine Spieler gefunden...</p>";
        return;
    }

    displayPlayers(filteredPlayers);
});

// --- 3. РАСПИСАНИЕ МАТЧЕЙ НА НОЯБРЬ ---
const novemberMatches = [
    { date: "Mi., 4. Nov", home: "Fenerbahçe", away: "Liverpool FC", time: "3:2", league: "Champions League", logo: "cl-logo.png" },
    { date: "So., 8. Nov", home: "Crystal Palace", away: "Liverpool FC", time: "1:3", league: "Premier League", logo: "pl-logo.png" },
    { date: "So., 22. Nov", home: "Liverpool FC", away: "Man United", time: "18:30", league: "Premier League", logo: "pl-logo.png" },
    { date: "Mi., 25. Nov", home: "Club Brugge", away: "Liverpool FC", time: "21:00", league: "Champions League", logo: "cl-logo.png" },
    { date: "So., 29. Nov", home: "Everton", away: "Liverpool FC", time: "14:00", league: "Premier League", logo: "pl-logo.png" }
];

const scheduleContainer = document.getElementById("scheduleContainer");

function displaySchedule() {
    scheduleContainer.innerHTML = "";

    novemberMatches.forEach(match => {
        const item = document.createElement("div");
        item.classList.add("schedule-item");

        const homeTeam = match.home === "Liverpool FC" ? `<strong>${match.home}</strong>` : match.home;
        const awayTeam = match.away === "Liverpool FC" ? `<strong>${match.away}</strong>` : match.away;

        item.innerHTML = `
            <div class="match-date">${match.date}</div>
            <div class="match-teams-info">
                ${homeTeam} &nbsp;<small style="color: #bbb;">${match.time}</small>&nbsp; ${awayTeam}
            </div>
            <div class="match-league">
                <span>${match.league}</span>
                <img src="${match.logo}" alt="${match.league}" class="league-logo">
            </div>
        `;

        scheduleContainer.appendChild(item);
    });
}

displaySchedule();

// --- 4. МОБИЛЬНОЕ / БОКОВОЕ МЕНЮ ---
const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeBtn");
const menuLinks = document.querySelectorAll(".side-menu a");

// Открыть меню по клику на полоски
menuToggle.addEventListener("click", () => {
    sideMenu.classList.add("active");
});

// Закрыть меню по клику на крестик
closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("active");
});

// Закрывать меню при клике на любой пункт навигации
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        sideMenu.classList.remove("active");
    });
});

function renderTopWidgets() {
    function fillWidget(containerId, sortedArray, getValueFn, badgeClass = '') {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';

        const top3 = sortedArray.slice(0, 3);

        top3.forEach(player => {
            const value = getValueFn(player);
            const row = document.createElement('div');
            row.classList.add('widget-row');
            row.innerHTML = `
                <div class="widget-player-info">
                    <img src="${player.photo}" alt="${player.name}" class="widget-avatar">
                    <span class="widget-name">${player.name}</span>
                </div>
                <span class="widget-badge ${badgeClass}">${value}</span>
            `;
            container.appendChild(row);
        });
    }

    // 1. Топ бомбардиров (с красным бейджем)
    const byGoals = [...players].sort((a, b) => b.goals - a.goals);
    fillWidget('top-goals-list', byGoals, p => p.goals, 'badge-red');

    // 2. Топ ассистентов (с красным бейджем)
    const byAssists = [...players].sort((a, b) => b.assists - a.assists);
    fillWidget('top-assists-list', byAssists, p => p.assists, 'badge-red');

    // 3. Топ по системе гол + пас (с красным бейджем)
    const byPoints = [...players].sort((a, b) => (b.goals + b.assists) - (a.goals + a.assists));
    fillWidget('top-points-list', byPoints, p => p.goals + p.assists, 'badge-red');

    // 4. Топ по минутам (с красным бейджем)
    const byMinutes = [...players].sort((a, b) => b.minutesPlayed - a.minutesPlayed);
    fillWidget('top-minutes-list', byMinutes, p => p.minutesPlayed, 'badge-red');
}

renderTopWidgets();

