const slider = document.querySelector('.redes-sociales-slider');
const prevBtn = document.querySelector('.redes-sociales-prev');
const nextBtn = document.querySelector('.redes-sociales-next');

let counter = 0;
const size = slider.children[0].clientWidth;

prevBtn.addEventListener('click', () => {
  counter--;
  if (counter < 0) {
    counter = slider.children.length - 1;
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
  
      // Desplazarse a la sección
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });
  