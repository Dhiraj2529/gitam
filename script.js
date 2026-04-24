const STORAGE_KEYS = {
    loggedInUser: "loggedInUser",
    likedSongs: "likedSongs",
    uploadedSongs: "uploadedSongs"
};

const baseSongs = [
    {
        name: "Alone",
        artist: "Alan Walker",
        src: "alanwalkerSongs/Song 1 (alone).mp3",
        cover: "alanwalker/image1.png"
    },
    {
        name: "Faded",
        artist: "Alan Walker",
        src: "alanwalkerSongs/Song 2 (Faded).mp3",
        cover: "alanwalker/image2.png"
    },
    {
        name: "On My Way",
        artist: "Alan Walker",
        src: "alanwalkerSongs/Song 3 (On My Way).mp3",
        cover: "alanwalker/image3.png"
    },
    {
        name: "Ignite",
        artist: "Alan Walker",
        src: "alanwalkerSongs/Song 4 (Ignite).mp3",
        cover: "alanwalker/image4.png"
    },
    {
        name: "Running Out Of Roses",
        artist: "Alan Walker",
        src: "alanwalkerSongs/Song 5 (Running out of roses).mp3",
        cover: "alanwalker/image5.png"
    },
    {
        name: "Lily",
        artist: "Alan Walker",
        src: "alanwalkerSongs/Song 6 (Lily).mp3",
        cover: "alanwalker/image6.png"
    }
];

let songs = [];
let currentIndex = -1;

function syncSidebarLayout() {
    const sidebar = document.getElementById("sidebar");
    const shell = document.querySelector(".page-shell");

    if (!sidebar) {
        return;
    }

    if (window.innerWidth <= 760) {
        sidebar.classList.remove("is-collapsed");
        if (shell) {
            shell.classList.remove("is-expanded");
        }
        return;
    }

    if (!sidebar.classList.contains("is-collapsed")) {
        if (shell) {
            shell.classList.remove("is-expanded");
        }
    }
}

function getStoredList(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        return [];
    }
}

function setMessage(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
    }
}

function signup() {
    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim().toLowerCase();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;

    setMessage("msg1", "");
    setMessage("msg2", "");

    if (!username || !email || !password || !confirmPassword) {
        setMessage("msg1", "All fields are required.");
        return;
    }

    if (password !== confirmPassword) {
        setMessage("msg1", "Passwords do not match.");
        return;
    }

    if (localStorage.getItem(email)) {
        setMessage("msg1", "This user already exists.");
        return;
    }

    localStorage.setItem(email, JSON.stringify({ username, email, password }));
    setMessage("msg2", "Registration successful. Redirecting to login...");

    window.setTimeout(() => {
        window.location.href = "login.html";
    }, 1200);
}

function login() {
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;

    setMessage("msg1", "");
    setMessage("msg2", "");

    if (!email || !password) {
        setMessage("msg1", "Enter email and password.");
        return;
    }

    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
        setMessage("msg1", "User not found.");
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.password !== password) {
        setMessage("msg1", "Incorrect password.");
        return;
    }

    localStorage.setItem(STORAGE_KEYS.loggedInUser, email);
    setMessage("msg2", "Login successful. Redirecting...");

    window.setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}

function loadUser() {
    const userLabel = document.getElementById("user");
    if (!userLabel) {
        return;
    }

    const loggedInEmail = localStorage.getItem(STORAGE_KEYS.loggedInUser);
    if (!loggedInEmail) {
        userLabel.textContent = "Hello, Listener";
        return;
    }

    const userData = localStorage.getItem(loggedInEmail);
    if (!userData) {
        userLabel.textContent = "Hello, Listener";
        return;
    }

    const user = JSON.parse(userData);
    userLabel.textContent = `Hello, ${user.username}`;
}

function slidebar() {
    const sidebar = document.getElementById("sidebar");
    const shell = document.querySelector(".page-shell");

    if (!sidebar) {
        return;
    }

    if (window.innerWidth <= 760) {
        sidebar.classList.toggle("is-open");
        return;
    }

    sidebar.classList.toggle("is-collapsed");
    if (shell) {
        shell.classList.toggle("is-expanded", sidebar.classList.contains("is-collapsed"));
    }
}

