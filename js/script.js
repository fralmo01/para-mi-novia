// Array de canciones con las portadas de álbum
const songs = [
    {
        title: "Only You",
        artist: "Ric Hassani",
        src: "music/Ric Hassani - Only You.flac",
        art: "img/Ric Hassani - Only You.png"
    },
    {
        title: "golden hour",
        artist: "JVKE",
        src: "music/JVKE - golden hour.flac",
        art: "img/JVKE - golden hour.png"
    },
    {
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        src: "music/Stephen Sanchez - Until I Found You.flac",
        art: "img/Stephen Sanchez - Until I Found You.png"
    },
    {
        title: "Angels",
        artist: "The xx",
        src: "music/The xx - Angels.flac",
        art: "img/The xx - Angels.png"
    }
];

// Variables del reproductor
let currentSongIndex = 0;
let isPlaying = false;

// Elementos del DOM del reproductor
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art');
const songList = document.getElementById('song-list');

// Fecha del aniversario (ajusta esta fecha según tu aniversario)
const anniversaryDate = new Date('2024-05-15T00:00:00');

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar reproductor
    if (audio) {
        loadSong(currentSongIndex);
        createSongList();

        // Event listeners del reproductor
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong);
        audio.addEventListener('loadedmetadata', updateDuration);
        progressBar.addEventListener('click', setProgress);
    }

    // Inicializar calendario y contador
    createCalendar();
    updateCounter();
    setInterval(updateCounter, 1000);
});

// Función para cargar una canción
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumArt.src = song.art;

    // Actualizar lista de canciones
    updateSongListActive();
}

// Función para crear la lista de canciones
function createSongList() {
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('song-item');
        if (index === currentSongIndex) {
            li.classList.add('active');
        }
        li.innerHTML = `
            <div class="song-info">
                <div class="song-number">${index + 1}</div>
                <div>
                    <div class="song-name">${song.title}</div>
                    <div class="artist-name">${song.artist}</div>
                </div>
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

// Función para actualizar la canción activa en la lista
function updateSongListActive() {
    const items = document.querySelectorAll('.song-item');
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentSongIndex) {
            item.classList.add('active');
        }
    });
}

// Función para reproducir/pausar
function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Función para reproducir
function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

// Función para pausar
function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

// Función para canción anterior
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

// Función para siguiente canción
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
}

// Función para actualizar la barra de progreso
function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Actualizar tiempo actual
    currentTimeEl.textContent = formatTime(currentTime);
}

// Función para actualizar la duración
function updateDuration() {
    durationEl.textContent = formatTime(audio.duration);
}

// Función para establecer el progreso
function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Función para formatear el tiempo
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Función para crear el calendario
function createCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const month = anniversaryDate.getMonth();
    const year = anniversaryDate.getFullYear();
    const specialDay = anniversaryDate.getDate();

    // Nombres de los meses
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Crear encabezado del calendario
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

    // Obtener el primer día del mes y el número total de días
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Agregar espacios vacíos antes del primer día
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        daysGrid.appendChild(emptyDay);
    }

    // Agregar los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('calendar-day');

        if (day === specialDay) {
            dayEl.classList.add('special-day');
            dayEl.innerHTML = `
                <span class="day-number">${day}</span>
                <span class="heart">e</span>
            `;
        } else {
            dayEl.innerHTML = `<span class="day-number">${day}</span>`;
        }

        daysGrid.appendChild(dayEl);
    }

    calendarEl.appendChild(daysGrid);
}

// Función para actualizar el contador
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
        <div class="counter-title">Tiempo juntos</div>
        <div class="counter-grid">
            <div class="counter-item">
                <div class="counter-value">${days}</div>
                <div class="counter-label">Días</div>
            </div>
            <div class="counter-item">
                <div class="counter-value">${hours}</div>
                <div class="counter-label">Horas</div>
            </div>
            <div class="counter-item">
                <div class="counter-value">${minutes}</div>
                <div class="counter-label">Minutos</div>
            </div>
            <div class="counter-item">
                <div class="counter-value">${seconds}</div>
                <div class="counter-label">Segundos</div>
            </div>
        </div>
    `;
}
