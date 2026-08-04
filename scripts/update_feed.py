#!/usr/bin/env python3
"""Build a normalized, deduplicated cyber/technology feed using public sources."""
import datetime as dt, email.utils, html, json, re, urllib.request, xml.etree.ElementTree as ET
from pathlib import Path

UA={'User-Agent':'AvanyuTech-Feed/1.0 (+https://avanyu.tech)'}
FEEDS=[
 ('CISA','https://www.cisa.gov/cybersecurity-advisories/all.xml'),
 ('SLASHDOT','https://rss.slashdot.org/Slashdot/slashdotMainatom'),
 ('REDDIT','https://www.reddit.com/r/cybersecurity/.rss'),
 ('REDDIT','https://www.reddit.com/r/netsec/.rss'),
 ('REDDIT','https://www.reddit.com/r/technology/.rss'),
 ('OSINT','https://feeds.feedburner.com/TheHackersNews'),
 ('OSINT','https://www.bleepingcomputer.com/feed/'),
 ('OSINT','https://krebsonsecurity.com/feed/')]

def get(url):
    with urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=25) as r:return r.read()
def text(node,names):
    for child in node.iter():
        if child.tag.split('}')[-1] in names and child.text:return child.text.strip()
    return ''
def strip(value):return re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',html.unescape(value or ''))).strip()
def iso(value):
    try:return email.utils.parsedate_to_datetime(value).astimezone(dt.timezone.utc).isoformat()
    except Exception:
        try:return dt.datetime.fromisoformat(value.replace('Z','+00:00')).isoformat()
        except Exception:return ''
def parse_feed(source,url):
    root=ET.fromstring(get(url));out=[]
    for node in list(root.iter()):
        if node.tag.split('}')[-1] not in ('item','entry'):continue
        title=strip(text(node,('title',)));link=text(node,('link',));
        if not link:
            for c in node:
                if c.tag.split('}')[-1]=='link' and c.attrib.get('href'):link=c.attrib['href'];break
        summary=strip(text(node,('description','summary','content')));published=iso(text(node,('pubDate','published','updated','date')))
        if title and link:out.append({'source':source,'title':title,'url':link,'summary':summary[:500],'published':published})
    return out
def hacker_news():
    ids=json.loads(get('https://hacker-news.firebaseio.com/v0/topstories.json'))[:18];out=[]
    for ident in ids:
        item=json.loads(get(f'https://hacker-news.firebaseio.com/v0/item/{ident}.json'))
        if item.get('title'):out.append({'source':'HACKER NEWS','title':item['title'],'url':item.get('url',f'https://news.ycombinator.com/item?id={ident}'),'summary':f"{item.get('score',0)} points · {item.get('descendants',0)} comments",'published':dt.datetime.fromtimestamp(item['time'],dt.timezone.utc).isoformat()})
    return out

items=[];errors=[]
for source,url in FEEDS:
    try:items.extend(parse_feed(source,url)[:12])
    except Exception as exc:errors.append({'source':source,'url':url,'error':type(exc).__name__})
try:items.extend(hacker_news())
except Exception as exc:errors.append({'source':'HACKER NEWS','error':type(exc).__name__})
seen=set();unique=[]
for item in sorted(items,key=lambda x:x.get('published',''),reverse=True):
    key=re.sub(r'\W+','',item['title'].lower())[:100]
    if key not in seen:seen.add(key);unique.append(item)
payload={'updated':dt.datetime.now(dt.timezone.utc).isoformat(),'item_count':len(unique),'sources':['CISA','HACKER NEWS','REDDIT','SLASHDOT','OSINT'],'errors':errors,'items':unique[:80]}
Path('data/cyber-feed.json').write_text(json.dumps(payload,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
