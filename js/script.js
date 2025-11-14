// ===== CONFIGURACIÓN =====
// IMPORTANTE: Personaliza estos valores según tu relación

// Fecha de inicio de la relación (Año, Mes-1, Día)
// Ejemplo: new Date(2024, 0, 15) = 15 de Enero, 2024
const RELATIONSHIP_START_DATE = new Date(2024, 0, 1);

// Lista de canciones en la carpeta music/
// Formato: { title: "Título", artist: "Artista", file: "nombre-archivo.mp3" }
const PLAYLIST = [
    { title: "Canción Romántica 1", artist: "Artista 1", file: "cancion1.mp3" },
    { title: "Canción Romántica 2", artist: "Artista 2", file: "cancion2.mp3" },
    { title: "Canción Romántica 3", artist: "Artista 3", file: "cancion3.mp3" }
];

// ===== VARIABLES GLOBALES =====
let currentSongIndex = 0;
let isPlaying = false;
let timeUpdateInterval;

// ===== ELEMENTOS DEL DOM =====
const elements = {
    // Partículas
    particles: document.getElementById('particles'),

    // Main content
    mainContent: document.getElementById('mainContent'),

    // Calendario
    startDate: document.getElementById('startDate'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),

    // Reproductor
    audioPlayer: document.getElementById('audioPlayer'),
    playBtn: document.getElementById('playBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    volumeSlider: document.getElementById('volumeSlider'),
    progress: document.getElementById('progress'),
    progressBar: document.querySelector('.progress-bar'),
    currentTime: document.getElementById('currentTime'),
    duration: document.getElementById('duration'),
    songTitle: document.getElementById('songTitle'),
    songArtist: document.getElementById('songArtist'),
    playlistItems: document.getElementById('playlistItems'),
    vinylRecord: document.querySelector('.vinyl-record'),

    // Botones
    feelingsBtn: document.getElementById('feelingsBtn'),
    closeStory: document.getElementById('closeStory'),
    backToMain: document.getElementById('backToMain'),
    saveStory: document.getElementById('saveStory'),

    // Sección de historia
    storySection: document.getElementById('storySection'),
    storyTexts: []
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initGSAPAnimations();
    initCalendar();
    initMusicPlayer();
    initStorySection();
    initEventListeners();
    loadStoryFromStorage();

    console.log('%c💕 Página romántica cargada con amor 💕', 'color: #ff0040; font-size: 20px; font-weight: bold;');
});

// ===== PARTÍCULAS CON GSAP =====
function initParticles() {
    const particlesContainer = elements.particles;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Estilos de partícula
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = `radial-gradient(circle,
            rgba(255, 0, 64, ${Math.random() * 0.5 + 0.3}),
            rgba(255, 107, 157, ${Math.random() * 0.3 + 0.1}))`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';

        particlesContainer.appendChild(particle);

        // Animación con GSAP
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            duration: Math.random() * 5 + 5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: Math.random() * 2
        });

        gsap.to(particle, {
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }
}

// ===== ANIMACIONES GSAP =====
function initGSAPAnimations() {
    // Animar título TE AMO
    gsap.from('.title-love', {
        duration: 1.5,
        scale: 0.5,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.2
    });

    // Animar cajas de poemas
    gsap.from('.poem-box', {
        duration: 1,
        x: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });

    // Animar fotos
    gsap.from('.photo-frame', {
        duration: 1.2,
        scale: 0.8,
        rotationY: 90,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        delay: 0.8
    });

    // Animar calendario y reproductor
    gsap.from('.calendar-container, .music-player', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1
    });

    // Animar botón de sentimientos
    gsap.from('.feelings-btn', {
        duration: 1,
        scale: 0,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)',
        delay: 1.5
    });
}

// ===== CALENDARIO =====
function initCalendar() {
    updateCalendar();
    setInterval(updateCalendar, 1000);

    // Formatear y mostrar fecha de inicio
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const day = RELATIONSHIP_START_DATE.getDate();
    const month = months[RELATIONSHIP_START_DATE.getMonth()];
    const year = RELATIONSHIP_START_DATE.getFullYear();
    elements.startDate.textContent = `${day} de ${month}, ${year}`;
}

