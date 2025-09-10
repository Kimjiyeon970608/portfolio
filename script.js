// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Page load animations
window.addEventListener('load', () => {
    // Navbar animation
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    // Hero section animations
    gsap.from('.hero-categories .category', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power2.out'
    });

    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out'
    });

    gsap.from('.location', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.9,
        ease: 'power2.out'
    });

    gsap.from('.main-image', {
        scale: 0.9,
        duration: 1.2,
        delay: 0.4,
        ease: 'power2.out'
    });
});

// Scroll-triggered animations
ScrollTrigger.create({
    trigger: '.about',
    start: 'top 80%',
    onEnter: () => {
        gsap.from('.about .section-title', {
            x: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out'
        });

        gsap.from('.about-description', {
            y: -100,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power2.out'
        });

        gsap.from('.contact-btn', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out'
        });

        gsap.from('.about-img-1, .about-img-2', {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.4,
            ease: 'power2.out'
        });
    }
});

ScrollTrigger.create({
    trigger: '.projects',
    start: 'top 80%',
    onEnter: () => {
        gsap.from('.projects .section-title', {
            x: -100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out'
        });

        gsap.from('.project-card', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.3,
            ease: 'power2.out'
        });
    }
});

ScrollTrigger.create({
    trigger: '.footer',
    start: 'top 80%',
    onEnter: () => {
        gsap.from('.footer .section-title', {
            x: -100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out'
        });

        gsap.from('.footer-text', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power2.out'
        });
    }
});

// Parallax effect for main image
gsap.to('.main-image', {
    y: -50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// Parallax effect for about images
gsap.to('.about-img-1, .about-img-2', {
    y: -30,
    ease: 'none',
    scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// Project card hover animations
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Menu toggle animation
const menuToggle = document.querySelector('.menu-toggle');
let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    const spans = menuToggle.querySelectorAll('span');
    
    if (!isMenuOpen) {
        gsap.to(spans[0], { rotation: 45, y: 5, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, duration: 0.3 });
        gsap.to(spans[2], { rotation: -45, y: -5, duration: 0.3 });
        isMenuOpen = true;
    } else {
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        isMenuOpen = false;
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: 'power2.inOut'
            });
        }
    });
});

// Navbar background opacity on scroll
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: '.navbar' }
});

// Add CSS for scrolled navbar
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background: rgba(245, 245, 245, 0.98);
        backdrop-filter: blur(15px);
    }
`;
document.head.appendChild(style);

// Image lazy loading optimization
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = () => {
                gsap.to(img, { opacity: 1, duration: 0.5 });
            };
            
            if (img.complete) {
                gsap.to(img, { opacity: 1, duration: 0.5 });
            }
            
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Performance optimization: Reduce scroll trigger calculations on slower devices
if (window.devicePixelRatio < 2) {
    ScrollTrigger.config({ limitCallbacks: true });
}