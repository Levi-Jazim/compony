// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', 
            mobileMenuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Add active class to current page link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLink = document.querySelector(`.nav-links a[href="${currentPage}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

// Hide navbar on scroll down, show on scroll up
let lastScroll = 0;
const navbar = document.querySelector('nav');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= scrollThreshold) {
        navbar.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
        // Scrolling down & menu is closed
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

const navigationLinks = [
    { name: 'Home', path: 'index.html' },
    { name: 'Projects', path: 'projects.html' },
    { name: 'Blog', path: 'blog.html' },
    { name: 'Services', path: 'services.html' },
    { name: 'Testimonials', path: 'testimonials.html' },
    { name: 'Contact', path: 'contact.html' },
];
