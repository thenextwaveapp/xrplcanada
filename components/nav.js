// XRPL Canada - Shared Navigation Component
// Usage: Add <div id="site-nav"></div> where you want the nav
// Automatically detects page location and adjusts paths

function renderNav() {
    const path = window.location.pathname;

    // Detect page type based on path
    const isHome = path === '/' || path.endsWith('index.html') || path.endsWith('/');
    const isBlogPost = path.includes('/blog/') && !path.endsWith('/blog.html') && !path.endsWith('/blog/');

    // Set prefix based on location
    const prefix = isBlogPost ? '../' : '';
    
    const navHTML = `
        <nav class="site-navigation">
            <div class="nav-container">
                <button class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <a href="${prefix}index.html" class="nav-brand">
                    <img src="${prefix}public/xrpl-canada-icon.png" alt="XRPL Canada" class="nav-icon">
                </a>
                <div class="nav-links">
                    <a href="${prefix}blog.html">
                        <span class="lang-en">Blog</span>
                        <span class="lang-fr hidden">Blog</span>
                    </a>
                    <a href="${prefix}news.html">
                        <span class="lang-en">News</span>
                        <span class="lang-fr hidden">Nouvelles</span>
                    </a>
                    <a href="${prefix}about.html">
                        <span class="lang-en">About</span>
                        <span class="lang-fr hidden">À propos</span>
                    </a>
                    <a href="${prefix}resources.html">
                        <span class="lang-en">Resources</span>
                        <span class="lang-fr hidden">Ressources</span>
                    </a>
                </div>
                <button class="lang-toggle" onclick="toggleLanguage()">
                    <span class="lang-en">FR</span>
                    <span class="lang-fr hidden">EN</span>
                </button>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div class="mobile-menu-backdrop"></div>
        <div class="mobile-menu">
            <button class="mobile-menu-close">&times;</button>
            <div class="nav-links">
                <a href="${prefix}index.html">
                    <span class="lang-en">Home</span>
                    <span class="lang-fr hidden">Accueil</span>
                </a>
                <a href="${prefix}blog.html">
                    <span class="lang-en">Blog</span>
                    <span class="lang-fr hidden">Blog</span>
                </a>
                <a href="${prefix}news.html">
                    <span class="lang-en">News</span>
                    <span class="lang-fr hidden">Nouvelles</span>
                </a>
                <a href="${prefix}about.html">
                    <span class="lang-en">About</span>
                    <span class="lang-fr hidden">À propos</span>
                </a>
                <a href="${prefix}resources.html">
                    <span class="lang-en">Resources</span>
                    <span class="lang-fr hidden">Ressources</span>
                </a>
            </div>
        </div>
    `;
    
    // Replace the entire div with just the nav element
    const navContainer = document.getElementById('site-nav');
    navContainer.outerHTML = navHTML;
}

// Auto-render on page load
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('site-nav');
    if (navContainer) {
        renderNav();
        initAutoHideNav();
    }
});

// Auto-hide navigation on scroll (desktop only)
function initAutoHideNav() {
    let lastScrollTop = 0;
    let scrollThreshold = 100;
    let isScrolling;

    // Only apply on desktop
    if (window.innerWidth <= 768) return;

    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav.site-navigation');
        if (!nav) return;

        clearTimeout(isScrolling);

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class when past threshold
        if (scrollTop > scrollThreshold) {
            nav.classList.add('scrolled');

            // Hide on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                nav.classList.add('nav-hidden');
            } else {
                nav.classList.remove('nav-hidden');
            }
        } else {
            nav.classList.remove('scrolled', 'nav-hidden');
        }

        lastScrollTop = scrollTop;
    }, false);

    // Re-check on resize
    window.addEventListener('resize', function() {
        const nav = document.querySelector('nav.site-navigation');
        if (window.innerWidth <= 768 && nav) {
            nav.classList.remove('nav-hidden', 'scrolled');
        }
    });
}

