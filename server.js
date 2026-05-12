const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Parser = require('rss-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const parser = new Parser({
    customFields: {
        item: ['description', 'content:encoded']
    }
});

// Cache configuration
let newsCache = {
    data: [],
    lastFetch: null,
    isFetching: false
};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// NewsAPI Configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY || '7bd5ff41d2db4cfab7c6e361e70aa4cb';

// CryptoPanic API Configuration
const CRYPTOPANIC_KEY = process.env.CRYPTOPANIC_KEY || '4cfbbde0e5a40ee5f60abec2c3306335b893a776';

// Approved domains whitelist - ONLY REAL NEWS SITES
const APPROVED_DOMAINS = [
    // Major Crypto News Sites
    'decrypt.co',
    'cryptopotato.com',
    'theblock.co',
    'coindesk.com',
    'cointelegraph.com',
    'u.today',
    'newsbtc.com',
    'cryptonews.com',
    'bitcoinist.com',
    'ambcrypto.com',
    'cryptoslate.com',
    'beincrypto.com',
    'coinjournal.net',
    'coinspeaker.com',
    'cryptobriefing.com',
    'dailyhodl.com',
    'cryptoglobe.com',
    
    // Mainstream Financial News
    'finance.yahoo.com',
    'bloomberg.com',
    'reuters.com',
    'cnbc.com',
    'forbes.com',
    'businessinsider.com',
    'wsj.com',
    'ft.com',
    'marketwatch.com',
    
    // Tech News Sites
    'techcrunch.com',
    'theverge.com',
    'wired.com',
    'venturebeat.com',
    
    // Blockchain/DeFi Specific
    'thedefiant.io',
    'dlnews.com',
    'blockworks.co'
];

// Blocked domains - spam, aggregators, and irrelevant sites
const BLOCKED_DOMAINS = [
    'biztoc.com',
    'pypi.org',
    'risbb.to',
    'metalinjection.net',
    'metal-injection.net'
];

// Check if URL is from blocked domain
function isBlockedDomain(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');
        const isBlocked = BLOCKED_DOMAINS.some(domain => hostname.includes(domain));
        if (isBlocked) {
            console.log(`🚫 Blocked: ${hostname}`);
        }
        return isBlocked;
    } catch (error) {
        console.log(`⚠️ Invalid URL: ${url}`);
        return false;
    }
}

// Check if URL is from approved domain
function isApprovedDomain(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');
        return APPROVED_DOMAINS.some(domain => hostname.includes(domain));
    } catch (error) {
        return false;
    }
}

// Check if article contains XRP or Ripple keywords (BROAD)
function containsXRPKeywords(title, description) {
    const text = `${title} ${description}`.toLowerCase();
    
    // Comprehensive XRP ecosystem keywords
    const keywords = [
        // Core
        'xrp', 'ripple', 'xrpl',
        
        // Company & Leadership
        'ripple labs', 'brad garlinghouse', 'garlinghouse',
        
        // Products & Services
        'rlusd', 'ripplenet', 'ripple usd', 'ripple stablecoin',
        
        // Financial Products
        'xrp etf', 'spot xrp', 'xrp trust', 'xrp treasury',
        'grayscale xrp', 'franklin xrp', 'bitwise xrp',
        
        // Technology
        'xrp ledger', 'xrpl', 'xrp defi', 'xrp staking',
        'wrapped xrp', 'stxrp', 'xrp liquidity',
        
        // Ecosystem & Partners
        'flare network', 'firelight', 'hex trust',
        'wormhole xrp', 'chainlink xrp',
        
        // Use Cases
        'cross-border xrp', 'xrp payments', 'xrp settlement',
        'xrp remittance', 'xrp bridge', 'xrp corridor',
        
        // Market & Trading
        'xrp price', 'xrp rally', 'xrp volume',
        'xrp market', 'xrp trading', 'xrp surge',
        
        // Legal & Regulatory
        'ripple sec', 'xrp lawsuit', 'xrp securities',
        'ripple settlement', 'xrp clarity',
        
        // Adoption & Integration
        'bank ripple', 'institution xrp', 'central bank xrp',
        'cbdc ripple', 'ripple partnership', 'ripple integration',
        
        // Events & Initiatives
        'swell ripple', 'xrp community', 'attackathon',
        
        // Related Entities
        'evernorth', 'sbi ripple', 'ripple asia',
        'metaco ripple', 'hidden road ripple',
        'fortress trust ripple', 'standard custody ripple'
    ];
    
    return keywords.some(keyword => text.includes(keyword));
}

