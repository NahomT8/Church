// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const announcementSlider = document.querySelector('.announcement-slider');

// Announcements Data
const announcements = [
    { title: 'Sunday Service', message: 'Join us this Sunday at 8:00 AM' },
    { title: 'Special Event', message: 'Annual Church Festival this weekend' },
    { title: 'Prayer Meeting', message: 'Wednesday evening prayer at 7:00 PM' }
];

// Navigation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Spy & Navbar Color Change
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Determine scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down & past the threshold
        navbar.classList.add('hidden');
        navbar.classList.remove('visible');
    } else {
        // Scrolling up or at the top
        navbar.classList.remove('hidden');
        navbar.classList.add('visible');
    }
    
    lastScroll = currentScroll;

    // Scroll spy
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Announcement Slider
function createAnnouncementSlider() {
    let currentIndex = 0;
    
    function updateSlider() {
        const announcement = announcements[currentIndex];
        announcementSlider.innerHTML = `
            <div class="announcement fade-in">
                <h3>${announcement.title}</h3>
                <p>${announcement.message}</p>
            </div>
        `;
        
        currentIndex = (currentIndex + 1) % announcements.length;
    }

    updateSlider();
    setInterval(updateSlider, 5000);
}

// Scroll Animation
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    elements.forEach(element => observer.observe(element));
}

// Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 100);
}

// Calendar Events
function initializeCalendar() {
    const calendar = document.querySelector('.calendar-view');
    if (!calendar) return;

    const events = [
        { date: '2024-03-15', title: 'Sunday Service', time: '8:00 AM' },
        { date: '2024-03-20', title: 'Prayer Meeting', time: '7:00 PM' },
        // Add more events as needed
    ];

    // Calendar implementation here
    // You can use a library like FullCalendar or implement a custom solution
}

// Live Stream
function initializeLiveStream() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;

    // Add your live stream embed code here
    videoContainer.innerHTML = `
        <div class="video-wrapper">
            <!-- Add your video embed code here -->
        </div>
    `;
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    createAnnouncementSlider();
    handleScrollAnimation();
    initializeCalendar();
    initializeLiveStream();
});

// Utility Functions
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add smooth loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

