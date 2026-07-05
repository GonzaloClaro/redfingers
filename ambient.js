// Ambient background: embers drifting off something burning far below —
// firefly-like glow, mostly red, with a few warm amber sparks. Respects
// prefers-reduced-motion.
(function () {
    const canvas = document.getElementById('ambient');
    if (!canvas) return;

    // Position inline so the canvas never falls into document flow,
    // even if a stale cached stylesheet lacks the #ambient rule.
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '0',
        pointerEvents: 'none'
    });

    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // color, weight (probability), alpha range
    const PALETTE = [
        { rgb: '220, 38, 44', weight: 0.82, alpha: [0.42, 0.9] },    // ember red
        { rgb: '223, 140, 60', weight: 0.12, alpha: [0.26, 0.5] },   // lantern amber
        { rgb: '231, 182, 193', weight: 0.03, alpha: [0.12, 0.24] }, // faint petal pink
        { rgb: '140, 190, 220', weight: 0.03, alpha: [0.12, 0.22] }  // cold city blue
    ];

    function pickColor() {
        let r = Math.random();
        for (const c of PALETTE) {
            if (r < c.weight) return c;
            r -= c.weight;
        }
        return PALETTE[0];
    }

    let particles = [];

    function makeParticle(anywhere) {
        const c = pickColor();
        return {
            x: Math.random() * canvas.width,
            y: anywhere ? Math.random() * canvas.height : canvas.height + 4,
            r: 1.5 + Math.random() * 3.2,
            vy: -(0.08 + Math.random() * 0.22),
            vx: (Math.random() - 0.5) * 0.12,
            drift: Math.random() * Math.PI * 2,
            flicker: Math.random() * Math.PI * 2,
            flickerSpeed: 0.02 + Math.random() * 0.04,
            rgb: c.rgb,
            baseAlpha: c.alpha[0] + Math.random() * (c.alpha[1] - c.alpha[0])
        };
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const count = Math.min(70, Math.max(28, Math.floor(canvas.width / 20)));
        particles = Array.from({ length: count }, () => makeParticle(true));
    }

    function drawFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
            const alpha = p.baseAlpha * (0.55 + 0.45 * Math.sin(p.flicker));
            ctx.shadowColor = `rgba(${p.rgb}, ${Math.min(alpha * 1.6, 1)})`;
            ctx.shadowBlur = p.r * 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.rgb}, ${alpha})`;
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    }

    function step() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.drift += 0.008;
            p.flicker += p.flickerSpeed;
            p.x += p.vx + Math.sin(p.drift) * 0.08;
            p.y += p.vy;
            if (p.y < -6 || p.x < -6 || p.x > canvas.width + 6) {
                particles[i] = makeParticle(false);
            }
        }
        drawFrame();
        requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', resize);

    if (reduceMotion) {
        drawFrame();
        return;
    }

    requestAnimationFrame(step);
})();
