const axios = require('axios');
const Parser = require('rss-parser');

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

// API Keys from environment variables
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const CRYPTOPANIC_KEY = process.env.CRYPTOPANIC_KEY;

// Approved domains whitelist
const APPROVED_DOMAINS = [
    // Major Crypto News Sites
    'decrypt.co', 'cryptopotato.com', 'theblock.co', 'coindesk.com',
    'cointelegraph.com', 'u.today', 'newsbtc.com', 'cryptonews.com',
    'bitcoinist.com', 'ambcrypto.com', 'cryptoslate.com', 'beincrypto.com',
    'coinjournal.net', 'coinspeaker.com', 'cryptobriefing.com', 'dailyhodl.com',
    'cryptoglobe.com',
    // Mainstream Financial News
    'finance.yahoo.com', 'bloomberg.com', 'reuters.com', 'cnbc.com',
    'forbes.com', 'businessinsider.com', 'wsj.com', 'ft.com', 'marketwatch.com',
    // Tech News Sites
    'techcrunch.com', 'theverge.com', 'wired.com', 'venturebeat.com',
    // Blockchain/DeFi Specific
    'thedefiant.io', 'dlnews.com', 'blockworks.co'
];

// Blocked domains
const BLOCKED_DOMAINS = [
    'biztoc.com', 'pypi.org', 'github.com', 'medium.com',
    'reddit.com', 'twitter.com', 'x.com', 'youtube.com',
    'investorshub.com', 'stocktwits.com', 'seekingalpha.com',
    'newsfile.com', 'prnewswire.com', 'globenewswire.com',
    'businesswire.com', 'accesswire.com'
];

function isBlockedDomain(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');
        return BLOCKED_DOMAINS.some(domain => hostname.includes(domain));
    } catch (error) {
        return false;
    }
}

function isApprovedDomain(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');
        return APPROVED_DOMAINS.some(domain => hostname.includes(domain));
    } catch (error) {
        return false;
    }
}

function containsXRPKeywords(title, description) {
    const text = `${title} ${description}`.toLowerCase();

    const keywords = [
        'xrp', 'ripple', 'xrpl', 'ripple labs', 'brad garlinghouse', 'garlinghouse',
        'rlusd', 'ripplenet', 'ripple usd', 'ripple stablecoin',
        'xrp etf', 'spot xrp', 'xrp trust', 'xrp treasury',
        'grayscale xrp', 'franklin xrp', 'bitwise xrp',
        'xrp ledger', 'xrp defi', 'xrp staking', 'wrapped xrp', 'stxrp',
        'xrp liquidity', 'flare network', 'firelight', 'hex trust',
        'wormhole xrp', 'chainlink xrp', 'cross-border xrp', 'xrp payments',
        'xrp settlement', 'xrp remittance', 'xrp bridge', 'xrp corridor',
        'xrp price', 'xrp rally', 'xrp volume', 'xrp market', 'xrp trading',
        'xrp surge', 'ripple sec', 'xrp lawsuit', 'xrp securities',
        'ripple settlement', 'xrp clarity', 'bank ripple', 'institution xrp',
        'central bank xrp', 'cbdc ripple', 'ripple partnership',
        'ripple integration', 'swell ripple', 'xrp community', 'attackathon',
        'evernorth', 'sbi ripple', 'ripple asia', 'metaco ripple',
        'hidden road ripple', 'fortress trust ripple', 'standard custody ripple'
    ];

    return keywords.some(keyword => text.includes(keyword));
}

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

// Vercel serverless function handler
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

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

        res.status(200).json(newsCache.data);

    } catch (error) {
        console.error('❌ Error in /api/news:', error.message);
        res.status(500).json({
            error: 'Unable to fetch news articles',
            message: error.message
        });
    }
};
