# Four directions — shared contract

Four self-contained HTML explorations of the same object: a 24-month
anniversary piece where two people each say one thing they like about the
other, counted 1 -> 24, the 24th being the summative one.

Each direction is a single file, `directions/<slug>/index.html`, with its
CSS and JS inline. No build step, no bundler, no external resources except
optionally Google Fonts. It must open by double-click from the filesystem.

## Data contract — identical in all four

Inline this at the top of the script. Empty strings are the honest state:
nothing has been said yet, and the page must show that rather than hide it.

    var PEOPLE = { a: "me", b: "you" };
    var ENTRIES = [ { n: 1, prompt: "...", a: "", b: "" }, ... 24 total ];

## The ladder — the same 24 prompts everywhere

01 a small physical detail - something in how they move
02 a sound they make
03 something they say constantly and don't notice
04 a thing they're good at that they'd never list
05 how they enter a room
06 something they taught you without meaning to
07 a thing they find funny that nobody else does
08 how they are when they're tired
09 something they have never once given up on
10 a time they were right and you were wrong
11 what they do when someone else is sad
12 a thing that annoyed you at first and doesn't now
13 something they made
14 a place that belongs to them
15 how they handle being wrong
16 a thing they protect
17 something they carry that they never asked for
18 how they've changed in two years
19 what hasn't changed at all
20 a thing you'd defend about them to a stranger
21 something you'd only ever say to their face
22 what you would miss first
23 what they are to you now that they weren't at month one
24 the whole thing. why them.

## Required of every direction

- Two voices per stop. A press is one voice, not one month: you speak,
  then they speak, and only then does the piece advance. Whatever "advance"
  means in your direction, it happens only once both have spoken.
- `space` and click both advance. `Home` returns to the start, `End` jumps
  to 24. Click must work on its own - an embedded frame may not hold the
  keyboard.
- Year one / year two is legible somewhere. Months 1-12 and 13-24 should
  feel different, not identical.
- Works at 1440x900 and on a phone.
- Honours `prefers-reduced-motion`.
- Real content throughout. No lorem.

## The house look, to depart from deliberately

    paper  #f2f0ec      ink  #171614      thread  #e8420a

The existing piece at the repo root uses these. Each direction may choose
its own palette, but pick it on purpose and paint every colour explicitly -
never leave a background transparent.
