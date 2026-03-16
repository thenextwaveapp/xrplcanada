// XRPL Canada - Shared Footer Component
// Usage: Add <div id="site-footer"></div> where you want the footer
// Automatically detects page location and adjusts paths

function injectFooterStyles() {
    // Check if styles already injected
    if (document.getElementById('footer-styles')) {
        return;
    }

    const styleTag = document.createElement('style');
    styleTag.id = 'footer-styles';
    styleTag.textContent = `
        footer {
            background: linear-gradient(180deg, var(--black-light) 0%, var(--black) 100%);
            border-top: 1px solid rgba(255, 23, 68, 0.1);
            padding: 60px 20px 40px;
        }

        .footer-content {
            max-width: 1280px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
            gap: 48px;
            margin-bottom: 40px;
        }

        .footer-section h3 {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 20px;
            letter-spacing: 0.3px;
        }

        .footer-section ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .footer-section ul li {
            margin-bottom: 12px;
        }

        .footer-section ul li a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 15px;
            transition: color 0.3s ease;
        }

        .footer-section ul li a:hover {
            color: var(--primary-red);
        }

        .footer-logo {
            font-size: 28px;
            font-weight: 800;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 16px;
        }

        .footer-description {
            color: var(--text-secondary);
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 24px;
        }

        .footer-social {
            display: flex;
            gap: 16px;
        }

        .footer-social a {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            color: var(--text-primary);
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .footer-social a:hover {
            background: var(--primary-red);
            color: var(--white);
            transform: translateY(-4px);
        }

        .footer-social-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        .footer-newsletter-link {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            padding: 10px 16px;
            color: var(--text-secondary);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
        }

        .footer-newsletter-link:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-primary);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .footer-bottom {
            max-width: 1280px;
            margin: 0 auto;
            padding-top: 32px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            text-align: center;
            color: var(--text-tertiary);
            font-size: 14px;
        }

        @media (max-width: 1024px) {
            .footer-content {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .footer-content {
                grid-template-columns: 1fr;
                gap: 32px;
            }
        }

        /* Newsletter Modal Styles - Scoped to avoid conflicts */
        #newsletterModal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        #newsletterModal.active {
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
        }

        #newsletterModal .newsletter-modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        #newsletterModal .newsletter-modal-content {
            position: relative;
            background: #0A0A0A;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 48px;
            max-width: 540px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: scale(0.9);
            transition: transform 0.3s ease;
            z-index: 2001;
        }

        #newsletterModal.active .newsletter-modal-content {
            transform: scale(1);
        }

        [data-theme="light"] #newsletterModal .newsletter-modal-content {
            background: #FFFFFF;
            border-color: rgba(0, 0, 0, 0.1);
        }

        #newsletterModal .newsletter-modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 32px;
            line-height: 1;
            cursor: pointer;
            padding: 8px;
            transition: color 0.3s ease;
            font-weight: 300;
        }

        #newsletterModal .newsletter-modal-close:hover {
            color: var(--primary-red);
        }

        #newsletterModal .newsletter-modal-header h2 {
            font-size: 32px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 16px;
            line-height: 1.2;
        }

        #newsletterModal .newsletter-modal-header p {
            font-size: 16px;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 32px;
        }

        #newsletterModal .newsletter-form-group {
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
        }

        #newsletterModal .newsletter-modal-input {
            flex: 1;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 16px 20px;
            font-size: 16px;
            color: var(--text-primary);
            outline: none;
            transition: all 0.3s ease;
        }

        [data-theme="light"] #newsletterModal .newsletter-modal-input {
            background: rgba(0, 0, 0, 0.03);
            border-color: rgba(0, 0, 0, 0.1);
        }

        #newsletterModal .newsletter-modal-input:focus {
            border-color: var(--primary-red);
            background: rgba(255, 255, 255, 0.08);
        }

        [data-theme="light"] #newsletterModal .newsletter-modal-input:focus {
            background: rgba(0, 0, 0, 0.05);
        }

        #newsletterModal .newsletter-modal-input::placeholder {
            color: var(--text-tertiary);
        }

        #newsletterModal .newsletter-modal-btn {
            background: linear-gradient(135deg, #FF1744 0%, #C51162 100%);
            border: none;
            border-radius: 12px;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 600;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        #newsletterModal .newsletter-modal-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 23, 68, 0.3);
        }

        #newsletterModal .newsletter-modal-btn:active {
            transform: translateY(0);
        }

        #newsletterModal .newsletter-modal-note {
            font-size: 13px;
            color: var(--text-tertiary);
            text-align: center;
            margin: 0;
        }

        #newsletterModal .newsletter-success {
            text-align: center;
            padding: 40px 0;
        }

        #newsletterModal .newsletter-success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #FF1744 0%, #C51162 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
            margin: 0 auto 24px;
            animation: newsletterSuccessPop 0.5s ease;
        }

        @keyframes newsletterSuccessPop {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        #newsletterModal .newsletter-success h3 {
            font-size: 28px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 12px;
        }

        #newsletterModal .newsletter-success p {
            font-size: 16px;
            color: var(--text-secondary);
        }

        @media (max-width: 600px) {
            #newsletterModal .newsletter-modal-content {
                padding: 32px 24px;
            }

            #newsletterModal .newsletter-modal-header h2 {
                font-size: 24px;
            }

            #newsletterModal .newsletter-form-group {
                flex-direction: column;
            }

            #newsletterModal .newsletter-modal-btn {
                width: 100%;
            }
        }
    `;

    document.head.appendChild(styleTag);
}

