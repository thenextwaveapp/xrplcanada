// Theme Toggle for XRPL Canada Blog
(function() {
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        // Find the article meta section
        const articleMeta = document.querySelector('.article-meta, .blog-meta');

        if (articleMeta) {
            // Create theme toggle button with half-light/half-dark icon
            const themeToggle = document.createElement('button');
            themeToggle.className = 'theme-toggle';
            themeToggle.setAttribute('aria-label', 'Toggle theme');
            themeToggle.innerHTML = '<i class="ri-contrast-2-line"></i>';

            // Insert at the end of meta section
            articleMeta.appendChild(themeToggle);

            // Toggle theme
            themeToggle.addEventListener('click', function() {
                const theme = document.documentElement.getAttribute('data-theme');
                const newTheme = theme === 'light' ? 'dark' : 'light';

                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    });
})();