// Function to fetch news (called on startup and periodically)
async function fetchNewsData() {
    if (newsCache.isFetching) {
        console.log('⏳ Already fetching news...');
        return;
    }
    
    newsCache.isFetching = true;
    console.log('📡 Fetching XRP/Ripple news...');
    
    try {
        const articles = [];
        
        // Fetch from NewsAPI
        if (NEWS_API_KEY && NEWS_API_KEY !== 'YOUR_NEWSAPI_KEY_HERE') {
            try {
                const newsApiUrl = `https://newsapi.org/v2/everything?q=(XRP OR Ripple OR "XRP Ledger" OR XRPL OR "Brad Garlinghouse" OR RLUSD OR RippleNet OR "XRP ETF")&sortBy=publishedAt&language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
                const newsApiResponse = await axios.get(newsApiUrl);
                
                const newsApiArticles = newsApiResponse.data.articles
                    .filter(article => {
                        if (isBlockedDomain(article.url)) return false;
                        if (!containsXRPKeywords(article.title, article.description || '')) return false;
                        return true;
                    })
                    .map(article => ({
                        title: article.title,
                        excerpt: article.description || article.content?.substring(0, 200) || '',
                        url: article.url,
                        source: article.source.name,
                        timestamp: article.publishedAt,
                        isManual: false
                    }));
                
                articles.push(...newsApiArticles);
                console.log(`✅ NewsAPI: ${newsApiArticles.length} approved articles`);
            } catch (error) {
                console.error('❌ NewsAPI error:', error.message);
            }
        }
        
        // Fetch from CryptoPanic
        if (CRYPTOPANIC_KEY && CRYPTOPANIC_KEY !== 'YOUR_CRYPTOPANIC_KEY_HERE') {
            try {
                const cryptoPanicUrl = `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${CRYPTOPANIC_KEY}&currencies=XRP&public=true&filter=hot`;
                const cryptoPanicResponse = await axios.get(cryptoPanicUrl);
                
                const cryptoPanicArticles = cryptoPanicResponse.data.results
                    .filter(post => {
                        if (isBlockedDomain(post.url)) return false;
                        if (!containsXRPKeywords(post.title, post.description || '')) return false;
                        return true;
                    })
                    .map(post => ({
                        title: post.title,
                        excerpt: post.description || post.title,
                        url: post.url,
                        source: post.source.title,
                        timestamp: post.published_at,
                        isManual: false
                    }));
                
                articles.push(...cryptoPanicArticles);
                console.log(`✅ CryptoPanic: ${cryptoPanicArticles.length} approved articles`);
            } catch (error) {
                console.error('❌ CryptoPanic error:', error.message);
            }
        }
        
        // Fetch from RSS Feeds
        const RSS_FEEDS = [
            'https://cointelegraph.com/rss/tag/xrp',
            'https://u.today/rss',
            'https://cryptopotato.com/feed/',
            'https://www.newsbtc.com/feed/',
            'https://cryptoslate.com/feed/',
            'https://dailyhodl.com/feed/',
            'https://decrypt.co/feed',
            'https://ambcrypto.com/feed/'
        ];
        
        for (const feedUrl of RSS_FEEDS) {
            try {
                const feed = await parser.parseURL(feedUrl);
                
                const rssArticles = feed.items
                    .filter(item => {
                        if (isBlockedDomain(item.link)) return false;
                        const content = item.contentSnippet || item.content || item.description || '';
                        if (!containsXRPKeywords(item.title, content)) return false;
                        return true;
                    })
                    .map(item => ({
                        title: item.title,
                        excerpt: (item.contentSnippet || item.content || item.description || '').substring(0, 200),
                        url: item.link,
                        source: feed.title || new URL(feedUrl).hostname,
                        timestamp: item.pubDate || item.isoDate || new Date().toISOString(),
                        isManual: false
                    }));
                
                articles.push(...rssArticles);
                console.log(`✅ RSS (${feed.title}): ${rssArticles.length} approved articles`);
            } catch (error) {
                console.error(`❌ RSS feed error (${feedUrl}):`, error.message);
            }
        }
        
        // Remove duplicates and sort
        const uniqueArticles = Array.from(
            new Map(articles.map(item => [item.url, item])).values()
        );
        uniqueArticles.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Update cache
        newsCache.data = uniqueArticles;
        newsCache.lastFetch = Date.now();
        
        console.log(`\n📊 SUMMARY:`);
        console.log(`   Total unique articles: ${uniqueArticles.length}`);
        console.log(`   Cache updated at ${new Date().toLocaleTimeString()}\n`);
        
    } catch (error) {
        console.error('❌ Error fetching news:', error.message);
    } finally {
        newsCache.isFetching = false;
    }
}

// Endpoint to get cached news (instant response)
app.get('/api/news', async (req, res) => {
    try {
        // If cache is empty or very old, wait for fresh data
        if (newsCache.data.length === 0 || !newsCache.lastFetch) {
            await fetchNewsData();
        } else {
            // Return cached data immediately
            const cacheAge = Date.now() - newsCache.lastFetch;
            console.log(`⚡ Serving cached news (${Math.round(cacheAge / 1000)}s old)`);
            
            // Refresh in background if cache is stale
            if (cacheAge > CACHE_DURATION && !newsCache.isFetching) {
                console.log('🔄 Refreshing cache in background...');
                fetchNewsData(); // Don't await - run in background
            }
        }
        
        res.json(newsCache.data);
        
    } catch (error) {
        console.error('❌ Error in /api/news:', error.message);
        res.status(500).json({ 
            error: 'Unable to fetch news articles',
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'News API is running' });
});

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════╗
║   XRPL Canada News Server                ║
║   Running on http://localhost:${PORT}     ║
╚══════════════════════════════════════════╝

📡 Endpoints:
   - GET  /api/news    (Fetch XRP/Ripple news)
   - GET  /api/health  (Health check)

🔑 API Keys:
   - NewsAPI: ${NEWS_API_KEY !== 'YOUR_NEWSAPI_KEY_HERE' ? '✅ Configured' : '❌ Not configured'}
   - CryptoPanic: ${CRYPTOPANIC_KEY !== 'YOUR_CRYPTOPANIC_KEY_HERE' ? '✅ Configured' : '❌ Not configured'}

💾 Cache: Enabled (5 minute refresh)
📝 Note: Add your API keys to .env file
    `);
    
    // Fetch news immediately on startup
    console.log('🚀 Fetching initial news cache...\n');
    fetchNewsData();
    
    // Refresh cache every 5 minutes
    setInterval(() => {
        console.log('⏰ Scheduled cache refresh...');
        fetchNewsData();
    }, CACHE_DURATION);
});