// Global modal functions
window.openNewsletterModal = function() {
    const modal = document.getElementById('newsletterModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.classList.add('newsletter-modal-open');
    }
};

window.closeNewsletterModal = function() {
    const modal = document.getElementById('newsletterModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.classList.remove('newsletter-modal-open');
        }, 300);
    }
};

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        window.closeNewsletterModal();
    }
});

function renderFooter() {
    const path = window.location.pathname;

    // Detect page type based on path
    const isBlogPost = path.includes('/blog/') && !path.endsWith('/blog.html') && !path.endsWith('/blog/');

    // Set prefix based on location
    const prefix = isBlogPost ? '../' : '';

    const footerHTML = `
        <footer>
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">XRPL Canada 🍁</div>
                    <p class="footer-description">
                        <span class="lang-en">Building the Internet of Value in Canada. A community-driven hub for developers, entrepreneurs, and institutions.</span>
                        <span class="lang-fr hidden">Construire l'Internet de la valeur au Canada. Un hub communautaire pour développeurs, entrepreneurs et institutions.</span>
                    </p>
                    <div class="footer-social-row">
                        <div class="footer-social">
                            <a href="https://twitter.com/XRPLCanada" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                                <i class="ri-twitter-x-line"></i>
                            </a>
                        </div>
                        <button onclick="openNewsletterModal()" class="footer-newsletter-link">
                            <span class="lang-en">Join Newsletter</span>
                            <span class="lang-fr hidden">Rejoindre l'infolettre</span>
                        </button>
                    </div>
                </div>

                <div class="footer-section">
                    <h3><span class="lang-en">Navigate</span><span class="lang-fr hidden">Navigation</span></h3>
                    <ul>
                        <li><a href="${prefix}index.html"><span class="lang-en">Home</span><span class="lang-fr hidden">Accueil</span></a></li>
                        <li><a href="${prefix}blog.html"><span class="lang-en">Blog</span><span class="lang-fr hidden">Blog</span></a></li>
                        <li><a href="${prefix}news.html"><span class="lang-en">News</span><span class="lang-fr hidden">Nouvelles</span></a></li>
                        <li><a href="${prefix}resources.html"><span class="lang-en">Resources</span><span class="lang-fr hidden">Ressources</span></a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3><span class="lang-en">About</span><span class="lang-fr hidden">À propos</span></h3>
                    <ul>
                        <li><a href="${prefix}about.html#about"><span class="lang-en">Our Mission</span><span class="lang-fr hidden">Notre mission</span></a></li>
                        <li><a href="${prefix}about.html#xrpl-explained"><span class="lang-en">What is XRPL?</span><span class="lang-fr hidden">Qu'est-ce que XRPL?</span></a></li>
                        <li><a href="${prefix}about.html#contact"><span class="lang-en">Contact Us</span><span class="lang-fr hidden">Contactez-nous</span></a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3><span class="lang-en">Learn</span><span class="lang-fr hidden">Apprendre</span></h3>
                    <ul>
                        <li><a href="https://xrpl.org/docs" target="_blank" rel="noopener noreferrer"><span class="lang-en">Documentation</span><span class="lang-fr hidden">Documentation</span></a></li>
                        <li><a href="https://xrpl.org/" target="_blank" rel="noopener noreferrer"><span class="lang-en">XRPL.org</span><span class="lang-fr hidden">XRPL.org</span></a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3><span class="lang-en">Community</span><span class="lang-fr hidden">Communauté</span></h3>
                    <ul>
                        <li><a href="${prefix}index.html#events"><span class="lang-en">Events</span><span class="lang-fr hidden">Événements</span></a></li>
                        <li><a href="https://twitter.com/XRPLCanada" target="_blank" rel="noopener noreferrer"><span class="lang-en">Follow on X</span><span class="lang-fr hidden">Suivez sur X</span></a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <span class="lang-en">© 2025 XRPL Canada. All rights reserved. Building the Internet of Value in Canada.</span>
                <span class="lang-fr hidden">© 2025 XRPL Canada. Tous droits réservés. Construire l'Internet de la valeur au Canada.</span>
            </div>
        </footer>

        <!-- Newsletter Modal -->
        <div id="newsletterModal" class="newsletter-modal">
            <div class="newsletter-modal-backdrop" onclick="closeNewsletterModal()"></div>
            <div class="newsletter-modal-content">
                <button class="newsletter-modal-close" onclick="closeNewsletterModal()">&times;</button>
                <div class="newsletter-modal-header">
                    <h2>
                        <span class="lang-en">Stay Updated</span>
                        <span class="lang-fr hidden">Restez Informé</span>
                    </h2>
                    <p>
                        <span class="lang-en">Get weekly insights on XRPL development, Canadian blockchain policy, and ecosystem updates delivered to your inbox.</span>
                        <span class="lang-fr hidden">Recevez des perspectives hebdomadaires sur le développement XRPL, la politique blockchain canadienne et les mises à jour de l'écosystème dans votre boîte de réception.</span>
                    </p>
                </div>
                <form id="newsletterForm" class="newsletter-modal-form" action="https://formspree.io/f/mrezqwlj" method="POST">
                    <input type="hidden" name="_subject" value="Newsletter Subscription">
                    <div class="newsletter-form-group">
                        <input type="email" name="email" class="newsletter-modal-input" placeholder="Enter your email" required>
                        <button type="submit" class="newsletter-modal-btn">
                            <span class="lang-en">Subscribe</span>
                            <span class="lang-fr hidden">S'abonner</span>
                        </button>
                    </div>
                    <p class="newsletter-modal-note">
                        <span class="lang-en">Free forever. Unsubscribe anytime.</span>
                        <span class="lang-fr hidden">Gratuit pour toujours. Désabonnez-vous à tout moment.</span>
                    </p>
                </form>
                <div id="newsletterSuccess" class="newsletter-success" style="display: none;">
                    <div class="newsletter-success-icon">✓</div>
                    <h3>
                        <span class="lang-en">You're In!</span>
                        <span class="lang-fr hidden">C'est fait!</span>
                    </h3>
                    <p>
                        <span class="lang-en">Check your inbox for a confirmation email.</span>
                        <span class="lang-fr hidden">Vérifiez votre boîte de réception pour un email de confirmation.</span>
                    </p>
                </div>
            </div>
        </div>
    `;

    // Replace the entire div with the footer element
    const footerContainer = document.getElementById('site-footer');
    if (footerContainer) {
        footerContainer.outerHTML = footerHTML;

        // Add modal event listeners after rendering
        setTimeout(() => {
            const form = document.getElementById('newsletterForm');
            if (form) {
                form.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const formData = new FormData(form);

                    try {
                        const response = await fetch(form.action, {
                            method: 'POST',
                            body: formData,
                            headers: { 'Accept': 'application/json' }
                        });

                        if (response.ok) {
                            form.style.display = 'none';
                            document.getElementById('newsletterSuccess').style.display = 'block';

                            setTimeout(() => {
                                closeNewsletterModal();
                                setTimeout(() => {
                                    form.reset();
                                    form.style.display = 'block';
                                    document.getElementById('newsletterSuccess').style.display = 'none';
                                }, 300);
                            }, 3000);
                        }
                    } catch (error) {
                        console.error('Error submitting form:', error);
                    }
                });
            }
        }, 100);
    }
}

// Auto-render on page load
document.addEventListener('DOMContentLoaded', function() {
    // Inject styles first
    injectFooterStyles();

    // Then render footer
    const footerContainer = document.getElementById('site-footer');
    if (footerContainer) {
        renderFooter();
        
    }
});
