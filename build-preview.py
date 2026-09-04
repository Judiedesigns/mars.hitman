#!/usr/bin/env python3
"""Inline index.html + style.css + entries.js + piece.js into one file.

The artifact host serves a single page and wraps it in its own
<!doctype>/<head>/<body>, so preview.html carries no document tags of its
own — just the title, the styles and the scripts, in order.

    python3 build-preview.py
"""
import re, pathlib

here = pathlib.Path(__file__).parent
html    = (here / "index.html").read_text()
css     = (here / "style.css").read_text()
entries = (here / "entries.js").read_text()
piece   = (here / "piece.js").read_text()

# keep only what lives inside <body>
body = html.split("<body>", 1)[1].split("</body>", 1)[0].strip()
# drop the external references — everything is inlined below
body = re.sub(r'\s*<script src="[^"]+"></script>', "", body)

out = (
    "<title>twenty-four</title>\n\n"
    "<style>\n" + css.strip() + "\n</style>\n\n"
    + body + "\n\n"
    "<script>\n" + entries.strip() + "\n</script>\n\n"
    "<script>\n" + piece.strip() + "\n</script>\n"
)

(here / "preview.html").write_text(out)
print("preview.html — %d bytes" % len(out))
