// Red Fingers Latest Tracks Implementation
class RedFingersLatestTracks {
    constructor() {
        this.tracksPerPage = 3;
        this.currentPage = 0;
        this.tracks = this.getTracks();
        this.init();
    }

    getTracks() {
        // Latest tracks with real YouTube IDs
        return [
            { id: 'g08y_x83d5E', title: 'Rauw Alejandro, Bad Bunny - Qué Pasaría' },
            { id: 'm3Fy2OrSDiQ', title: 'Kali Uchis - Muévelo' },
            { id: 'jJ5Fg4Wwzp0', title: 'Red Fingers, Baby Jey & Kuroh - SE K TU' },
            { id: '3Rf5Kr2x5rQ', title: 'Paloma Mami - Exmaquina' },
            { id: 'JwiQoZPXV24', title: 'Pablo Chill-E - CORA ROTO ft Pailita' },
            { id: 'oNAx3WJiEsY', title: 'Katteyes x Kidd Voodoo - PONTE LOKITA' },
            { id: '32jZefMrweI', title: 'Paloma Mami, Marcianeke, ITHAN NY - DOSiS' },
            { id: 'pR-dhGNjkDQ', title: 'AKRILLA - tú no' },
            { id: 'iZeq_qcvscI', title: 'IShowSpeed - Bailar' },
            { id: '3MfStCuVzYI', title: 'EASYKID - WHYME? (ft AKRILLA)' },
            { id: 'cI-s7h31QXU', title: 'Pailita, Cris Mj, Young Cister - Llámame Bebé' },
            { id: 'lZFkGS_DYTw', title: 'Pablo Chill-E - DESAHOGO' },
            { id: 'L46JhW3LDb4', title: 'BLESSD, STANDLY, EL BARTO - MI GATA REMIX' },
            { id: '0R89P2jVEUg', title: 'NVSCVR - Full piketiao' },
            { id: '9QmUMgVAhF8', title: 'AKRILLA - Despertar' },
            { id: 'HUQNuFVSV8s', title: 'Standly x Yilberking - Tequila & Limón' },
            { id: 'uTdtkeqEsVo', title: 'DrefQuila, FUKA & Red Fingers - Un Call' },
            { id: '3zAd_nswVfY', title: 'Harry Nach & Red Fingers - Y SI TE VAI :(' },
            { id: 'Y465pkGkJ_U', title: 'Harry Nach, Julianno Sosa, Marcianeke - PERDÓN TOI EN DINERO' },
            { id: 'FrgMlADdnnc', title: 'Lara91k, Álvaro Diaz - peli de terror' },
            { id: 'MglqgK2c2kg', title: 'Red Fingers - Creamfields 2023 Set' },
        ];
    }

    async init() {
        // Show loading briefly for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        this.renderTracks();
        this.setupNavigation();
    }

    renderTracks() {
        const tracksContainer = document.getElementById('tracks-grid');
        const loadingElement = document.getElementById('tracks-loading');

        if (!tracksContainer) return;

        // Hide loading and show tracks
        loadingElement.style.display = 'none';
        tracksContainer.style.display = 'grid';

        // Clear existing content
        tracksContainer.innerHTML = '';

        // Calculate which tracks to show
        const startIndex = this.currentPage * this.tracksPerPage;
        const endIndex = Math.min(startIndex + this.tracksPerPage, this.tracks.length);
        const tracksToShow = this.tracks.slice(startIndex, endIndex);

        // Create track elements
        tracksToShow.forEach(track => {
            const trackElement = this.createTrackElement(track);
            tracksContainer.appendChild(trackElement);
        });

        // Show navigation if needed
        const navigation = document.querySelector('.videos-navigation');
        if (this.tracks.length > this.tracksPerPage) {
            navigation.style.display = 'flex';
        }

        this.updateNavigationButtons();
    }

    createTrackElement(track) {
        const trackDiv = document.createElement('div');
        trackDiv.className = 'video-item';

        trackDiv.innerHTML = `
            <div class="video-thumbnail" onclick="playVideo('${track.id}')">
                <img src="https://img.youtube.com/vi/${track.id}/mqdefault.jpg" 
                     alt="${track.title}" loading="lazy">
                <div class="play-button"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></div>
            </div>
            <div class="video-info">
                <h3>${track.title}</h3>
            </div>
        `;

        return trackDiv;
    }

