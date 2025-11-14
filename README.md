# 💕 Página Web Romántica Para Mi Novia

Una página web hermosa y romántica creada con amor, con animaciones GSAP, reproductor de música y secciones personalizables.

## ✨ Características

- 🎨 **Diseño Hermoso**: Fondo degradado animado con partículas flotantes
- 💫 **Animaciones GSAP**: Efectos suaves y profesionales en todos los elementos
- 📅 **Calendario de Relación**: Contador en tiempo real de días y horas juntos
- 🎵 **Reproductor de Música**: Player completo con playlist de canciones románticas
- 📖 **Sección de Historia**: Espacio para escribir tu historia de amor (guardado en navegador)
- 📱 **100% Responsive**: Se ve perfecta en móvil, tablet y escritorio
- 🖼️ **Galería de Fotos**: Muestra tus fotos favoritas con efectos elegantes
- 💌 **Poemas Personalizables**: Espacios para tus mensajes románticos

## 🚀 Cómo Usar

### 1️⃣ Personalizar el Contenido

#### A) Cambiar los Poemas y Mensajes

Abre `index.html` y busca las secciones de poemas:

```html
<!-- Poema 1 (junto al título TE AMO) -->
<div class="poem-box poem-right">
    <h3>Mi Corazón</h3>
    <p>
        Escribe aquí tu poema...
    </p>
</div>

<!-- Poema 2 (abajo del calendario) -->
<div class="poem-box poem-left">
    <h3>Mis Razones</h3>
    <p>
        Escribe aquí otro poema...
    </p>
</div>
```

#### B) Configurar la Fecha de Inicio

Abre `js/script.js` y cambia la fecha (línea 6):

```javascript
// Formato: new Date(AÑO, MES-1, DÍA)
// Ejemplo: 15 de Febrero, 2024 = new Date(2024, 1, 15)
const RELATIONSHIP_START_DATE = new Date(2024, 0, 1);
```

**Importante**: Los meses van de 0-11 (0=Enero, 1=Febrero, etc.)

### 2️⃣ Agregar tus Fotos

1. Coloca tus fotos en la carpeta `img/`
2. Nómbralas como: `foto1.jpg` y `foto2.jpg`
3. O cambia los nombres en `index.html`:

```html
<img src="img/tu-foto-personalizada.jpg" alt="Descripción">
```

**Formatos soportados**: JPG, PNG, WebP

### 3️⃣ Agregar Música

1. Coloca tus archivos MP3 en la carpeta `music/`

2. Abre `js/script.js` y actualiza la PLAYLIST (línea 10):

```javascript
const PLAYLIST = [
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        file: "perfect.mp3"
    },
    {
        title: "All of Me",
        artist: "John Legend",
        file: "all-of-me.mp3"
    }
    // Agrega más canciones...
];
```

3. Asegúrate de que los nombres de archivo coincidan exactamente

### 4️⃣ Abrir la Página

Simplemente abre el archivo `index.html` en tu navegador favorito (Chrome, Firefox, Edge, Safari).

## 📂 Estructura del Proyecto

```
para-mi-novia/
│
├── index.html          # Página principal
├── README.md           # Este archivo
│
├── css/
│   └── style.css       # Estilos y animaciones
│
├── js/
│   └── script.js       # Funcionalidad y configuración
│
├── img/
│   ├── foto1.jpg       # Primera foto (agrégala tú)
│   └── foto2.jpg       # Segunda foto (agrégala tú)
│
└── music/
    ├── LEEME.txt       # Instrucciones para música
    └── [tus mp3]       # Tus canciones románticas
```

## 🎯 Características Técnicas

### Animaciones GSAP
- Partículas flotantes en el fondo
- Entrada animada de todos los elementos
- Efectos hover en fotos y poemas
- Transiciones suaves entre secciones
- Corazones flotantes en el botón

### Reproductor de Música
- Play, Pause, Next, Previous
- Barra de progreso interactiva
- Control de volumen
- Playlist clickeable
- Disco de vinilo animado
- Auto-play siguiente canción

### Sección de Historia
- 4 áreas de texto para escribir
- Guardado automático en localStorage
- Botón para guardar cambios
- Animación de entrada elegante
- Modo oscuro para mejor lectura

## 💡 Consejos

1. **Fotos**: Usa imágenes de buena calidad pero no muy pesadas (máx 2-3 MB)

2. **Música**: Canciones en MP3 con nombres simples (sin espacios ni acentos)

3. **Personalización**: Cambia los colores en `css/style.css` (busca `:root`)

4. **Hosting**: Puedes subir esto a GitHub Pages, Netlify o Vercel gratis

5. **Privacidad**: Si no quieres que sea público, envíale solo el ZIP a tu novia

## 🎨 Personalizar Colores

Abre `css/style.css` y cambia las variables (líneas 8-17):

```css
:root {
    --primary-color: #ff0040;      /* Color principal */
    --secondary-color: #ff6b9d;    /* Color secundario */
    --accent-color: #ffa5c8;       /* Color de acento */
    /* ... más colores ... */
}
```

## 📱 Compatibilidad

- ✅ Chrome / Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Móviles iOS y Android
- ✅ Tablets

## 🆘 Solución de Problemas

**La música no suena:**
- Verifica que los archivos MP3 estén en la carpeta `music/`
- Revisa que los nombres en `PLAYLIST` coincidan exactamente
- Algunos navegadores bloquean autoplay, haz clic en Play

**Las fotos no aparecen:**
- Asegúrate de que están en la carpeta `img/`
- Verifica que los nombres coincidan con los del HTML
- Prueba con formato JPG

**Las animaciones no funcionan:**
- Verifica tu conexión a internet (GSAP se carga desde CDN)
- Abre la consola del navegador (F12) para ver errores

## 🚀 Subir a Internet (Opcional)

### Opción 1: GitHub Pages (Gratis)
1. Crea una cuenta en GitHub
2. Crea un nuevo repositorio
3. Sube todos los archivos
4. Ve a Settings → Pages
5. Activa GitHub Pages

### Opción 2: Netlify (Gratis)
1. Ve a netlify.com
2. Arrastra la carpeta del proyecto
3. ¡Listo! Te da una URL

### Opción 3: Enviar por ZIP
1. Comprime toda la carpeta
2. Envíasela a tu novia
3. Ella solo tiene que descomprimir y abrir index.html

## ❤️ Mensaje Final

Este proyecto fue creado con mucho amor. Tómate tu tiempo para personalizarlo y hacerlo especial. Los pequeños detalles marcan la diferencia.

Algunas ideas extra:
- Escribe poemas originales, no copies de internet
- Elige canciones que tengan significado para ustedes
- En la sección "Historia", sé honesto y romántico
- Agrega fotos de momentos especiales juntos

¡Que disfrutes creando este regalo especial! 💕

---

**Hecho con amor** ❤️ **usando:**
- HTML5
- CSS3
- JavaScript (ES6+)
- GSAP 3.12.5
