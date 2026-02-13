document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');
    const navItems = document.querySelectorAll('.header__nav-item.has-children');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });
    }

    if (window.innerWidth <= 768) {
        navItems.forEach(item => {
            const link = item.querySelector('.header__nav-link');
            const dropdown = item.querySelector('.header__nav-list--second-level');

            if (link && dropdown) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const isVisible = dropdown.style.display === 'flex';

                    document.querySelectorAll('.header__nav-list--second-level').forEach(d => {
                        d.style.display = 'none';
                    });

                    dropdown.style.display = isVisible ? 'none' : 'flex';
                });
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header__container')) {
            if (menuToggle && nav.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
            }
        }
    });

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                document.querySelectorAll('.header__nav-list--second-level').forEach(d => {
                    d.style.display = '';
                });
            }
        }, 250);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    if (window.innerWidth <= 768 && nav.classList.contains('active')) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                        nav.classList.remove('active');
                    }
                }
            }
        });
    });

    const searchButtons = document.querySelectorAll('.header__search-toggle');
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
        });
    });
});

function showNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }
}

const indexTaglines = [
    "Keeping everyone safe.",
    "Changing how safety stands.",
    "Making the world safer.",
    "Always free. Forever.",
    "Never stopping. Ever.",
    "Built by founders who never quit.",
    "Protecting the next generation.",
    "Safety without compromise.",
    "Community first. Always.",
    "Here for the long haul."
];

const aboutTaglines = [
    "Building a Safer Community",
    "Working with Law Enforcement",
    "Here for the Community",
    "Protecting Gamers Worldwide",
    "Fighting Scams Together",
    "Your Safety, Our Priority",
    "Trusted by the Community",
    "Community-Driven Protection",
    "Making Gaming Safer",
    "Standing Against Threats"
];

const donateTaglines = [
    "Support RoSecure",
    "Help Us Protect Others",
    "Protecting The Next Generation",
    "Fuel Our Mission",
    "Every Donation Matters",
    "Keep The Lights On",
    "Empower Community Safety",
    "Stand With Us",
    "Make A Difference Today",
    "Help Us Help Others"
];

const teamTaglines = [
    "Our Team",
    "Our Heroes",
    "The Guardians",
    "Safety Champions",
    "Community Protectors",
    "The Defenders",
    "Dedicated Volunteers",
    "Behind The Scenes",
    "Our Foundation",
    "The People Who Care"
];

let currentIndexTaglineIndex = 0;
let currentTaglineIndex = 0;
let currentDonateTaglineIndex = 0;
let currentTeamTaglineIndex = 0;

function initIndexRotatingTagline() {
    const taglineElement = document.getElementById('hero-tagline-text');
    if (!taglineElement) return;

    setInterval(() => {
        taglineElement.style.opacity = '0';
        taglineElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            currentIndexTaglineIndex = (currentIndexTaglineIndex + 1) % indexTaglines.length;
            taglineElement.textContent = indexTaglines[currentIndexTaglineIndex];
            taglineElement.style.opacity = '1';
            taglineElement.style.transform = 'translateY(0)';
        }, 300);
    }, 4000);
}

function initRotatingTagline() {
    const taglineElement = document.querySelector('.about-hero-title');
    if (!taglineElement) return;

    setInterval(() => {
        taglineElement.style.opacity = '0';
        taglineElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            currentTaglineIndex = (currentTaglineIndex + 1) % aboutTaglines.length;
            taglineElement.textContent = aboutTaglines[currentTaglineIndex];
            taglineElement.style.opacity = '1';
            taglineElement.style.transform = 'translateY(0)';
        }, 300);
    }, 4000);
}

function initDonateRotatingTagline() {
    const taglineElement = document.querySelector('.donate-hero-title');
    if (!taglineElement) return;

    setInterval(() => {
        taglineElement.style.opacity = '0';
        taglineElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            currentDonateTaglineIndex = (currentDonateTaglineIndex + 1) % donateTaglines.length;
            taglineElement.textContent = donateTaglines[currentDonateTaglineIndex];
            taglineElement.style.opacity = '1';
            taglineElement.style.transform = 'translateY(0)';
        }, 300);
    }, 4000);
}

function initTeamRotatingTagline() {
    const taglineElement = document.getElementById('team-hero-title');
    if (!taglineElement) return;

    setInterval(() => {
        taglineElement.style.opacity = '0';
        taglineElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            currentTeamTaglineIndex = (currentTeamTaglineIndex + 1) % teamTaglines.length;
            taglineElement.textContent = teamTaglines[currentTeamTaglineIndex];
            taglineElement.style.opacity = '1';
            taglineElement.style.transform = 'translateY(0)';
        }, 300);
    }, 4000);
}

document.addEventListener('DOMContentLoaded', function() {
    initIndexRotatingTagline();
    initRotatingTagline();
    initDonateRotatingTagline();
    initTeamRotatingTagline();
});

function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    if (!isActive) {
        faqItem.classList.add('active');
    }
}

