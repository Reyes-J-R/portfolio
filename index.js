document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // offset for sticky header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Call once on load

    // 4. Fallback for Shrinking Header (if CSS scroll-driven animations are not supported)
    if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
        const header = document.querySelector('.site-header');
        
        // CSS variables for fallback
        const initialHeight = 100;
        const finalHeight = 70;
        const scrollDistance = 150;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const scrollPercent = Math.min(1, scrollY / scrollDistance);
            const newHeight = initialHeight - (initialHeight - finalHeight) * scrollPercent;
            
            header.style.height = `${newHeight}px`;
            
            if (scrollPercent > 0) {
                header.style.boxShadow = `0 1px 2px 0 rgba(0, 0, 0, ${0.05 * scrollPercent})`;
                header.style.borderBottomColor = `rgba(229, 231, 235, ${scrollPercent})`;
            } else {
                header.style.boxShadow = 'none';
                header.style.borderBottomColor = 'transparent';
            }
        });
    }
});