function toggleTheme() {
    const body = document.body;
    const button = document.getElementById("themebtn");
    const isLight = body.classList.toggle("theme-light");
    body.classList.toggle("theme-dark", !isLight);

    localStorage.setItem("theme", isLight ? "light" : "dark");

    if (button) {
        button.textContent = isLight ? "Dark mode" : "Light mode";
    }
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;
    const button = document.getElementById("themebtn");

    if (savedTheme === "light") {
        body.classList.add("theme-light");
        body.classList.remove("theme-dark");
    } else {
        body.classList.add("theme-dark");
        body.classList.remove("theme-light");
    }

    if (button) {
        button.textContent = body.classList.contains("theme-light") ? "Dark mode" : "Light mode";
    }
}

function loadAllSongs() {
    const uploadedSongs = getStoredList(STORAGE_KEYS.uploadedSongs);
    songs = [...baseSongs, ...uploadedSongs];
}

function getLikedSongs() {
    return getStoredList(STORAGE_KEYS.likedSongs);
}

function saveLikedSongs(likedSongs) {
    localStorage.setItem(STORAGE_KEYS.likedSongs, JSON.stringify(likedSongs));
}

function isSongLiked(index) {
    return getLikedSongs().includes(index);
}

function toggleLike(index) {
    const likedSongs = getLikedSongs();
    const existingIndex = likedSongs.indexOf(index);

    if (existingIndex >= 0) {
        likedSongs.splice(existingIndex, 1);
    } else {
        likedSongs.push(index);
    }

    saveLikedSongs(likedSongs);
    updateCounters();

    if (document.body.dataset.page === "home") {
        renderHomeSongs();
    }

    if (document.body.dataset.page === "liked") {
        renderLikedSongs();
    }
}

function updateCounters() {
    const songCount = document.getElementById("song-count");
    const likedCountHome = document.getElementById("liked-count-home");
    const likedCountPage = document.getElementById("liked-page-count");
    const totalSongs = songs.length;
    const likedSongs = getLikedSongs();

    if (songCount) {
        songCount.textContent = totalSongs;
    }

    if (likedCountHome) {
        likedCountHome.textContent = likedSongs.length;
    }

    if (likedCountPage) {
        likedCountPage.textContent = likedSongs.length;
    }
}

function renderHomeSongs() {
    const home = document.getElementById("home");
    if (!home) {
        return;
    }

    home.innerHTML = "";

    songs.forEach((song, index) => {
        const card = document.createElement("article");
        card.className = "song-card";
        card.innerHTML = `
            <img src="${song.cover || "alanwalker/alanwalker.png"}" alt="${song.name} cover">
            <div class="song-body">
                <h4>${song.name}</h4>
                <p>${song.artist}</p>
                <div class="card-actions">
                    <button type="button" class="card-btn" data-play-index="${index}">Play</button>
                    <button type="button" class="card-btn like-btn ${isSongLiked(index) ? "is-liked" : ""}" data-like-index="${index}">
                        ${isSongLiked(index) ? "❤" : "♡"}
                    </button>
                    <a class="text-btn" href="${song.src}" download>Download</a>
                </div>
            </div>
        `;

        home.appendChild(card);
    });

    bindSongCardActions(home);
}

function bindSongCardActions(container) {
    container.querySelectorAll("[data-play-index]").forEach((button) => {
        button.addEventListener("click", () => {
            play(Number(button.dataset.playIndex));
        });
    });

    container.querySelectorAll("[data-like-index]").forEach((button) => {
        button.addEventListener("click", () => {
            toggleLike(Number(button.dataset.likeIndex));
        });
    });
}

