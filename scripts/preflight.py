#!/usr/bin/env python3
"""Lightweight static-site preflight checks for docs/."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.hrefs: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        pairs = dict(attrs)
        href = pairs.get("href")
        if href:
            self.hrefs.append(href)


def html_pages() -> list[Path]:
    return sorted(DOCS.glob("*.html"))


def check_metadata(pages: list[Path]) -> list[str]:
    errors: list[str] = []
    for page in pages:
        text = page.read_text(encoding="utf-8")
        checks = {
            "title": bool(re.search(r"<title>.*?</title>", text, re.S)),
            "description": 'name="description"' in text,
            "canonical": 'rel="canonical"' in text,
            "og:title": 'property="og:title"' in text,
            "twitter:title": 'name="twitter:title"' in text,
        }
        missing = [k for k, ok in checks.items() if not ok]
        if missing:
            errors.append(f"{page.name}: missing metadata -> {', '.join(missing)}")
    return errors


def check_internal_links(pages: list[Path]) -> list[str]:
    errors: list[str] = []
    for page in pages:
        parser = LinkParser()
        parser.feed(page.read_text(encoding="utf-8"))
        for href in parser.hrefs:
            if href.startswith(("http://", "https://", "mailto:", "tel:", "#")):
                continue
            target = href.split("#", 1)[0]
            if not target:
                continue
            if not (page.parent / target).exists():
                errors.append(f"{page.name}: broken internal link -> {href}")
    return errors


def check_sitemap() -> list[str]:
    errors: list[str] = []
    path = DOCS / "sitemap.xml"
    if not path.exists():
        return ["sitemap.xml: missing"]
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    root = ET.parse(path).getroot()
    urls = [u.findtext("sm:loc", default="", namespaces=ns) for u in root.findall("sm:url", ns)]
    expected = {
        "https://theredlightmethod.com/",
        "https://theredlightmethod.com/benefits.html",
        "https://theredlightmethod.com/reviews.html",
        "https://theredlightmethod.com/panel-reviews.html",
        "https://theredlightmethod.com/mask-reviews.html",
        "https://theredlightmethod.com/research.html",
        "https://theredlightmethod.com/calculator.html",
        "https://theredlightmethod.com/thought-leaders.html",
        "https://theredlightmethod.com/about.html",
    }
    missing = sorted(expected.difference(set(urls)))
    for url in missing:
        errors.append(f"sitemap.xml: missing expected URL -> {url}")
    return errors


def check_required_files() -> list[str]:
    required = [
        DOCS / "robots.txt",
        DOCS / "sitemap.xml",
        DOCS / "llms.txt",
        DOCS / "security.txt",
        DOCS / "_headers",
        DOCS / "_redirects",
    ]
    return [f"missing required file: {p.relative_to(ROOT)}" for p in required if not p.exists()]


def main() -> int:
    pages = html_pages()
    errors: list[str] = []
    errors.extend(check_required_files())
    errors.extend(check_metadata(pages))
    errors.extend(check_internal_links(pages))
    errors.extend(check_sitemap())

    if errors:
        print("Preflight failed:")
        for err in errors:
            print(f"- {err}")
        return 1

    print("Preflight passed:")
    print(f"- Checked {len(pages)} HTML pages")
    print("- Metadata present on all pages")
    print("- Internal links resolved")
    print("- Core crawl/deploy files present")
    print("- Sitemap contains core canonical URLs")
    return 0


if __name__ == "__main__":
    sys.exit(main())
