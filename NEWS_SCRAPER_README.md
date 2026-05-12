# XRP News Scraper - Setup & Usage

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install feedparser
```

### 2. Run the Scraper

```bash
python fetch_news.py
```

This will:
- Fetch XRP/Ripple news from 8 RSS feeds
- Filter for relevant articles
- Save to `xrp_news.json`
- Display a summary

### 3. Deploy to Your Website

Upload `xrp_news.json` to your website root (same directory as `index.html`)

That's it! Your website will automatically load the news.

---

## 📋 How It Works

### Python Scraper (`fetch_news.py`)
1. Connects to 8 crypto news RSS feeds
2. Filters articles containing "xrp", "ripple", or "xrpl"
3. Removes duplicates and spam
4. Sorts by date (newest first)
5. Saves to `xrp_news.json`

### Website (`index.html`)
1. Loads `xrp_news.json` on page load
2. Displays 6 articles initially
3. "Explore More News" button loads 6 more
4. Auto-formats timestamps ("2h ago", "3d ago", etc.)

---

## ⚙️ Automation Options

### Option 1: Manual Updates
Run whenever you want fresh news:
```bash
python fetch_news.py
```

### Option 2: Cron Job (Linux/Mac)
Update news every 2 hours:

```bash
crontab -e
```

Add this line:
```
0 */2 * * * cd /path/to/xrplcanada && /usr/bin/python3 fetch_news.py
```

### Option 3: GitHub Actions (Automated CI/CD)
Create `.github/workflows/update-news.yml`:

```yaml
name: Update XRP News

on:
  schedule:
    - cron: '0 */2 * * *'  # Every 2 hours
  workflow_dispatch:  # Manual trigger

jobs:
  update-news:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: pip install feedparser
    
    - name: Fetch news
      run: python fetch_news.py
    
    - name: Commit and push if changed
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add xrp_news.json
        git diff --quiet && git diff --staged --quiet || git commit -m "Update XRP news"
        git push
```

### Option 4: Netlify/Vercel Serverless Function
Create a serverless function that runs the scraper on demand.

---

## 🎯 RSS Feeds Included

| Source | URL |
|--------|-----|
| CoinDesk | https://www.coindesk.com/arc/outboundfeeds/rss/ |
| Cointelegraph | https://cointelegraph.com/rss |
| Bitcoin.com | https://news.bitcoin.com/feed/ |
| NewsBTC | https://newsbtc.com/feed/ |
| CryptoPotato | https://cryptopotato.com/feed/ |
| CryptoNews | https://cryptonews.com/news/feed/ |
| Decrypt | https://decrypt.co/feed |
| U.Today | https://u.today/rss |

---

## 📝 Customization

### Add More RSS Feeds
Edit `fetch_news.py`:
```python
FEEDS = [
    'https://www.coindesk.com/arc/outboundfeeds/rss/',
    'https://your-new-feed-here.com/rss',  # Add here
]
```

### Change Keywords
Edit `fetch_news.py`:
```python
KEYWORDS = ['xrp', 'ripple', 'xrpl', 'your-keyword-here']
```

### Exclude Spam
Edit `fetch_news.py`:
```python
EXCLUDE_KEYWORDS = ['xrp killer', 'vs xrp', 'your-spam-keyword']
```

### Change Number of Articles Displayed
Edit `index.html`:
```javascript
let displayedNewsCount = 6;  // Change to any number
```

---

## 🔧 Troubleshooting

### No articles found
- Check internet connection
- RSS feeds might be temporarily down
- Keywords might be too restrictive

### JSON file not loading on website
- Make sure `xrp_news.json` is in the same directory as `index.html`
- Check browser console for errors (F12)
- If using local file system, run a local server:
  ```bash
  python -m http.server 8000
  ```
  Then visit: http://localhost:8000

### Duplicate articles
- The scraper automatically removes duplicates by title
- If you see duplicates, sources might have slightly different titles

---

## 📊 Output Format

The `xrp_news.json` file structure:

```json
[
  {
    "title": "XRP Price Surges After Latest Development",
    "excerpt": "XRP has seen significant gains following...",
    "url": "https://coindesk.com/article-url",
    "source": "CoinDesk",
    "timestamp": "2025-12-20T15:30:00",
    "isManual": false
  }
]
```

---

## 🎉 Pro Tips

1. **Run before deploying**: Always run `fetch_news.py` before deploying your site
2. **Automate with CI/CD**: Set up GitHub Actions for hands-free updates
3. **Monitor feed quality**: Some RSS feeds are noisier than others
4. **Cache aggressively**: News doesn't need to update every second
5. **Add manual entries**: Edit the JSON file to add curated stories at the top

---

## 📞 Support

Questions? Contact: team@xrplcanada.org

---

## 📄 License

Part of the XRPL Canada project.
© 2025 XRPL Canada




