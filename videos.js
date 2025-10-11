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
    new RedFingersLatestTracks();
    initializeUI();
    
    // Emergency loading screen removal
    const emergencyHideLoading = () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
            loadingScreen.remove();
        }
    };
    
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(emergencyHideLoading, 100);
    });
    
    // Hide loading screen on any user interaction
    const hideOnInteraction = () => {
        emergencyHideLoading();
        document.removeEventListener('touchstart', hideOnInteraction);
        document.removeEventListener('click', hideOnInteraction);
    };
    
    document.addEventListener('touchstart', hideOnInteraction, { once: true });
    document.addEventListener('click', hideOnInteraction, { once: true });
});

// UI Enhancement Functions
function initializeUI() {
    // Loading screen - hide immediately on mobile for better UX
    const hideLoadingScreen = () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // Force remove after animation
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 600);
        }
    };
    
    // Hide loading screen faster on mobile
    const isMobile = window.innerWidth <= 768;
    const delay = isMobile ? 500 : 1500;
    
    setTimeout(hideLoadingScreen, delay);
    
    // Fallback: force hide if still visible after 3 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            console.log('Force hiding loading screen');
            hideLoadingScreen();
        }
    }, 3000);

    // Enhanced mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
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
}/
    / Enhanced mobile experience functions
function initializeMobileEnhancements() {
    // Add touch support to video items
    document.querySelectorAll('.video-item, .track-item').forEach(item => {
        item.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        item.addEventListener('touchend', function () {
            this.style.transform = '';
        }, { passive: true });
    });

    // Improve button touch targets
    document.querySelectorAll('.btn, .nav-btn, .gallery-nav').forEach(btn => {
        btn.style.minWidth = '48px';
        btn.style.minHeight = '48px';
    });

    // Add swipe support to video modal
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        let startY = 0;

        videoModal.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });

        videoModal.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = startY - currentY;

            // Close modal on swipe down
            if (diff < -100) {
                videoModal.remove();
            }
        }, { passive: true });
    }

    // Optimize scroll performance
    let ticking = false;

    function updateScrollElements() {
        // Add scroll-based animations or updates here
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }, { passive: true });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Recalculate dimensions after orientation change
            if (typeof initializeGallery === 'function') {
                const slider = document.getElementById('gallery-slider');
                if (slider) {
                    // Reset gallery dimensions
                    slider.style.transform = 'translateX(0)';
                }
            }
        }, 100);
    });

    // Improve form experience on mobile
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            // Prevent zoom on iOS
            input.style.fontSize = '16px';
        });
    });

    // Add haptic feedback simulation for supported devices
    function addHapticFeedback(element) {
        element.addEventListener('click', () => {
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
    }

    // Add haptic feedback to interactive elements
    document.querySelectorAll('.btn, .nav-btn, .gallery-nav, .video-item, .track-item').forEach(addHapticFeedback);
}

// Initialize mobile enhancements when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileEnhancements);
} else {
    initializeMobileEnhancements();
}// Per
formance optimizations for mobile
function initializePerformanceOptimizations() {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy-image');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.remove('lazy-image');
            }
        });
    }

    // Progressive image loading for gallery
    function loadGalleryImagesProgressively() {
        const galleryImages = document.querySelectorAll('#gallery-slider .lazy-image');
        let loadedCount = 0;
        const batchSize = window.innerWidth <= 768 ? 4 : 8; // Smaller batches on mobile
        
        function loadBatch() {
            const batch = Array.from(galleryImages).slice(loadedCount, loadedCount + batchSize);
            
            batch.forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    const newImg = new Image();
                    newImg.onload = () => {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy-image');
                    };
                    newImg.src = src;
                }
            });
            
            loadedCount += batchSize;
            
            // Load next batch after delay
            if (loadedCount < galleryImages.length) {
                setTimeout(loadBatch, 500);
            }
        }
        
        // Start loading after initial page load
        setTimeout(loadBatch, 1000);
    }

    // Connection-aware loading
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            // Very slow connection - minimal loading
            document.body.classList.add('slow-connection');
            return;
        } else if (connection.effectiveType === '3g') {
            // Moderate connection - delayed loading
            setTimeout(loadGalleryImagesProgressively, 2000);
        } else {
            // Fast connection - normal loading
            setTimeout(loadGalleryImagesProgressively, 500);
        }
    } else {
        // Unknown connection - conservative approach
        setTimeout(loadGalleryImagesProgressively, 1000);
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            'img/landing.png',
            'img/instagram-1.jpeg',
            'img/instagram-2.jpeg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Only preload on fast connections
    if ('connection' in navigator && 
        (navigator.connection.effectiveType === '4g' || 
         navigator.connection.effectiveType === '5g')) {
        preloadCriticalResources();
    }

    // Optimize video thumbnails for mobile
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.video-thumbnail img, .track-thumbnail img').forEach(img => {
            if (img.src && img.src.includes('maxresdefault')) {
                // Use smaller thumbnail for mobile
                img.src = img.src.replace('maxresdefault', 'mqdefault');
            }
        });
    }

    // Reduce animations on slow devices
    function detectSlowDevice() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return true;
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return false;
        
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return renderer.includes('Mali') || renderer.includes('Adreno 3') || renderer.includes('PowerVR');
    }

    if (detectSlowDevice() || window.innerWidth <= 480) {
        document.body.classList.add('reduce-animations');
    }
}

// Initialize performance optimizations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePerformanceOptimizations);
} else {
    initializePerformanceOptimizations();
}