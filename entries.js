/* ------------------------------------------------------------------
   entries.js — the only file you need to edit.

   24 months. 24 things. Each one has two sides: what you say about
   them, and what they say about you. Nothing here is required to be
   filled in at once — an empty string just leaves that dot unlit.

   `prompt` is a scaffold, not a rule. Delete it, rewrite it, ignore it.
   It runs small-and-specific at 01 and whole-person by 24.
------------------------------------------------------------------ */

var PEOPLE = {
  a: "me",    // ← your name
  b: "you"    // ← their name
};

var TITLE = "twenty-four";
var SUBTITLE = "two years, said one at a time";

/* Landmarks — the things that aren't one of the 24, but that the two
   years happened around. They sit out in the empty space at odd angles,
   some upside down, the way waypoints do on a walking map. Move them,
   rewrite them, add or delete freely.

   x / y are positions in a 1000x1000 field. rot is degrees. */

var LANDMARKS = [
  { arrow: "up",    label: "where we met",     sub: "month 01", x: 706, y: 104, rot:  -7 },
  { arrow: "left",  label: "the long winter",  sub: "month 09", x: 146, y: 296, rot: -34 },
  { arrow: "right", label: "the trip",         sub: "month 15", x: 892, y: 432, rot: -78 },
  { arrow: "left",  label: "the bad week",     sub: "month 18", x: 118, y: 648, rot:  11 },
  { arrow: "down",  label: "your kitchen",     sub: "month 21", x: 208, y: 838, rot: 168 },
  { arrow: "down",  label: "here",             sub: "month 24", x: 566, y: 902, rot:   4 }
];

var ENTRIES = [
  { n:  1, prompt: "a small physical detail — something in how they move",        a: "", b: "" },
  { n:  2, prompt: "a sound they make",                                            a: "", b: "" },
  { n:  3, prompt: "something they say constantly and don't notice",               a: "", b: "" },
  { n:  4, prompt: "a thing they're good at that they'd never list",               a: "", b: "" },
  { n:  5, prompt: "how they enter a room",                                        a: "", b: "" },
  { n:  6, prompt: "something they taught you without meaning to",                 a: "", b: "" },
  { n:  7, prompt: "a thing they find funny that nobody else does",                a: "", b: "" },
  { n:  8, prompt: "how they are when they're tired",                              a: "", b: "" },
  { n:  9, prompt: "something they have never once given up on",                   a: "", b: "" },
  { n: 10, prompt: "a time they were right and you were wrong",                    a: "", b: "" },
  { n: 11, prompt: "what they do when someone else is sad",                        a: "", b: "" },
  { n: 12, prompt: "a thing that annoyed you at first and doesn't now",            a: "", b: "" },
  { n: 13, prompt: "something they made",                                          a: "", b: "" },
  { n: 14, prompt: "a place that belongs to them",                                 a: "", b: "" },
  { n: 15, prompt: "how they handle being wrong",                                  a: "", b: "" },
  { n: 16, prompt: "a thing they protect",                                         a: "", b: "" },
  { n: 17, prompt: "something they carry that they never asked for",               a: "", b: "" },
  { n: 18, prompt: "how they've changed in two years",                             a: "", b: "" },
  { n: 19, prompt: "what hasn't changed at all",                                    a: "", b: "" },
  { n: 20, prompt: "a thing you'd defend about them to a stranger",                a: "", b: "" },
  { n: 21, prompt: "something you'd only ever say to their face",                  a: "", b: "" },
  { n: 22, prompt: "what you would miss first",                                    a: "", b: "" },
  { n: 23, prompt: "what they are to you now that they weren't at month one",      a: "", b: "" },
  { n: 24, prompt: "the whole thing. why them.",                                   a: "", b: "" }
];