    setupNavigation() {
        const prevBtn = document.getElementById('tracks-prev');
        const nextBtn = document.getElementById('tracks-next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
            nextBtn.addEventListener('click', () => this.nextPage());
        }
    }

    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.renderTracks();
        }
    }

    nextPage() {
        const maxPages = Math.ceil(this.tracks.length / this.tracksPerPage);
        if (this.currentPage < maxPages - 1) {
            this.currentPage++;
            this.renderTracks();
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('tracks-prev');
        const nextBtn = document.getElementById('tracks-next');
        const dotsContainer = document.getElementById('tracks-dots');
        const maxPages = Math.ceil(this.tracks.length / this.tracksPerPage);

        if (prevBtn && nextBtn) {
            prevBtn.disabled = this.currentPage === 0;
            nextBtn.disabled = this.currentPage >= maxPages - 1;
        }

        // Update dots navigation
        if (dotsContainer && maxPages > 1) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < maxPages; i++) {
                const dot = document.createElement('div');
                dot.className = `nav-dot ${i === this.currentPage ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    this.currentPage = i;
                    this.renderTracks();
                });
                dotsContainer.appendChild(dot);
            }
        }
    }
}

// Global function to play video in modal
function playVideo(videoId) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <span class="video-modal-close">&times;</span>
            <iframe width="800" height="450" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.video-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Initialize once the DOM is ready (script is loaded at end of body, so DOM is already parsed)
document.addEventListener('DOMContentLoaded', () => {
    new RedFingersLatestTracks();
    initializeUI();
});

// Mobile optimizations
if (window.innerWidth <= 768) {
    // Optimize touch events for mobile
    document.addEventListener('touchstart', () => {}, { passive: true });
}

// Hide loading screen once the page has fully loaded
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }
});

// UI Enhancement Functions
function initializeUI() {
    // Mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        // Ensure proper touch target size
        navToggle.style.cursor = 'pointer';
        navToggle.style.minWidth = '44px';
        navToggle.style.minHeight = '44px';
        navToggle.style.display = 'flex';
        navToggle.style.alignItems = 'center';
        navToggle.style.justifyContent = 'center';

        const toggleMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Toggle classes
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            const newState = navMenu.classList.contains('active');
            
            // Prevent body scroll when menu is open
            if (newState) {
                document.body.style.overflow = 'hidden';
                navToggle.setAttribute('aria-expanded', 'true');
            } else {
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        };

        navToggle.addEventListener('click', toggleMenu, { passive: false });

        // Keyboard support
        navToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu(e);
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            const closeMenu = () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            };

            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Gallery slider
    initializeGallery();

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId.startsWith('#')) return;

            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image loading optimization
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    // All images loaded, ensure loading screen is hidden
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.classList.add('hidden');
                    }
                }
            });
            
            img.addEventListener('error', () => {
                console.warn('Failed to load image:', img.src);
                loadedImages++;
                if (loadedImages === totalImages) {
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.classList.add('hidden');
                    }
                }
            });
        }
    });

    // Intersection Observer for animations
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

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function initializeGallery() {
    const slider = document.getElementById('gallery-slider');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');

    if (!slider || !prevBtn || !nextBtn) return;

    // Clone images for true infinite loop
    const originalItems = Array.from(slider.children);
    const itemWidth = 320; // 300px + 20px gap
    const visibleItems = Math.floor(slider.parentElement.offsetWidth / itemWidth);

    // Clone enough items to create seamless loop (at least visible items + buffer)
    const clonesToAdd = Math.max(visibleItems + 2, 5);

    // Add clones at the end
    for (let i = 0; i < clonesToAdd; i++) {
        const clone = originalItems[i % originalItems.length].cloneNode(true);
        slider.appendChild(clone);
    }

    // Add clones at the beginning
    for (let i = clonesToAdd - 1; i >= 0; i--) {
        const clone = originalItems[(originalItems.length - 1 - i) % originalItems.length].cloneNode(true);
        slider.insertBefore(clone, slider.firstChild);
    }

    let currentIndex = clonesToAdd; // Start after the prepended clones
    const totalItems = slider.children.length;
    const originalLength = originalItems.length;
    let isTransitioning = false;

    function updateSlider(smooth = true) {
        if (smooth) {
            slider.style.transition = 'transform 0.5s ease-in-out';
        } else {
            slider.style.transition = 'none';
        }

        const translateX = -currentIndex * itemWidth;
        slider.style.transform = `translateX(${translateX}px)`;
    }

    function handleInfiniteLoop() {
        if (isTransitioning) return;

        // If we're at the end clones, jump to the beginning of real items
        if (currentIndex >= totalItems - clonesToAdd) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = clonesToAdd;
                updateSlider(false);
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            }, 500);
        }
        // If we're at the beginning clones, jump to the end of real items
        else if (currentIndex < clonesToAdd) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = totalItems - clonesToAdd - 1;
                updateSlider(false);
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            }, 500);
        }
    }

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex--;
        updateSlider();
        handleInfiniteLoop();
    });

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex++;
        updateSlider();
        handleInfiniteLoop();
    });

    // Auto-slide every 3 seconds
    setInterval(() => {
        if (isTransitioning) return;
        currentIndex++;
        updateSlider();
        handleInfiniteLoop();
    }, 3000);

    // Initial position
    updateSlider(false);
}