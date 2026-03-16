// Mobile Navigation Menu Toggle
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        const closeBtn = document.querySelector('.mobile-menu-close');
        const mobileLinks = document.querySelectorAll('.mobile-menu .nav-links a');

        function closeMenu() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }

        if (hamburger && mobileMenu && backdrop) {
            // Toggle menu on hamburger click
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                backdrop.classList.toggle('active');
                document.body.classList.toggle('mobile-menu-open', mobileMenu.classList.contains('active'));
            });

            // Close menu on X button click
            if (closeBtn) {
                closeBtn.addEventListener('click', closeMenu);
            }

            // Close menu on backdrop click
            backdrop.addEventListener('click', closeMenu);

            // Close menu on link click
            mobileLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        }
    });
})();
