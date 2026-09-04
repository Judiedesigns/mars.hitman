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

## What the reference actually does

I couldn't reach `thehtml.review` from here (the whole domain is blocked by
this environment's proxy), so the first version of this was built from your
images alone. Your screen recording fixed that. For the record, here is what
*from mine to yours* — Queenie Wu, the html review 05 — actually is:

A **walk**. A blue GPS-ish trace wanders across pale graph paper. A black
dot labelled `THINKING...` stands on it. You press **space** to go; the dot
walks forward and the trail behind it turns from blue to dark maroon. Each
press surfaces one fragment of interior monologue in chunky blue pixel type
over the field — *"i'll always remember our first date vividly"*, then
*"we only live 11 blocks apart"*, then *"(it was cute)"*. Sentences break
across presses; single asides get their own beat.

Around the edges, waypoints at every angle — some upside down — with
distances: `↑ PARK 6KM`, `← HOTEL 0.9KM`, `→ F TRAIN 1KM`.

**Which means your third image was this piece's labelling system all along.**
The rotated technical chart isn't a separate idea from the link; it's the
same idea.

### What I took from it, and what I didn't

Your two other images are quiet — off-white, thin line, tiny serif. Wu's
piece is loud — pixel type, saturated blue, graph paper. So I read the link
as the **interaction model** and the images as the **look**, and took only
the mechanics:

- **A walker, not a reveal.** There's a dot with a position and a name
  standing on the path, and the trail is something walked rather than
  drawn.
- **Two beats per stop.** This is the borrow that matters. In Wu's piece a
  press is a fragment, not a whole sentence, so it breathes. Here: press
  once, you speak; press again, they speak; only then does the thread step
  to the next dot. **The line advances only when you've both said your
  thing** — which is what "from mine to yours" is actually about, and it
  falls out of your format for free.
- **Rotated waypoints.** The landmarks in `entries.js` — the things that
  aren't one of the 24 but that the two years happened around. Odd angles,
  one upside down.
- **The mono footer line**, which is straight from her page.

What I left: the pixel type, the graph paper, the visible route. Your first
image is unambiguous that the shape should be hidden at rest, so it still
is — you only ever see one segment ahead, and only after you've both
spoken.

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

- `space` `→` `↓` — go. One press = one voice; two presses = one month.
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
                   (the 24, plus the landmarks around them)
