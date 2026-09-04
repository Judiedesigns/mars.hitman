#!/usr/bin/env python3
"""Convert a full HTML document into an artifact-ready fragment.

The artifact host wraps what it is given in its own <!doctype>/<head>/<body>,
so the page must arrive as title + styles + body content, with no document
tags of its own.

    python3 build-artifact.py directions/04-constellation
"""
import re, sys, pathlib

src = pathlib.Path(sys.argv[1]) / "index.html"
s = src.read_text()

title = (re.search(r'<title>(.*?)</title>', s, re.S) or [None, "twenty-four"])[1].strip()
head = (re.search(r'<head[^>]*>(.*?)</head>', s, re.S) or [None, ""])[1]
body = (re.search(r'<body[^>]*>(.*?)</body>', s, re.S) or [None, s])[1]

# keep the styles from the head, drop meta/link/title
styles = "\n".join(m.group(0) for m in re.finditer(r'<style[^>]*>.*?</style>', head, re.S))

out = f"<title>{title}</title>\n\n{styles}\n\n{body.strip()}\n"
dest = pathlib.Path(sys.argv[1]).with_suffix("") 
dest = pathlib.Path(str(dest) + ".artifact.html")
dest.write_text(out)
print(f"{dest} — {len(out)} bytes, title {title!r}")