function updateCalendar() {
    const now = new Date();
    const diff = now - RELATIONSHIP_START_DATE;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    animateNumber(elements.days, days);
    animateNumber(elements.hours, hours);
}

function animateNumber(element, value) {
    const current = parseInt(element.textContent) || 0;
    if (current !== value) {
        gsap.to(element, {
            duration: 0.3,
            scale: 1.2,
            color: '#ff6b9d',
            onComplete: () => {
                element.textContent = value;
                gsap.to(element, {
                    duration: 0.3,
                    scale: 1,
                    color: '#ff0040'
                });
            }
        });
    } else {
        element.textContent = value;
    }
}

// ===== REPRODUCTOR DE MÚSICA =====
function initMusicPlayer() {
    // Generar playlist
    renderPlaylist();

    // Configurar volumen inicial
    elements.audioPlayer.volume = elements.volumeSlider.value / 100;

    // Event listeners del audio
    elements.audioPlayer.addEventListener('timeupdate', updateProgress);
    elements.audioPlayer.addEventListener('ended', playNext);
    elements.audioPlayer.addEventListener('loadedmetadata', updateDuration);

    // Cargar primera canción
    if (PLAYLIST.length > 0) {
        loadSong(0);
    }
}

function renderPlaylist() {
    elements.playlistItems.innerHTML = '';

    PLAYLIST.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        if (index === currentSongIndex) {
            item.classList.add('active');
        }

        item.innerHTML = `
            <span>${index + 1}. ${song.title}</span>
        `;

        item.addEventListener('click', () => {
            loadSong(index);
            play();
        });

        elements.playlistItems.appendChild(item);
    });
}

function loadSong(index) {
    if (index < 0 || index >= PLAYLIST.length) return;

    currentSongIndex = index;
    const song = PLAYLIST[index];

    elements.audioPlayer.src = `music/${song.file}`;
    elements.songTitle.textContent = song.title;
    elements.songArtist.textContent = song.artist;

    // Actualizar playlist activa
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Manejar error de carga
    elements.audioPlayer.onerror = () => {
        console.warn(`No se pudo cargar: ${song.file}`);
        elements.songTitle.textContent = `${song.title} (No encontrada)`;
        elements.songArtist.textContent = 'Agrega el archivo en la carpeta music/';
    };
}

function play() {
    elements.audioPlayer.play()
        .then(() => {
            isPlaying = true;
            elements.playBtn.textContent = '⏸';
            elements.vinylRecord.classList.add('playing');

            // Animar album art
            gsap.to('.album-art', {
                duration: 0.3,
                scale: 1.05,
                boxShadow: '0 15px 60px rgba(255, 0, 64, 0.3)'
            });
        })
        .catch(err => {
            console.error('Error al reproducir:', err);
        });
}

function pause() {
    elements.audioPlayer.pause();
    isPlaying = false;
    elements.playBtn.textContent = '▶';
    elements.vinylRecord.classList.remove('playing');

    gsap.to('.album-art', {
        duration: 0.3,
        scale: 1,
        boxShadow: '0 10px 40px rgba(255, 0, 64, 0.15)'
    });
}

function togglePlay() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % PLAYLIST.length;
    loadSong(currentSongIndex);
    play();
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadSong(currentSongIndex);
    play();
}

function updateProgress() {
    const { currentTime, duration } = elements.audioPlayer;

    if (duration) {
        const percent = (currentTime / duration) * 100;
        elements.progress.style.width = percent + '%';

        elements.currentTime.textContent = formatTime(currentTime);
    }
}

function updateDuration() {
    const { duration } = elements.audioPlayer;
    if (duration && !isNaN(duration)) {
        elements.duration.textContent = formatTime(duration);
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function seek(e) {
    const { duration } = elements.audioPlayer;
    const rect = elements.progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    elements.audioPlayer.currentTime = duration * percent;
}

function changeVolume(e) {
    const volume = e.target.value / 100;
    elements.audioPlayer.volume = volume;
}

// ===== SECCIÓN DE HISTORIA =====
function initStorySection() {
    elements.storyTexts = document.querySelectorAll('.story-text');
}

function showStory() {
    elements.storySection.classList.add('active');

    // Animación con GSAP
    gsap.to(elements.storySection, {
        duration: 0.5,
        opacity: 1,
        ease: 'power2.out'
    });

    gsap.from('.story-title', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 0.2
    });

    gsap.from('.story-entry', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.4
    });

    // Ocultar main content
    gsap.to(elements.mainContent, {
        duration: 0.5,
        opacity: 0,
        scale: 0.95,
        ease: 'power2.in'
    });
}

