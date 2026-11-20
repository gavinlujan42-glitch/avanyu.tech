#!/usr/bin/env python3
"""Public endpoint health checks; no credentials or internal assets."""
import concurrent.futures, datetime, json, socket, ssl, urllib.request, urllib.error
from pathlib import Path
from time import monotonic
from urllib.parse import urlparse
SITES = [
 "https://avanyu.tech/", "https://avanyu.tech/shadowwatch/",
 "https://avanyu.cloud/", "https://ziatec.cloud/",
 "https://ziawolf.com/", "https://gavinlujan.com/",
 "https://shadowloft.wordpress.com/",
 "https://gavinlujan.wordpress.com/",
 "https://gavinlujan42-glitch.github.io/ShadowLoft/",
]
def probe(url):
    out = dict(url=url, status="unknown", http_status=None, latency_ms=None,
               tls_days_remaining=None, tls_expires_at=None, error=None)
    host = urlparse(url).hostname
    start = monotonic()
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Shadowwatch-Public-Health/1.0"})
        with urllib.request.urlopen(req, timeout=12) as response:
            out.update(http_status=response.status,
                       status="up" if 200 <= response.status < 300 else "degraded")
    except urllib.error.HTTPError as exc:
        out.update(http_status=exc.code,
                   status="degraded" if exc.code in (401, 403, 429) else "down",
                   error=f"HTTP {exc.code}")
    except (urllib.error.URLError, OSError) as exc:
        reason = getattr(exc, "reason", exc)
        error = ("DNS lookup failed" if isinstance(reason, socket.gaierror) else
                 "TLS certificate validation failed" if isinstance(reason, ssl.SSLCertVerificationError) else
                 "Connection timed out" if isinstance(reason, TimeoutError) else
                 "Connection failed")
        out.update(status="down", error=error)
    finally:
        out["latency_ms"] = round((monotonic() - start) * 1000)
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((host, 443), timeout=7) as conn:
            with ctx.wrap_socket(conn, server_hostname=host) as tls:
                expiry = ssl.cert_time_to_seconds(tls.getpeercert()["notAfter"])
                expires_at = datetime.datetime.fromtimestamp(expiry, datetime.timezone.utc)
                remaining = expires_at - datetime.datetime.now(datetime.timezone.utc)
                out.update(tls_expires_at=expires_at.isoformat(), tls_days_remaining=remaining.days)
                if out["status"] == "up" and remaining.days < 14:
                    out.update(status="degraded", error="TLS certificate expires within 14 days")
    except OSError:
        if out["status"] == "up":
            out.update(status="degraded", error="Could not validate origin TLS")
    return out


def main():
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        results = list(pool.map(probe, SITES))
    payload = {"generated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
               "source": "GitHub Actions public HTTP/TLS probes", "results": results}
    target = Path(__file__).with_name("status.json")
    temporary = target.with_suffix(".json.tmp")
    temporary.write_text(json.dumps(payload, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    temporary.replace(target)


if __name__ == "__main__":
    main()
