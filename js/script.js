// ===== CONFIGURACIÓN =====
// IMPORTANTE: Cambia estos valores según tus necesidades
// Fecha de inicio del contador (formato: año, mes-1, día, hora, minuto, segundo)
// Ejemplo: new Date(2024, 0, 15, 20, 30, 0) = 15 de enero de 2024, 8:30 PM
const START_DATE = new Date(2024, 0, 1, 0, 0, 0);
// Contraseña secreta (cámbiala por la que quieras)
const SECRET_PASSWORD = "teamo";
// Ruta de la foto (coloca tu foto en la carpeta del proyecto)
const PHOTO_PATH = "tu-foto.jpg"; // Cambia esto por el nombre de tu foto
// Palabras para el corazón (personalízalas)
const HEART_WORDS = [
    "Amor", "Felicidad", "Sonrisas", "Cariño", "Pasión",
    "Ternura", "Alegría", "Dulzura", "Belleza", "Luz",
    "Vida", "Sueños", "Magia", "Risas", "Paz",
    "Inspiración", "Compañía", "Calidez", "Sinceridad", "Confianza",
    "Aventura", "Momentos", "Recuerdos", "Eternidad", "Corazón",
    "Juntos", "Siempre", "Forever", "Mi Todo", "Mi Mundo"
];
// ===== VARIABLES GLOBALES =====
let counterInterval;
// ===== ELEMENTOS DEL DOM =====
const elements = {
    initialSection: document.getElementById('initial-section'),
    unlockedSection: document.getElementById('unlocked-section'),
    passwordModal: document.getElementById('password-modal'),
    passwordInput: document.getElementById('password-input'),
    errorMessage: document.getElementById('error-message'),
    mainPhoto: document.getElementById('main-photo'),
    unlockBtn: document.getElementById('unlock-btn'),
    submitPassword: document.getElementById('submit-password'),
    cancelPassword: document.getElementById('cancel-password'),
    backBtn: document.getElementById('back-btn'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};
// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initCounter();
    initEventListeners();
    createWordHeart();
    setPhoto();
});
// ===== CONTADOR =====
function initCounter() {
    updateCounter();
    counterInterval = setInterval(updateCounter, 1000);
}
function updateCounter() {
    const now = new Date();
    const difference = now - START_DATE;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    // Animación de números
    animateNumber(elements.days, days);
    animateNumber(elements.hours, hours);
    animateNumber(elements.minutes, minutes);
    animateNumber(elements.seconds, seconds);
}
function animateNumber(element, value) {
    const currentValue = parseInt(element.textContent) || 0;
    if (currentValue !== value) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ff6b9d';
        setTimeout(() => {
            element.textContent = value;
            element.style.transform = 'scale(1)';
            element.style.color = '#ff0040';
        }, 150);
    }
}
// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Botón para abrir modal de contraseña
    elements.unlockBtn.addEventListener('click', () => {
        openPasswordModal();
    });
    // Botón para enviar contraseña
    elements.submitPassword.addEventListener('click', () => {
        checkPassword();
    });
    // Enter en input de contraseña
    elements.passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    // Botón cancelar modal
    elements.cancelPassword.addEventListener('click', () => {
        closePasswordModal();
    });
    // Click fuera del modal para cerrar
    elements.passwordModal.addEventListener('click', (e) => {
        if (e.target === elements.passwordModal) {
            closePasswordModal();
        }
    });
    // Botón volver
    elements.backBtn.addEventListener('click', () => {
        showInitialSection();
    });
}
// ===== MODAL DE CONTRASEÑA =====
function openPasswordModal() {
    elements.passwordModal.classList.add('active');
    elements.passwordInput.value = '';
    elements.errorMessage.textContent = '';
    setTimeout(() => elements.passwordInput.focus(), 100);
}
function closePasswordModal() {
    elements.passwordModal.classList.remove('active');
    elements.passwordInput.value = '';
    elements.errorMessage.textContent = '';
}
function checkPassword() {
    const inputValue = elements.passwordInput.value.trim();
    if (inputValue === '') {
        showError('Por favor ingresa una contraseña');
        shakeModal();
        return;
    }
    if (inputValue.toLowerCase() === SECRET_PASSWORD.toLowerCase()) {
        // Contraseña correcta
        closePasswordModal();
        showUnlockedSection();
        createHeartAnimation();
    } else {
        // Contraseña incorrecta
        showError('Contraseña incorrecta. Intenta de nuevo ❤️');
        shakeModal();
        elements.passwordInput.value = '';
    }
}
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.style.animation = 'none';
    setTimeout(() => {
        elements.errorMessage.style.animation = 'fadeIn 0.3s ease-out';
    }, 10);
}
function shakeModal() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'none';
    setTimeout(() => {
        modalContent.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
    // Agregar animación de shake si no existe
    if (!document.getElementById('shake-animation')) {
        const style = document.createElement('style');
        style.id = 'shake-animation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
}
// ===== CAMBIO DE SECCIONES =====
function showUnlockedSection() {
    elements.initialSection.classList.remove('active');
    setTimeout(() => {
        elements.initialSection.style.display = 'none';
        elements.unlockedSection.classList.add('active');
        elements.unlockedSection.style.display = 'block';
    }, 300);
}
function showInitialSection() {
    elements.unlockedSection.classList.remove('active');
    setTimeout(() => {
        elements.unlockedSection.style.display = 'none';
        elements.initialSection.classList.add('active');
        elements.initialSection.style.display = 'block';
    }, 300);
}
// ===== FOTO =====
function setPhoto() {
    elements.mainPhoto.src = PHOTO_PATH;
    // Manejar error si la foto no existe
    elements.mainPhoto.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500"%3E%3Crect fill="%23ffe0e0" width="500" height="500"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23ff0040" font-size="20" font-family="Arial"%3EColoca tu foto aquí%3C/text%3E%3C/svg%3E';
    };
}
// ===== CORAZÓN DE PALABRAS =====
function createWordHeart() {
    const container = document.querySelector('.word-heart');
    // Coordenadas para formar un corazón (forma paramétrica)
    const heartPoints = generateHeartPoints(HEART_WORDS.length);
    HEART_WORDS.forEach((word, index) => {
        const wordElement = document.createElement('span');
        wordElement.className = 'word';
        wordElement.textContent = word;
        // Tamaño aleatorio
        const fontSize = Math.random() * 1.5 + 0.8; // Entre 0.8rem y 2.3rem
        wordElement.style.fontSize = `${fontSize}rem`;
        // Posicionar en forma de corazón
        const point = heartPoints[index];
        wordElement.style.left = `${point.x}%`;
        wordElement.style.top = `${point.y}%`;
        // Delay de animación aleatorio
        const delay = Math.random() * 2;
        wordElement.style.animationDelay = `${delay}s`;
        // Añadir efecto hover con delay
        wordElement.style.transitionDelay = `${Math.random() * 0.1}s`;
        container.appendChild(wordElement);
    });
}
function generateHeartPoints(numPoints) {
    const points = [];
    // Generar puntos en forma de corazón usando ecuación paramétrica
    for (let i = 0; i < numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 2;
        // Ecuación paramétrica del corazón
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        // Normalizar y centrar (0-100%)
        const normalizedX = (x / 20) * 40 + 50; // Escalar y centrar
        const normalizedY = (y / 20) * 40 + 50; // Escalar y centrar
        // Agregar algo de aleatoriedad para que no sea perfecto
        const randomX = normalizedX + (Math.random() - 0.5) * 5;
        const randomY = normalizedY + (Math.random() - 0.5) * 5;
        points.push({
            x: Math.max(5, Math.min(95, randomX)),
            y: Math.max(5, Math.min(95, randomY))
        });
    }
    return points;
}
function createHeartAnimation() {
    // Crear corazones flotantes al desbloquear
    const container = document.body;
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.fontSize = `${Math.random() * 30 + 20}px`;
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.bottom = '-50px';
            heart.style.zIndex = '9999';
            heart.style.opacity = '0.8';
            heart.style.pointerEvents = 'none';
            heart.style.animation = `floatUp ${Math.random() * 3 + 3}s ease-out`;
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }, i * 100);
    }
    // Agregar animación de float si no existe
    if (!document.getElementById('float-animation')) {
        const style = document.createElement('style');
        style.id = 'float-animation';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
// ===== EFECTOS ADICIONALES =====
// Efecto de partículas en el cursor (opcional)
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.97) { // Solo ocasionalmente
        createSparkle(e.clientX, e.clientY);
    }
});
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'radial-gradient(circle, #ff6b9d, #ff0040)';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleAnimation 1s ease-out';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
    // Agregar animación de sparkle si no existe
    if (!document.getElementById('sparkle-animation')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation';
        style.textContent = `
            @keyframes sparkleAnimation {
                0% {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) translateY(-20px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
// ===== LOG DE DESARROLLO =====
console.log('%c💕 Página romántica creada con amor 💕', 'color: #ff0040; font-size: 20px; font-weight: bold;');
console.log('%cRecuerda cambiar la contraseña y configurar la fecha en script.js', 'color: #ff6b9d; font-size: 14px;');