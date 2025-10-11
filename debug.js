// Debug script to help identify loading issues
console.log('🔍 Red Fingers Debug Script Started');

// Check if we're in production or development
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
console.log('Environment:', isProduction ? 'Production' : 'Development');
console.log('Current URL:', window.location.href);

// Monitor loading screen
const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
    console.log('✅ Loading screen found');
    
    // Monitor when it gets hidden
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (loadingScreen.classList.contains('hidden')) {
                    console.log('✅ Loading screen hidden successfully');
                }
            }
        });
    });
    
    observer.observe(loadingScreen, { attributes: true });
    
    // Force hide after 10 seconds if still visible
    setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
            console.warn('⚠️ Loading screen still visible after 10s, force hiding');
            loadingScreen.classList.add('hidden');
            loadingScreen.style.display = 'none';
        }
    }, 10000);
} else {
    console.error('❌ Loading screen not found');
}

// Check for JavaScript errors
window.addEventListener('error', (e) => {
    console.error('❌ JavaScript Error:', e.error);
});

// Check for resource loading errors
window.addEventListener('load', () => {
    console.log('✅ Window loaded');
    
    // Check images
    const images = document.querySelectorAll('img');
    let brokenImages = 0;
    
    images.forEach((img, index) => {
        if (!img.complete || img.naturalHeight === 0) {
            brokenImages++;
            console.warn(`❌ Broken image ${index + 1}:`, img.src);
        }
    });
    
    if (brokenImages === 0) {
        console.log('✅ All images loaded successfully');
    } else {
        console.warn(`⚠️ ${brokenImages} broken images found`);
    }
    
    // Check CSS
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    console.log(`✅ ${stylesheets.length} stylesheets found`);
    
    // Check scripts
    const scripts = document.querySelectorAll('script[src]');
    console.log(`✅ ${scripts.length} external scripts found`);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📊 Performance Data:');
            console.log('- DOM Content Loaded:', Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart), 'ms');
            console.log('- Page Load Time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
            console.log('- Total Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
        }, 0);
    });
}

console.log('🔍 Debug script setup complete');