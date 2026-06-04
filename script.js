// ============================================
// PORTFOLIO FILTER FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'todos') {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    if (item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Initialize with "todos" filter active
    filterButtons[0].classList.add('active');
});

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVBAR ACTIVE STATE ON SCROLL
// ============================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PORTFOLIO ITEM HOVER EFFECT
// ============================================

const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation on scroll
document.querySelectorAll('.service-card, .stat, .software-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const navbarMenu = document.querySelector('.navbar-menu');
const navbarLogo = document.querySelector('.navbar-logo');

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (navbarMenu) {
            navbarMenu.classList.remove('active');
        }
    });
});

// ============================================
// SCROLL TO TOP FUNCTIONALITY
// ============================================

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const navbar = document.querySelector('.navbar');

    if (scrollPosition > 100) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// EXTERNAL LINKS TRACKING
// ============================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('External link clicked:', this.href);
    });
});

// ============================================
// FORM VALIDATION (if needed in future)
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// ============================================
// INITIALIZATION
// ============================================

console.log('Portfolio script loaded successfully');
