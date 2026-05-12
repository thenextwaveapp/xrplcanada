(function () {

    // ── Span-based toggle (nav, footer, hardcoded UI) ──────────────────────
    function applyLanguage(lang) {
        document.querySelectorAll('.lang-en').forEach(el => {
            el.classList.toggle('hidden', lang !== 'en');
        });
        document.querySelectorAll('.lang-fr').forEach(el => {
            el.classList.toggle('hidden', lang !== 'fr');
        });
        document.documentElement.lang = lang;
        localStorage.setItem('xrplcanada_lang', lang);
    }

    // ── Google Translate trigger (blog article body) ────────────────────────
    function triggerGoogleTranslate(lang) {
        var select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = lang === 'fr' ? 'fr' : '';
            select.dispatchEvent(new Event('change'));
        }
    }

    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'fr',
            autoDisplay: false,
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    };

    // ── Toggle handler ──────────────────────────────────────────────────────
    window.toggleLanguage = function () {
        const current = localStorage.getItem('xrplcanada_lang') || 'en';
        const next = current === 'en' ? 'fr' : 'en';
        applyLanguage(next);
        // On article pages, also run Google Translate on the body content
        if (document.querySelector('.article-container')) {
            triggerGoogleTranslate(next);
        }
    };

    // ── Init ────────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {

        // Restore saved language preference
        const saved = localStorage.getItem('xrplcanada_lang');
        if (saved && saved !== 'en') applyLanguage(saved);

        // On article pages: inject Google Translate widget (hidden) and restore
        if (document.querySelector('.article-container')) {
            var div = document.createElement('div');
            div.id = 'google_translate_element';
            div.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;';
            document.body.appendChild(div);

            var script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);

            // If language was already set to FR, re-apply after widget loads
            if (saved === 'fr') {
                var attempts = 0;
                var retry = setInterval(function () {
                    attempts++;
                    if (document.querySelector('.goog-te-combo') || attempts > 20) {
                        clearInterval(retry);
                        if (saved === 'fr') triggerGoogleTranslate('fr');
                    }
                }, 300);
            }
        }
    });
})();