function renderLikedSongs() {
    const list = document.getElementById("liked-list");
    const emptyState = document.getElementById("empty-state");
    if (!list) {
        return;
    }

    const likedSongs = getLikedSongs();
    list.innerHTML = "";

    if (likedSongs.length === 0) {
        if (emptyState) {
            emptyState.classList.remove("hidden");
        }
        updateCounters();
        return;
    }

    if (emptyState) {
        emptyState.classList.add("hidden");
    }

    likedSongs.forEach((songIndex) => {
        const song = songs[songIndex];
        if (!song) {
            return;
        }

        const row = document.createElement("article");
        row.className = "liked-row";
        row.innerHTML = `
            <img src="${song.cover || "alanwalker/alanwalker.png"}" alt="${song.name} cover">
            <div>
                <h4>${song.name}</h4>
                <p>${song.artist}</p>
            </div>
            <div class="row-actions">
                <button type="button" class="card-btn" data-play-index="${songIndex}">Play</button>
                <button type="button" class="card-btn like-btn is-liked" data-like-index="${songIndex}">❤</button>
            </div>
        `;
        list.appendChild(row);
    });

    bindSongCardActions(list);
    updateCounters();
}

function play(index) {
    const audio = document.getElementById("audio");
    const title = document.getElementById("title");
    if (!audio || !songs[index]) {
        return;
    }

    currentIndex = index;
    audio.src = songs[index].src;
    audio.play();

    if (title) {
        title.textContent = `${songs[index].name} - ${songs[index].artist}`;
    }
}

function togglePlay() {
    const audio = document.getElementById("audio");
    if (!audio || !audio.src) {
        return;
    }

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function getQueue() {
    const likedSongs = getLikedSongs();
    const onLikedPage = document.body.dataset.page === "liked";
    return onLikedPage && likedSongs.length ? likedSongs : songs.map((_, index) => index);
}

function prev() {
    const queue = getQueue();
    const currentPosition = queue.indexOf(currentIndex);

    if (currentPosition > 0) {
        play(queue[currentPosition - 1]);
    }
}

function next() {
    const queue = getQueue();
    const currentPosition = queue.indexOf(currentIndex);

    if (currentPosition >= 0 && currentPosition < queue.length - 1) {
        play(queue[currentPosition + 1]);
    }
}

function bindPlayer() {
    const audio = document.getElementById("audio");
    const progress = document.getElementById("progress");
    const volume = document.getElementById("volume");

    if (!audio) {
        return;
    }

    if (progress) {
        audio.addEventListener("timeupdate", () => {
            if (!audio.duration) {
                progress.value = 0;
                return;
            }

            progress.value = String((audio.currentTime / audio.duration) * 100);
        });

        progress.addEventListener("input", () => {
            if (!audio.duration) {
                return;
            }

            audio.currentTime = (Number(progress.value) / 100) * audio.duration;
        });
    }

    if (volume) {
        audio.volume = Number(volume.value);
        volume.addEventListener("input", () => {
            audio.volume = Number(volume.value);
        });
    }
}

function uploadSong() {
    const name = document.getElementById("songName").value.trim();
    const artist = document.getElementById("artistName").value.trim();
    const fileInput = document.getElementById("audioFile");
    const file = fileInput.files[0];

    setMessage("msg", "");

    if (!name || !artist || !file) {
        setMessage("msg", "Fill all fields before uploading.");
        return;
    }

    const objectUrl = URL.createObjectURL(file);
    const uploadedSongs = getStoredList(STORAGE_KEYS.uploadedSongs);

    uploadedSongs.push({
        name,
        artist,
        src: objectUrl,
        cover: "alanwalker/alanwalker.png"
    });

    localStorage.setItem(STORAGE_KEYS.uploadedSongs, JSON.stringify(uploadedSongs));

    document.getElementById("songName").value = "";
    document.getElementById("artistName").value = "";
    fileInput.value = "";
    setMessage("msg", "Song uploaded for this browser session.");
}

function initPage() {
    loadAllSongs();
    loadUser();
    applySavedTheme();
    syncSidebarLayout();
    bindPlayer();
    updateCounters();

    if (document.body.dataset.page === "home") {
        renderHomeSongs();
    }

    if (document.body.dataset.page === "liked") {
        renderLikedSongs();
    }
}

document.addEventListener("DOMContentLoaded", initPage);
window.addEventListener("resize", syncSidebarLayout);
