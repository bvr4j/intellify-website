document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialise Marquee (duplicate items to ensure seamless loop)
    const marqueeTrack = document.getElementById('marquee-track');
    if (marqueeTrack) {
        const phrases = [
            "Never turn your back on the ocean",
            "Respect the locals",
            "Always wear a leash",
            "Check surf conditions",
            "Paddle with purpose"
        ];

        // Create an item group
        const createItemGroup = () => {
            const group = document.createElement('div');
            group.style.display = 'flex';
            phrases.forEach(phrase => {
                const item = document.createElement('div');
                item.className = 'marquee-item';
                item.innerHTML = `<span class="marquee-text">${phrase}</span><span class="marquee-star">✦</span>`;
                group.appendChild(item);
            });
            return group;
        };

        // Append twice to the track for seamless loop
        marqueeTrack.appendChild(createItemGroup());
        marqueeTrack.appendChild(createItemGroup());
        // A 3rd time just to be safe on wide screens
        marqueeTrack.appendChild(createItemGroup());
    }

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after reveal to only show animation once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Parallax Effect on scroll for specific images
    const parallaxTargets = document.querySelectorAll('.parallax-target');

    // Use requestAnimationFrame for smoother parallax
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateParallax = () => {
        parallaxTargets.forEach(target => {
            // Get the container's position relative to viewport
            const rect = target.parentElement.getBoundingClientRect();
            // Only apply if visible
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Calculate offset. 
                // When element is at bottom of viewport, offset is negative.
                // When at top, offset is positive.
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                // Move mostly on Y axis, -20% to +20%
                const yOffset = (scrollProgress - 0.5) * 40;
                target.style.transform = `translateY(${yOffset}%)`;
            }
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;

        // Sticky Header effect
        const navbar = document.getElementById('navbar');
        if (lastScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Trigger parallax once on load
    updateParallax();
});
