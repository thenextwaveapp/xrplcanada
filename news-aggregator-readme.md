# XRPL Canada News Aggregator

A hybrid manual + API news aggregator system for displaying XRP and Ripple-related news on the XRPL Canada website.

## 🚀 Features

- ✅ **Manual Curation**: Add high-priority stories you want to highlight
- ✅ **Multi-API Integration**: Pulls from NewsAPI, CryptoPanic, and RSS feeds
- ✅ **Smart Categorization**: Auto-categorizes news (ETFs, Acquisitions, Regulation, Tech, Partnerships)
- ✅ **Category Filtering**: Users can filter by news category
- ✅ **Auto-Refresh**: Optional automatic news refresh every 5 minutes
- ✅ **Bilingual Support**: English/French content 🇨🇦
- ✅ **Responsive Design**: Works perfectly on mobile and desktop
- ✅ **Manual Entry Highlighting**: Manual entries have special visual styling

## 📋 Quick Start

### 1. Add Manual News (No API Keys Needed)

Edit `news-config.js` and add your stories to the `MANUAL_NEWS` array:

```javascript
{
    title: "Your Breaking News Title",
    excerpt: "Brief description of the news story.",
    category: "etf", // etf, acquisition, regulation, technology, partnership, general
    source: "Source Name",
    sourceIcon: "📰", // Any emoji
    url: "https://article-link.com",
    timestamp: new Date("2025-12-20"),
    isManual: true
}
```

**That's it!** Manual entries will display immediately without any API setup.

### 2. Set Up API Integration (Optional)

For automatic news aggregation, you'll need API keys:

#### NewsAPI (Free Tier: 100 requests/day)
1. Sign up at [newsapi.org](https://newsapi.org)
2. Get your free API key
3. Add it to `news-config.js`:
   ```javascript
   newsApiKey: 'your-actual-key-here'
   ```

#### CryptoPanic API (Free Tier Available)
1. Sign up at [cryptopanic.com/developers/api/](https://cryptopanic.com/developers/api/)
2. Get your API token
3. Add it to `news-config.js`:
   ```javascript
   cryptoPanicKey: 'your-actual-key-here'
   ```

## 🎨 Category System

News items are automatically categorized based on keywords:

| Category | Color | Keywords |
|----------|-------|----------|
| **ETF** | Green | etf, exchange-traded fund, institutional, bitwise, grayscale |
| **Acquisition** | Purple | acquisition, acquires, buys, merger |
| **Regulation** | Blue | sec, regulation, regulatory, lawsuit, legal |
| **Technology** | Orange | xrpl, ledger, protocol, upgrade, hooks |
| **Partnership** | Cyan | partnership, collaboration, integration |
| **General** | Red | Default category |

You can customize keywords in `news-config.js` under `CATEGORY_KEYWORDS`.

## 📝 How to Add a New Manual Story

1. Open `news-config.js`
2. Copy this template:
   ```javascript
   {
       title: "Your News Title",
       excerpt: "Brief description (1-2 sentences).",
       category: "etf", // Choose appropriate category
       source: "Source Name",
       sourceIcon: "📰", // Pick a relevant emoji
       url: "https://link-to-full-story.com",
       timestamp: new Date("2025-12-20"), // Format: YYYY-MM-DD
       isManual: true
   }
   ```
3. Fill in all fields
4. Add it to the `MANUAL_NEWS` array
5. Save the file
6. Refresh your website!

## 🔄 Auto-Refresh Feature

Users can enable auto-refresh with the toggle switch in the UI.

**To enable auto-refresh by default**, edit `news-config.js`:
```javascript
const REFRESH_SETTINGS = {
    enabled: true, // Auto-refresh on by default
    intervalMinutes: 5, // Refresh every 5 minutes
};
```

## 🎯 API Rate Limits & Best Practices

### NewsAPI (Free Tier)
- **Limit**: 100 requests/day
- **Best Practice**: Only enable auto-refresh if needed
- **Caching**: Consider implementing server-side caching

### CryptoPanic (Free Tier)
- **Limit**: Varies by plan
- **Best Practice**: Use manual entries for critical news
- **Tip**: Upgrade for higher limits if needed

### Recommendations
1. **Manual entries** are perfect for high-priority, verified stories
2. **APIs** fill in the rest automatically
3. **Auto-refresh** should be used sparingly to conserve API limits
4. Consider building a **backend API** to cache news and reduce direct API calls

## 📂 File Structure

```
xrplcanada/
├── index.html              # Main website (news section included)
├── news-config.js          # News configuration & manual entries
├── news-aggregator-readme.md  # This file
└── ...
```

## 🛠️ Advanced Configuration

### Adding Custom RSS Feeds

Currently, RSS feed fetching requires a CORS proxy. To enable:

1. Set up a backend endpoint or CORS proxy
2. Edit the `fetchFromRSSFeeds()` function in `index.html`
3. Example feeds to consider:
   - Ripple Insights: `https://ripple.com/insights/feed/`
   - XRPL.org Blog: `https://xrpl.org/blog/feed/`

### Custom Category Colors

Edit the CSS in `index.html`:
```css
.news-category-badge.etf {
    background: rgba(76, 175, 80, 0.2);
    color: #66BB6A;
    border: 1px solid rgba(76, 175, 80, 0.3);
}
```

### Adjusting Display Count

Default: 9 news items initially, load 9 more with "Load More" button.

To change:
```javascript
let displayedNewsCount = 12; // Show 12 initially
```

## 🐛 Troubleshooting

### News Not Loading
1. Check browser console for errors
2. Verify API keys are correct
3. Check API rate limits haven't been exceeded
4. Ensure manual entries are properly formatted

### Categories Not Working
1. Verify category name matches exactly: `etf`, `acquisition`, `regulation`, `technology`, `partnership`, `general`
2. Check for typos in category field

### Auto-Refresh Not Working
1. Verify toggle is checked
2. Check browser console for errors
3. Ensure API keys are configured

## 📊 Example Manual News Entry

Here's a real example from current events:

```javascript
{
    title: "XRP ETFs Launch in Canada - First in North America",
    excerpt: "Purpose Investments, 3iQ, and Evolve launched the first North American spot XRP ETFs on the Toronto Stock Exchange, beating U.S. markets to the punch.",
    category: "etf",
    source: "XRPL Canada",
    sourceIcon: "🍁",
    url: "https://www.xrp-etfs.com",
    timestamp: new Date("2025-06-18"),
    isManual: true
}
```

## 🎉 Tips for Great News Curation

1. **Prioritize Canadian content** - Use manual entries for Canadian XRPL news
2. **Verify sources** - Only add news from reputable sources
3. **Keep excerpts concise** - 1-2 sentences max
4. **Use clear titles** - Make it scannable
5. **Update regularly** - Keep your audience informed
6. **Mix categories** - Balance different types of news
7. **Link to full articles** - Always include source URLs

## 📞 Support

For questions or issues:
- Email: team@xrplcanada.org
- Twitter: @XRPLCanada

## 📄 License

Part of the XRPL Canada website project.
© 2025 XRPL Canada. All rights reserved.




