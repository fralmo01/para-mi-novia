// ========================================
// Array de canciones
// ========================================
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

// ========================================
// Variables del reproductor
// ========================================
let currentSongIndex = 0;
let isPlaying = false;
let isShuffled = false;
let isRepeating = false;
let shuffledIndexes = [];

// ========================================
// Elementos del DOM
// ========================================
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art');
const songList = document.getElementById('song-list');
const volumeSlider = document.getElementById('volume-slider');

// Elementos del poema
const poemTextarea = document.getElementById('poem-textarea');
const poemPreview = document.getElementById('poem-preview-content');
const savePoemBtn = document.getElementById('save-poem-btn');
const clearPoemBtn = document.getElementById('clear-poem-btn');
const savedPoemsList = document.getElementById('saved-poems-list');

// Fecha del aniversario
const anniversaryDate = new Date('2024-05-15T00:00:00');

// ========================================
// Inicialización
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada, inicializando...');

    // Inicializar reproductor
    initializePlayer();

    // Inicializar calendario y contador
    createCalendar();
    updateCounter();
    setInterval(updateCounter, 1000);

    // Inicializar navegación activa
    initializeNavigation();

    // Inicializar editor de poema
    initializePoemEditor();

    // Cargar poemas guardados
    loadSavedPoems();
});

// ========================================
// Funciones del Reproductor
// ========================================
function initializePlayer() {
    if (!audio) {
        console.error('Elemento de audio no encontrado');
        return;
    }

    // Cargar primera canción
    loadSong(currentSongIndex);
    createSongList();

    // Event listeners del reproductor
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleSongEnd);
    audio.addEventListener('loadedmetadata', updateDuration);

    progressBar.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);

    // Configurar volumen inicial
    audio.volume = volumeSlider.value / 100;

    // AUTOPLAY: Intentar reproducir automáticamente
    setTimeout(() => {
        autoplayMusic();
    }, 1000);
}

// Función para autoplay con manejo de errores
function autoplayMusic() {
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Reproducción automática iniciada');
                isPlaying = true;
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            })
            .catch(error => {
                console.log('Autoplay bloqueado por el navegador:', error);
                // Si falla el autoplay, esperar interacción del usuario
                document.addEventListener('click', function startOnClick() {
                    playSong();
                    document.removeEventListener('click', startOnClick);
                }, { once: true });
            });
    }
}

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumArt.src = song.art;

    updateSongListActive();
}

function createSongList() {
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('song-item');
        if (index === currentSongIndex) {
            li.classList.add('active');
        }

        li.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div style="flex-grow: 1;">
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

function updateSongListActive() {
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
    audio.play().catch(e => console.error('Error al reproducir:', e));
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    if (isShuffled) {
        currentSongIndex = shuffledIndexes[Math.floor(Math.random() * shuffledIndexes.length)];
    } else {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
    }
    loadSong(currentSongIndex);
    playSong();
}

function handleSongEnd() {
    if (isRepeating) {
        playSong();
    } else {
        nextSong();
    }
}

function toggleShuffle() {
    isShuffled = !isShuffled;

    if (isShuffled) {
        shuffleBtn.style.background = 'var(--gradient-romantic)';
        shuffledIndexes = [...Array(songs.length).keys()];
    } else {
        shuffleBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    }
}

function toggleRepeat() {
    isRepeating = !isRepeating;

    if (isRepeating) {
        repeatBtn.style.background = 'var(--gradient-romantic)';
    } else {
        repeatBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    }
}

function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

function updateDuration() {
    durationEl.textContent = formatTime(audio.duration);
}

function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume() {
    audio.volume = volumeSlider.value / 100;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// ========================================
// Funciones del Calendario
// ========================================
function createCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const month = anniversaryDate.getMonth();
    const year = anniversaryDate.getFullYear();
    const specialDay = anniversaryDate.getDate();

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const header = document.createElement('div');
    header.classList.add('calendar-header');
    header.textContent = `${monthNames[month]} ${year}`;
    calendarEl.appendChild(header);

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

    const daysGrid = document.createElement('div');
    daysGrid.classList.add('calendar-days');

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        daysGrid.appendChild(emptyDay);
    }

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

// ========================================
// Funciones del Contador
// ========================================
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

// ========================================
// Navegación Activa
// ========================================
function initializeNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// Editor de Poema
// ========================================
function initializePoemEditor() {
    if (!poemTextarea || !poemPreview) return;

    // Actualizar vista previa en tiempo real
    poemTextarea.addEventListener('input', updatePoemPreview);

    // Guardar poema
    savePoemBtn.addEventListener('click', savePoem);

    // Limpiar poema
    clearPoemBtn.addEventListener('click', clearPoem);
}

function updatePoemPreview() {
    const text = poemTextarea.value;

    if (text.trim() === '') {
        poemPreview.innerHTML = '<p class="empty-message">Tu poema aparecerá aquí...</p>';
    } else {
        poemPreview.textContent = text;
    }
}

function savePoem() {
    const text = poemTextarea.value.trim();

    if (text === '') {
        alert('Por favor escribe algo antes de guardar');
        return;
    }

    const poem = {
        id: Date.now(),
        text: text,
        date: new Date().toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    // Obtener poemas guardados del localStorage
    let savedPoems = JSON.parse(localStorage.getItem('poems')) || [];
    savedPoems.unshift(poem);
    localStorage.setItem('poems', JSON.stringify(savedPoems));

    // Mostrar notificación
    showNotification('Poema guardado con éxito');

    // Limpiar el textarea
    poemTextarea.value = '';
    updatePoemPreview();

    // Recargar lista de poemas
    loadSavedPoems();
}

function clearPoem() {
    if (poemTextarea.value.trim() !== '') {
        if (confirm('¿Estás seguro de que quieres borrar el poema actual?')) {
            poemTextarea.value = '';
            updatePoemPreview();
        }
    }
}

function loadSavedPoems() {
    if (!savedPoemsList) return;

    const poems = JSON.parse(localStorage.getItem('poems')) || [];

    if (poems.length === 0) {
        savedPoemsList.innerHTML = '<p class="empty-message">Aún no hay poemas guardados</p>';
        return;
    }

    savedPoemsList.innerHTML = '';

    poems.forEach(poem => {
        const poemItem = document.createElement('div');
        poemItem.classList.add('saved-poem-item');
        poemItem.innerHTML = `
            <div class="poem-header">
                <span class="poem-date">${poem.date}</span>
                <button class="delete-poem-btn" onclick="deletePoem(${poem.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
            <div class="poem-text">${poem.text}</div>
        `;
        savedPoemsList.appendChild(poemItem);
    });
}

function deletePoem(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este poema?')) {
        return;
    }

    let poems = JSON.parse(localStorage.getItem('poems')) || [];
    poems = poems.filter(poem => poem.id !== id);
    localStorage.setItem('poems', JSON.stringify(poems));

    showNotification('Poema eliminado');
    loadSavedPoems();
}

function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-romantic);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(255, 107, 157, 0.5);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        font-family: var(--font-body);
        font-size: 1.1rem;
    `;
    notification.textContent = message;

    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.5s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Hacer la función deletePoem global para que funcione desde el HTML
window.deletePoem = deletePoem;
