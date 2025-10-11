const slider = document.querySelector('.social-media-slider');
const prevBtn = document.querySelector('.social-media-prev');
const nextBtn = document.querySelector('.social-media-next');

let counter = 0;
const size = slider.children[0].clientWidth;

prevBtn.addEventListener('click', () => {
  counter -= 3; // Cambia el 1 a 3
  if (counter < 0) {
    counter = 0; // Asegúrate de que no se desplace más allá del inicio
  }
  slider.style.transform = `translateX(-${size * counter}px)`;
});

prevBtn.addEventListener('click', () => {
  counter--;
  if (counter < 0) {
    counter = slider.children.length - 4;
  }
  slider.style.transform = `translateX(-${size * counter}px)`;
});

nextBtn.addEventListener('click', () => {
  counter += 3; // Cambia el 1 a 3
  if (counter > slider.children.length - 1) {
    counter = slider.children.length - 3; // Asegúrate de que no se desplace más allá del final
  }
  slider.style.transform = `translateX(-${size * counter}px)`;
});

nextBtn.addEventListener('click', () => {
  counter++;
  if (counter > slider.children.length - 1) {
    counter = 0;
  }
  slider.style.transform = `translateX(-${size * counter}px)`;
});

// Obtener los elementos de la sección de videos
const videosSection = document.querySelector('#videos');
const videosContainer = videosSection.querySelector('.videos');
const videosNav = videosSection.querySelector('.videos-nav');
const videosPrev = videosSection.querySelector('.videos-prev');
const videosNext = videosSection.querySelector('.videos-next');

// Calcular el ancho del video y la cantidad de videos
const videoWidth = videosContainer.querySelector('iframe').offsetWidth;
const videoCount = videosContainer.querySelectorAll('iframe').length;

// Inicializar la posición del contenedor de videos
let videoPosition = 0;

// Función para actualizar la posición del contenedor de videos
function updateVideoPosition() {
  videosContainer.style.transform = `translateX(-${videoPosition * videoWidth}px)`;
}

// Función para cambiar al video anterior
function prevVideo() {
  if (videoPosition > 0) {
    videoPosition--;
    updateVideoPosition();
  }
}

// Función para cambiar al siguiente video
function nextVideo() {
  if (videoPosition < videoCount - 1) {
    videoPosition++;
    updateVideoPosition();
  }
}

// Agregar eventos a las flechas de navegación
videosPrev.addEventListener('click', prevVideo);
videosNext.addEventListener('click', nextVideo);

  
  
  
// Manejar el clic en los enlaces del menú
const menuLinks = document.querySelectorAll('nav a');

menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        // Obtener la sección correspondiente al enlace
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);

        // Calcular la posición de desplazamiento ajustada
        const headerHeight = document.querySelector('header').offsetHeight;
        const offsetTop = section.offsetTop - headerHeight;

        // Desplazarse a la posición ajustada
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

