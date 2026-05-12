#!/usr/bin/env python3
"""
XRPL Canada News Scraper
Fetches XRP and Ripple news from multiple RSS feeds and saves to JSON
Run this script periodically to keep news fresh
"""

import feedparser
import json
from datetime import datetime
import re

# RSS Feed Sources
FEEDS = [
    'https://www.coindesk.com/arc/outboundfeeds/rss/',
    'https://cointelegraph.com/rss',
    'https://news.bitcoin.com/feed/',
    'https://newsbtc.com/feed/',
    'https://cryptopotato.com/feed/',
    'https://cryptonews.com/news/feed/',
    'https://decrypt.co/feed',
    'https://u.today/rss',
]

# Keywords to filter for
KEYWORDS = ['xrp', 'ripple', 'xrpl', 'xrp ledger']

# Keywords to exclude (noise)
EXCLUDE_KEYWORDS = ['xrp killer', 'vs xrp', 'better than xrp']

def clean_html(text):
    """Remove HTML tags from text"""
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)

def parse_date(date_string):
    """Parse various date formats to ISO format"""
    try:
        # Try parsing common formats
        for fmt in ['%a, %d %b %Y %H:%M:%S %z', '%Y-%m-%dT%H:%M:%S%z', '%Y-%m-%d %H:%M:%S']:
            try:
                dt = datetime.strptime(date_string, fmt)
                return dt.isoformat()
            except:
                continue
        # If all fails, return the original
        return date_string
    except:
        return datetime.now().isoformat()

def should_include(title, summary):
    """Check if article should be included based on keywords"""
    text = f"{title} {summary}".lower()
    
    # Check if any exclude keyword is present
    for exclude in EXCLUDE_KEYWORDS:
        if exclude in text:
            return False
    
    # Check if any include keyword is present
    for keyword in KEYWORDS:
        if keyword in text:
            return True
    
    return False

def fetch_news():
    """Fetch news from all RSS feeds"""
    articles = []
    seen_titles = set()  # Avoid duplicates
    
    print("🔍 Fetching XRP & Ripple news from RSS feeds...\n")
    
    # Set user agent to avoid blocking
    feedparser.USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    
    for feed_url in FEEDS:
        try:
            print(f"📡 Fetching: {feed_url}")
            feed = feedparser.parse(feed_url)
            
            if not feed.entries:
                print(f"   ⚠️  No entries found (feed might be blocking or down)")
                continue
            
            count = 0
            for entry in feed.entries:
                title = entry.get('title', 'No title')
                summary = clean_html(entry.get('summary', ''))
                
                # Check if article is relevant
                if should_include(title, summary):
                    # Avoid duplicates
                    if title in seen_titles:
                        continue
                    
                    seen_titles.add(title)
                    
                    # Extract date
                    date_str = entry.get('published', entry.get('updated', ''))
                    
                    # Create article object
                    article = {
                        'title': title,
                        'excerpt': summary[:200] + '...' if len(summary) > 200 else summary,
                        'url': entry.get('link', '#'),
                        'source': feed.feed.get('title', 'Unknown Source'),
                        'timestamp': parse_date(date_str) if date_str else datetime.now().isoformat(),
                        'isManual': False
                    }
                    
                    articles.append(article)
                    count += 1
            
            print(f"   ✅ Found {count} relevant articles")
            
        except Exception as e:
            print(f"   ❌ Error: {str(e)}")
            continue
    
    # Sort by timestamp (newest first)
    articles.sort(key=lambda x: x['timestamp'], reverse=True)
    
    return articles

def save_to_json(articles, filename='xrp_news.json'):
    """Save articles to JSON file"""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(articles, f, indent=2, ensure_ascii=False)
        print(f"\n💾 Saved {len(articles)} articles to {filename}")
        return True
    except Exception as e:
        print(f"\n❌ Error saving to JSON: {str(e)}")
        return False

def main():
    """Main function"""
    print("=" * 60)
    print("XRPL CANADA NEWS SCRAPER")
    print("=" * 60)
    print()
    
    # Fetch news
    articles = fetch_news()
    
    if not articles:
        print("\n⚠️  No articles found!")
        return
    
    # Save to JSON
    if save_to_json(articles):
        print("\n" + "=" * 60)
        print(f"✅ SUCCESS! Found {len(articles)} XRP/Ripple articles")
        print("=" * 60)
        
        # Show preview
        print("\n📰 Latest 5 articles:")
        for i, article in enumerate(articles[:5], 1):
            print(f"\n{i}. {article['title']}")
            print(f"   Source: {article['source']}")
            print(f"   Date: {article['timestamp'][:10]}")
    
    print("\n🎉 Done! News file is ready for your website.\n")

if __name__ == "__main__":
    main()

