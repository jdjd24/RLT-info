#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "docs"

errors = []
for html in ROOT.glob("*.html"):
    text = html.read_text(encoding="utf-8")
    for idx, match in enumerate(re.finditer(r'<script type="application/ld\+json">(.*?)</script>', text, re.S), start=1):
        payload = match.group(1).strip()
        try:
            json.loads(payload)
        except Exception as exc:
            errors.append(f"{html.name} JSON-LD #{idx}: {exc}")

if errors:
    print("Schema validation failed:")
    for e in errors:
        print("-", e)
    sys.exit(1)

print("Schema validation passed")
