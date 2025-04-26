// Function to update current date
function updateDate() {
    const dateElement = document.getElementById('current-date');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = currentDate.toLocaleDateString('en-US', options);
}

// Function to create menu item HTML
function createMenuItem(item) {
    return `
        <div class="menu-item">
            <div class="item-info">
                <h3>${item.name}</h3>
                <span class="${item.type}-badge">${item.type}</span>
            </div>
            <p class="item-description">${item.description}</p>
        </div>
    `;
}

// Function to load menu items
function loadMenuItems() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'flex';

    try {
        Object.keys(menuData).forEach(mealType => {
            const container = document.getElementById(`${mealType}-items`);
            if (container) {
                container.innerHTML = menuData[mealType]
                    .map(item => createMenuItem(item))
                    .join('');
            }
        });
    } catch (error) {
        console.error('Error loading menu items:', error);
    } finally {
        if (loader) loader.style.display = 'none';
    }
}

// Dark mode functions
function setDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        updateThemeToggleButton(true);
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        updateThemeToggleButton(false);
    }
}

function updateThemeToggleButton(isDark) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Function to setup theme toggle
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            setDarkMode(!isDarkMode);
        });
    }
}

// Function to load saved theme
function loadSavedTheme() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        setDarkMode(true);
    }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Handle feedback form submission
if (document.getElementById('feedbackForm')) {
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your feedback submission logic here
        alert('Thank you for your feedback!');
        this.reset();
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing app...');
    loadSavedTheme(); // Load theme first
    if (document.getElementById('current-date')) updateDate();
    if (typeof menuData !== 'undefined') loadMenuItems();
    setupThemeToggle();
});
// Handle active nav links
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('#')[0];
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing initialization code ...
    setActiveNavLink();
});
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu variables
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle menu visibility
            navLinks.classList.toggle('active');
            // Toggle menu icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('.nav-links .nav-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Initialize dark mode
    loadSavedTheme();
});