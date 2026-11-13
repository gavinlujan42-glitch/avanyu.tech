#!/usr/bin/env python3
"""Public endpoint health checks; no credentials or internal assets."""
import concurrent.futures, datetime, json, socket, ssl, urllib.request, urllib.error
from pathlib import Path
SITES = [
 "https://avanyu.tech/", "https://avanyu.tech/shadowwatch/",
 "https://avanyu.cloud/", "https://ziatec.cloud/",
 "https://ziawolf.com/", "https://gavinlujan.com/",
 "https://shadowloft.wordpress.com/",
 "https://gavinlujan.wordpress.com/",
 "https://gavinlujan42-glitch.github.io/ShadowLoft/",
]
def probe(url):
    out={"url":url,"status":"unknown","http_status":None,"latency_ms":None,"tls_days_remaining":None,"error":None}
    from urllib.parse import urlparse
    from time import monotonic
    host=urlparse(url).hostname
    t=monotonic()
    try:
        req=urllib.request.Request(url,headers={"User-Agent":"Shadowwatch-Public-Health/1.0"})
        with urllib.request.urlopen(req,timeout=12) as r:
            out["http_status"]=r.status
            out["status"]="up" if 200<=r.status<400 else "degraded"
    except urllib.error.HTTPError as e:
        out["http_status"]=e.code
        out["status"]="degraded" if e.code in (401,403,429) else "down"
        out["error"]=f"HTTP {e.code}"
    except Exception as e:
        out["status"]="down"
        out["error"]=type(e).__name__+": "+str(e)[:150]
    out["latency_ms"]=round((monotonic()-t)*1000)
    try:
        ctx=ssl.create_default_context()
        with socket.create_connection((host,443),timeout=7) as s:
            with ctx.wrap_socket(s,server_hostname=host) as ss:
                expiry=ssl.cert_time_to_seconds(ss.getpeercert()["notAfter"])
                out["tls_days_remaining"]=int((expiry-datetime.datetime.now(datetime.timezone.utc).timestamp())//86400)
    except Exception:
        pass
    return out
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    results=list(pool.map(probe,SITES))
payload={"generated_at":datetime.datetime.now(datetime.timezone.utc).isoformat(),"source":"GitHub Actions public HTTP/TLS probes","results":results}
Path("shadowwatch").mkdir(exist_ok=True)
Path("shadowwatch/status.json").write_text(json.dumps(payload,indent=2)+"\n")
print(json.dumps(payload,indent=2))
