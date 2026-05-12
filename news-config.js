// ============================================
// XRPL Canada News Aggregator Configuration
// ============================================

// API Keys (replace with your actual keys)
const NEWS_CONFIG = {
    newsApiKey: 'YOUR_NEWSAPI_KEY_HERE', // Get free key at: https://newsapi.org
    cryptoPanicKey: 'YOUR_CRYPTOPANIC_KEY_HERE', // Get free key at: https://cryptopanic.com/developers/api/
};

// Manual Curated News Entries
// Add important stories here that you want to highlight
const MANUAL_NEWS = [
    {
        title: "XRP ETFs Launch in Canada - First in North America",
        excerpt: "Purpose Investments, 3iQ, and Evolve launched the first North American spot XRP ETFs on the Toronto Stock Exchange, beating U.S. markets to the punch.",
        category: "etf", // Options: etf, acquisition, regulation, technology, partnership, general
        source: "XRPL Canada",
        sourceIcon: "🍁",
        url: "#",
        timestamp: new Date("2025-06-18"),
        isManual: true
    },
    {
        title: "Ripple Acquires Hidden Road for $1.25 Billion",
        excerpt: "Ripple becomes the first crypto company to own a global, multi-asset prime broker with this landmark acquisition.",
        category: "acquisition",
        source: "Ripple Official",
        sourceIcon: "📢",
        url: "https://ripple.com/insights/ripple-closes-hidden-road-acquisition",
        timestamp: new Date("2025-10-15"),
        isManual: true
    },
    {
        title: "SEC Drops XRP Lawsuit Appeal",
        excerpt: "In a major regulatory victory, the SEC withdrew its appeal in the Ripple case, providing unprecedented clarity for XRP and the broader crypto industry.",
        category: "regulation",
        source: "Ripple Official",
        sourceIcon: "⚖️",
        url: "https://ripple.com",
        timestamp: new Date("2025-03-19"),
        isManual: true
    },
    {
        title: "Bitwise XRP ETF Launches on NYSE with $206M in Assets",
        excerpt: "The Bitwise XRP ETF (Ticker: XRP) begins trading on NYSE Arca, marking a major milestone for institutional XRP adoption in the United States.",
        category: "etf",
        source: "Bitwise",
        sourceIcon: "📈",
        url: "https://bitxrpetf.com",
        timestamp: new Date("2025-11-19"),
        isManual: true
    },
    {
        title: "Ripple Acquires Palisade to Expand Custody Solutions",
        excerpt: "Ripple adds digital asset wallet and custody capabilities through the acquisition of Palisade, targeting fintechs, crypto-native firms, and corporates.",
        category: "acquisition",
        source: "Ripple Official",
        sourceIcon: "🔐",
        url: "https://ripple.com/ripple-press/ripple-acquires-palisade-to-offer-comprehensive-digital-asset-custody-solution/",
        timestamp: new Date("2025-11-08"),
        isManual: true
    },
    {
        title: "XRPL Smart Contracts: Hooks Amendment Advances",
        excerpt: "The Hooks amendment brings smart contract functionality to XRPL, enabling developers to build complex DeFi applications while maintaining the ledger's speed and efficiency.",
        category: "technology",
        source: "XRPL.org",
        sourceIcon: "⚙️",
        url: "https://xrpl.org",
        timestamp: new Date("2025-09-15"),
        isManual: true
    }
];

// ============================================
// HOW TO ADD A NEW MANUAL NEWS ENTRY:
// ============================================
// 1. Copy the template below
// 2. Fill in all the fields
// 3. Add it to the MANUAL_NEWS array above
// 4. Save this file
// 5. Refresh your website!

/*
TEMPLATE:
{
    title: "Your News Title Here",
    excerpt: "A brief 1-2 sentence description of the news story.",
    category: "etf", // Choose: etf, acquisition, regulation, technology, partnership, or general
    source: "Source Name",
    sourceIcon: "📰", // Any emoji that represents the source
    url: "https://link-to-article.com",
    timestamp: new Date("2025-12-20"), // Format: YYYY-MM-DD
    isManual: true
}
*/

// ============================================
// AUTO-REFRESH SETTINGS
// ============================================
const REFRESH_SETTINGS = {
    enabled: false, // Set to true to enable auto-refresh by default
    intervalMinutes: 5, // How often to refresh (in minutes)
};

// ============================================
// CATEGORY KEYWORDS (for auto-categorization)
// ============================================
// The system uses these keywords to automatically categorize API news
const CATEGORY_KEYWORDS = {
    etf: ['etf', 'exchange-traded fund', 'sec approval', 'institutional', 'grayscale', 'bitwise'],
    acquisition: ['acquisition', 'acquires', 'buys', 'merger', 'purchase', 'acquired'],
    regulation: ['sec', 'regulation', 'regulatory', 'lawsuit', 'legal', 'compliance', 'court'],
    technology: ['xrpl', 'ledger', 'blockchain', 'protocol', 'upgrade', 'development', 'hooks', 'smart contract'],
    partnership: ['partnership', 'partners with', 'collaboration', 'integration', 'announces partnership']
};

// Export configuration (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NEWS_CONFIG,
        MANUAL_NEWS,
        REFRESH_SETTINGS,
        CATEGORY_KEYWORDS
    };
}




