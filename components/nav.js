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
        <nav>
            <a href="${isHome ? '#' : (isBlogPost ? '../index.html' : 'index.html')}" ${isHome ? 'onclick="window.scrollTo({top: 0, behavior: \'smooth\'}); return false;"' : 'onclick="sessionStorage.setItem(\'restoreScroll\', \'true\');"'}>
                <img src="${prefix}public/xrplcanadawhite-nobg.png" alt="XRPL Canada" class="nav-logo">
            </a>
            <div class="nav-links">
                <a href="${isHome ? '#about' : (isBlogPost ? '../index.html#about' : 'index.html#about')}">
                    <span class="lang-en">About</span>
                    <span class="lang-fr hidden">À propos</span>
                </a>
                <a href="${isHome ? '#xrpl-explained' : (isBlogPost ? '../index.html#xrpl-explained' : 'index.html#xrpl-explained')}">
                    <span class="lang-en">What is XRPL?</span>
                    <span class="lang-fr hidden">Qu'est-ce que XRPL?</span>
                </a>
                <a href="${prefix}resources.html">
                    <span class="lang-en">Resources</span>
                    <span class="lang-fr hidden">Ressources</span>
                </a>
                <a href="${prefix}news.html">
                    <span class="lang-en">News</span>
                    <span class="lang-fr hidden">Nouvelles</span>
                </a>
                <a href="${prefix}blog.html">
                    <span class="lang-en">Blog</span>
                    <span class="lang-fr hidden">Blog</span>
                </a>
                <a href="${isHome ? '#contact' : (isBlogPost ? '../index.html#contact' : 'index.html#contact')}">
                    <span class="lang-en">Contact</span>
                    <span class="lang-fr hidden">Contact</span>
                </a>
            </div>
            <button class="lang-toggle" onclick="toggleLanguage()">
                <span class="lang-en">FR</span>
                <span class="lang-fr hidden">EN</span>
            </button>
        </nav>
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
    }
});