function hideStory() {
    gsap.to(elements.storySection, {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.in',
        onComplete: () => {
            elements.storySection.classList.remove('active');
        }
    });

    // Mostrar main content
    gsap.to(elements.mainContent, {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        ease: 'power2.out'
    });
}

function saveStory() {
    const storyData = {};

    elements.storyTexts.forEach((textarea, index) => {
        storyData[`story_${index}`] = textarea.value;
    });

    localStorage.setItem('loveStory', JSON.stringify(storyData));

    // Feedback visual
    const btn = elements.saveStory;
    const originalText = btn.textContent;
    btn.textContent = '✓ Guardado!';
    btn.style.background = 'linear-gradient(135deg, #00c853, #64dd17)';

    gsap.to(btn, {
        duration: 0.3,
        scale: 1.1,
        ease: 'back.out(1.7)'
    });

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        gsap.to(btn, {
            duration: 0.3,
            scale: 1
        });
    }, 2000);
}

function loadStoryFromStorage() {
    const savedStory = localStorage.getItem('loveStory');

    if (savedStory) {
        const storyData = JSON.parse(savedStory);

        elements.storyTexts.forEach((textarea, index) => {
            const key = `story_${index}`;
            if (storyData[key]) {
                textarea.value = storyData[key];
            }
        });
    }
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Reproductor
    elements.playBtn.addEventListener('click', togglePlay);
    elements.prevBtn.addEventListener('click', playPrev);
    elements.nextBtn.addEventListener('click', playNext);
    elements.volumeSlider.addEventListener('input', changeVolume);
    elements.progressBar.addEventListener('click', seek);

    // Botones de historia
    elements.feelingsBtn.addEventListener('click', showStory);
    elements.closeStory.addEventListener('click', hideStory);
    elements.backToMain.addEventListener('click', hideStory);
    elements.saveStory.addEventListener('click', saveStory);

    // Efectos de mouse en fotos
    document.querySelectorAll('.photo-frame').forEach(frame => {
        frame.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                rotationY: 5,
                ease: 'power2.out'
            });
        });

        frame.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                rotationY: 0,
                ease: 'power2.out'
            });
        });
    });

    // Efectos en cajas de poema
    document.querySelectorAll('.poem-box').forEach(box => {
        box.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                y: -10,
                ease: 'power2.out'
            });
        });

        box.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                y: 0,
                ease: 'power2.out'
            });
        });
    });
}

// ===== EFECTOS ADICIONALES =====

// Crear corazones flotantes al hacer hover en el botón de sentimientos
elements.feelingsBtn.addEventListener('mouseenter', () => {
    createFloatingHearts(5);
});

function createFloatingHearts(count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.left = elements.feelingsBtn.getBoundingClientRect().left +
                          Math.random() * elements.feelingsBtn.offsetWidth + 'px';
        heart.style.top = elements.feelingsBtn.getBoundingClientRect().top + 'px';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.opacity = '0.8';

        document.body.appendChild(heart);

        // Animar con GSAP
        gsap.to(heart, {
            duration: 2 + Math.random(),
            y: -200,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            rotation: Math.random() * 360,
            ease: 'power1.out',
            onComplete: () => heart.remove()
        });
    }
}

// Mensaje de consola
console.log('%c📝 Instrucciones:', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
console.log('%c1. Coloca tus fotos en la carpeta "img" con los nombres "foto1.jpg" y "foto2.jpg"', 'color: #666; font-size: 12px;');
console.log('%c2. Agrega tus canciones MP3 en la carpeta "music"', 'color: #666; font-size: 12px;');
console.log('%c3. Actualiza la variable PLAYLIST en script.js con los nombres de tus archivos', 'color: #666; font-size: 12px;');
console.log('%c4. Cambia la fecha RELATIONSHIP_START_DATE a tu fecha especial', 'color: #666; font-size: 12px;');
console.log('%c5. Personaliza los poemas en index.html', 'color: #666; font-size: 12px;');
