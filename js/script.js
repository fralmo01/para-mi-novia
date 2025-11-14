// ============================================
// CONFIGURACIÓN DE CANCIONES
// ============================================
const songs = [
    {
        title: "Only You",
        artist: "Ric Hassani",
        src: "music/Ric Hassani - Only You.flac",
        art: "img/portada/Ric Hassani - Only You.jpg"
    },
    {
        title: "golden hour",
        artist: "JVKE",
        src: "music/JVKE - golden hour.flac",
        art: "img/portada/JVKE - golden hour.jpg"
    },
    {
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        src: "music/Stephen Sanchez - Until I Found You.flac",
        art: "img/portada/Stephen Sanchez - Until I Found You.jpg"
    },
    {
        title: "Angels",
        artist: "The xx",
        src: "music/The xx - Angels.flac",
        art: "img/portada/The xx - Angels.jpg"
    }
];

// ============================================
// CONFIGURACIÓN DE FECHA ESPECIAL
// ============================================
const anniversaryDate = new Date('2024-05-15T00:00:00');

// ============================================
// VARIABLES GLOBALES
// ============================================
let currentSongIndex = 0;
let isPlaying = false;

// ============================================
// ELEMENTOS DEL DOM
// ============================================
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art');
const songList = document.getElementById('song-list');

// Modal elements
const openLetterBtn = document.getElementById('open-letter-btn');
const letterModal = document.getElementById('letter-modal');
const closeModalBtn = document.getElementById('close-modal');

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeMusicPlayer();
    initializeCalendar();
    initializeCounter();
    initializeModal();
    initializeScrollAnimations();
});

// ============================================
// REPRODUCTOR DE MÚSICA
// ============================================
function initializeMusicPlayer() {
    if (!audio) return;

    // Cargar primera canción
    loadSong(currentSongIndex);
    createPlaylist();

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', previousSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('loadedmetadata', updateDuration);
    progressBar.addEventListener('click', seekSong);
}

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumArt.src = song.art;
    updatePlaylistActive();
}

function createPlaylist() {
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('song-item');
        if (index === currentSongIndex) {
            li.classList.add('active');
        }

        li.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div>
                <div class="song-name">${song.title}</div>
                <div class="artist-name">${song.artist}</div>
            </div>
        `;

        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });

        songList.appendChild(li);
    });
}

function updatePlaylistActive() {
    const items = document.querySelectorAll('.song-item');
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentSongIndex) {
            item.classList.add('active');
        }
    });
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

function previousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
}

function updateProgress() {
    const { currentTime, duration } = audio;
    if (!duration) return;

    const progressPercent = (currentTime / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

function updateDuration() {
    durationEl.textContent = formatTime(audio.duration);
}

function seekSong(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// ============================================
// CALENDARIO
// ============================================
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const month = anniversaryDate.getMonth();
    const year = anniversaryDate.getFullYear();
    const specialDay = anniversaryDate.getDate();

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Crear encabezado
    const header = document.createElement('div');
    header.classList.add('calendar-header');
    header.textContent = `${monthNames[month]} ${year}`;
    calendarEl.appendChild(header);

    // Crear días de la semana
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const weekDays = document.createElement('div');
    weekDays.classList.add('calendar-weekdays');

    daysOfWeek.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.classList.add('weekday');
        dayEl.textContent = day;
        weekDays.appendChild(dayEl);
    });
    calendarEl.appendChild(weekDays);

    // Crear grid de días
    const daysGrid = document.createElement('div');
    daysGrid.classList.add('calendar-days');

    // Obtener primer día y total de días del mes
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Agregar espacios vacíos
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        daysGrid.appendChild(emptyDay);
    }

    // Agregar días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('calendar-day');

        if (day === specialDay) {
            dayEl.classList.add('special-day');
            dayEl.innerHTML = `
                <span class="day-number">${day}</span>
                <span class="heart">♥</span>
            `;
        } else {
            dayEl.innerHTML = `<span class="day-number">${day}</span>`;
        }

        daysGrid.appendChild(dayEl);
    }

    calendarEl.appendChild(daysGrid);
}

// ============================================
// CONTADOR DE TIEMPO
// ============================================
function initializeCounter() {
    updateCounter();
    setInterval(updateCounter, 1000);
}

function updateCounter() {
    const counterEl = document.getElementById('counter');
    if (!counterEl) return;

    const now = new Date();
    const diff = now - anniversaryDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    counterEl.innerHTML = `
        <div class="counter-grid">
            <div class="counter-item">
                <span class="counter-value">${days}</span>
                <span class="counter-label">Días</span>
            </div>
            <div class="counter-item">
                <span class="counter-value">${hours}</span>
                <span class="counter-label">Horas</span>
            </div>
            <div class="counter-item">
                <span class="counter-value">${minutes}</span>
                <span class="counter-label">Minutos</span>
            </div>
            <div class="counter-item">
                <span class="counter-value">${seconds}</span>
                <span class="counter-label">Segundos</span>
            </div>
        </div>
    `;
}

// ============================================
// MODAL
// ============================================
function initializeModal() {
    if (!openLetterBtn || !letterModal || !closeModalBtn) return;

    // Abrir modal
    openLetterBtn.addEventListener('click', () => {
        letterModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modal con botón X
    closeModalBtn.addEventListener('click', closeModal);

    // Cerrar modal al hacer click fuera
    letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) {
            closeModal();
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && letterModal.classList.contains('active')) {
            closeModal();
        }
    });
}

function closeModal() {
    letterModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// ANIMACIONES DE SCROLL
// ============================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL PARA INDICADOR
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const loveSection = document.querySelector('.love-section');
        if (loveSection) {
            loveSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
