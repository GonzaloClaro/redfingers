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
                <div class="play-button">▶</div>
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    new RedFingersLatestTracks();
    initializeUI();
});

// Backup initialization in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // Document is still loading
    console.log('Document still loading, waiting for DOMContentLoaded');
} else {
    // Document has already loaded
    console.log('Document already loaded, initializing immediately');
    setTimeout(() => {
        new RedFingersLatestTracks();
        initializeUI();
    }, 100);
}

// Additional fallback - hide loading screen when window loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            loadingScreen.style.display = 'none';
        }
    }, 100);
});

// Emergency fallback - force hide loading screen after 5 seconds
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        console.warn('Emergency loading screen hide triggered');
        loadingScreen.classList.add('hidden');
        loadingScreen.style.display = 'none';
    }
}, 5000);

// UI Enhancement Functions
function initializeUI() {
    // Loading screen - hide faster and add multiple fallbacks
    const hideLoadingScreen = () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // Force hide after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }
    };

    // Multiple fallback timers for loading screen
    setTimeout(hideLoadingScreen, 800);  // Primary timer - much faster
    setTimeout(hideLoadingScreen, 2000); // Fallback timer
    setTimeout(hideLoadingScreen, 3000); // Emergency fallback

    // Mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    console.log('Nav elements found:', { navToggle: !!navToggle, navMenu: !!navMenu });

    if (navToggle && navMenu) {
        console.log('Setting up mobile navigation...');
        
        // Add visual feedback that the element is clickable
        navToggle.style.cursor = 'pointer';
        navToggle.setAttribute('role', 'button');
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        const toggleMenu = (e) => {
            console.log('Hamburger activated!');
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            console.log('Menu was active:', isActive);
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            } else {
                document.body.style.overflow = '';
                console.log('Menu closed');
            }
        };

        // Add both click and touch events
        navToggle.addEventListener('click', toggleMenu);
        navToggle.addEventListener('touchstart', toggleMenu, { passive: false });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Gallery slider
    initializeGallery();

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
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