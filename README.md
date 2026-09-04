# twenty-four

A thing for a 24-month anniversary: two people, 24 months, 24 things,
counted one at a time until the count is done.

Open `index.html` in a browser. Press `→` to move through it.
Everything you'd want to change lives in **`entries.js`**.

---

## The direction

Your three references were already arguing for the same thing, so I built that.

**The dots.** At rest the page is your first image — twenty-four marks on
paper, irregular, no visible order. That's the honest state of a
relationship you haven't described yet: all the parts are there and none
of them are joined.

**The thread.** One continuous hand-drawn orange line, the vermillion from
your second image. It's paid out one segment at a time — you say a thing,
the line reaches the next dot. It wanders the way a hand wanders; it isn't
a plotted curve.

**Two orbits.** The hidden order is a two-turn spiral, one turn per year,
taken from your third image — the analemma with its months and seasons on
rings. Month 01 is innermost, month 24 outermost. The angular steps are
deliberately uneven, so nothing gives the shape away early. At seven you
can't tell where it's going. At twenty-four you can see you went round
twice and came back near where you started, further out.

**The text arrives late and small.** Bottom right, tiny, enormous silence
above it — your second image's whole move. Two voices per stop: what you
said, what they said.

So the count *is* the drawing. The 24th thing is the moment the shape
finally exists, and it can't exist before then. That's the thing worth
protecting in whatever you build.

---

## The ladder

The hardest part of "24 things" isn't the format, it's finding 24 without
the last ten going vague. So the prompts in `entries.js` are graded: they
start small and physical and end at the whole person.

01–06 the surface — how they move, sound, speak, enter a room
07–12 the texture — their humour, their tiredness, their stubbornness
13–18 the evidence — what they've made, kept, protected, become
19–23 the reckoning — what hasn't changed, what you'd defend, what you'd miss
24    the whole thing. why them.

They're a scaffold, not a rule. Overwrite any of them.

---

## Filling it in

Open `entries.js`. Set the two names, then write into `a` and `b`:

```js
var PEOPLE = { a: "your name", b: "their name" };

{ n: 1, prompt: "a small physical detail — something in how they move",
  a: "the way you hold a mug with both hands even when it's cold",
  b: "" },
```

Anything left as `""` shows as *not said yet* and its dot stays unlit — so
you can genuinely fill it in over time rather than all in one sitting, if
that's the version you want.

Line breaks work: use `\n` inside the string.

---

## Moving through it

- `→` `↓` `space` — next
- `←` `↑` — back
- `Home` — return to the bare dots
- `End` — jump to 24
- click any dot to go straight there; click empty paper to advance
- scroll or swipe also work

---

## Three ways you could take this further

**1. Alternating, not parallel.** Right now each stop shows both voices at
once. You could make it strictly alternating — odd months are yours, even
months are theirs — so the thread is literally passed back and forth
between you. Twelve each. Change: render one voice per stop based on
`n % 2`.

**2. Sealed until said.** Each of you fills in your own side without
seeing the other's, and the page only reveals both when you've each
reached 24. Change: two entry files, and a gate on the panel.

**3. Print it.** The final frame — dots, thread, no interface — is a
poster. Add a print stylesheet that hides `#counter`, `#panel` and `#hint`
and forces the revealed state, and it comes out looking like your first
image with the answer drawn on.

---

## Files

    index.html   structure, nothing else
    style.css    paper, ink, one orange
    piece.js     geometry, the thread, movement
    entries.js   ← the only file you need to edit
