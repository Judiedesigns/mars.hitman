#!/usr/bin/env python3
"""Generate content.js from the note, plus the accepted edit pass.

notes/why-dams.md is the original and is never modified. notes/edit-pass.json
holds the accepted revision of the 24 lines — the third-person lines moved to
second person, nothing else. Delete that file and re-run to get the note back
exactly as written.

    python3 build-content.py
"""
import json, re, pathlib

src = pathlib.Path("notes/why-dams.md").read_text()
items, preamble, coda = [], [], None
for line in src.split("\n"):
    s = line.strip()
    if not s or s.startswith("#"):
        continue
    m = re.match(r'^(?:\d+\.|-)\s*(.+)$', s)
    if m:
        items.append(m.group(1).strip())
    elif s.startswith(("Paragraph text:", "Question:", "Promise:")) or s.startswith("I hope"):
        preamble.append(s)
    else:
        coda = s
assert len(items) == 24, f"expected 24 items, found {len(items)}"

edit = pathlib.Path("notes/edit-pass.json")
lines = json.loads(edit.read_text()) if edit.exists() else items
assert len(lines) == 24

def js(x): return json.dumps(x, ensure_ascii=False)
def field(prefix):
    v = next(p for p in preamble if p.startswith(prefix))
    return v[len(prefix):].strip() if prefix.endswith(":") else v

entries = ",\n".join(
    '  { n: %2d, prompt: "", a: %s, b: "" }' % (i + 1, js(t))
    for i, t in enumerate(lines))

pathlib.Path("content.js").write_text(f'''/* content.js — GENERATED. Do not edit by hand.

   Run: python3 build-content.py

   Sources:
     notes/why-dams.md    the original note, verbatim, never modified
     notes/edit-pass.json the accepted edit — third person moved to second,
                          and nothing else. Delete it and re-run to get the
                          note back exactly as written.

   Voice `a` is written. Voice `b` is unused: these are one person's words.
*/

var TITLE = "Mars & the Hitman";
var SUBTITLE = "why dams";

var PEOPLE = {{ a: "me", b: "dams" }};

var OPENING = {js(field("Paragraph text:"))};
var HOPE    = {js(field("I hope"))};
var QUESTION= {js(field("Question:"))};
var PROMISE = {js(field("Promise:"))};
var CODA    = {js(coda)};

var ENTRIES = [
{entries}
];
''')
print("content.js regenerated from note + edit pass")
