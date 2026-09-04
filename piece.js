/* twenty-four
 *
 * 24 points on a two-turn spiral: one orbit per year, the second sitting
 * just outside the first, so you can see you've been here before and are
 * further along. A single hand-drawn thread joins them in order. The shape
 * only exists once the 24th thing has been said.
 */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var W = 1000, H = 1000;
  var CX = 468, CY = 432;          // centre of the orbits
  var R0 = 88,  R1 = 352;          // month 01 innermost -> month 24 outermost
  var SQUASH = 0.855;              // seen at an angle, like a plotted chart
  var A0 = 0.92;                   // start bearing: 01 and 24 both fall lower-right,
                                   // so the thread ends pointing into the text
  var TURNS = 2;                   // two years
  var N = ENTRIES.length;

  /* deterministic noise, so the paper looks the same every time it opens */
  function seeded(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }
  var rand = seeded(240724);

  /* ---------- geometry ----------
     The order is a two-turn spiral, but nothing about it is regular: the
     angular step between months varies, and each point drifts in and out
     radially. At rest it should read as scattered marks on paper. The
     spiral only exists once the thread has been paid out. */

  var steps = [], sum = 0;
  for (var q = 0; q < N - 1; q++) {
    var st = 1 + (rand() - 0.5) * 0.9;
    steps.push(st); sum += st;
  }
  var SPAN = TURNS * 2 * Math.PI;

  var nodes = [];
  var ang = A0, walked = 0;
  for (var i = 0; i < N; i++) {
    var t = walked / sum;                       // 0 .. 1 along the two years
    var r = R0 + t * (R1 - R0) + (rand() - 0.5) * 46;
    nodes.push({
      i: i,
      x: CX + Math.cos(ang) * r,
      y: CY + Math.sin(ang) * r * SQUASH,
      r: 3.5 + rand() * 1.7                     // marks vary, as pen marks do
    });
    if (i < N - 1) { walked += steps[i]; ang = A0 + (walked / sum) * SPAN; }
  }

  /* a segment drawn by a hand rather than a plotter: it wanders off the
     straight line in the middle and lands exactly on both ends */
  function handSegment(p0, p1) {
    var dx = p1.x - p0.x, dy = p1.y - p0.y;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / len, ny = dx / len;
    var a1 = (rand() - 0.5) * 2.2, a2 = (rand() - 0.5) * 1.1, ph = rand() * 6.283;
    var amp = Math.min(11, len * 0.045);
    var out = [], sub = 22;
    for (var s = 1; s <= sub; s++) {
      var u = s / sub;
      var env = Math.sin(Math.PI * u);
      var off = (a1 * Math.sin(u * 2.3 + ph) + a2 * Math.sin(u * 5.9 + ph * 2)) * env * amp;
      out.push({ x: p0.x + dx * u + nx * off, y: p0.y + dy * u + ny * off });
    }
    return out;
  }

  var pts = [nodes[0]];
  var nodeAt = [0];                       // index into pts for each node
  for (var k = 1; k < N; k++) {
    pts = pts.concat(handSegment(nodes[k - 1], nodes[k]));
    nodeAt.push(pts.length - 1);
  }

  /* cumulative arc length, so we can pay the thread out node by node */
  var cum = [0];
  for (var j = 1; j < pts.length; j++) {
    var ddx = pts[j].x - pts[j - 1].x, ddy = pts[j].y - pts[j - 1].y;
    cum.push(cum[j - 1] + Math.sqrt(ddx * ddx + ddy * ddy));
  }
  var TOTAL = cum[cum.length - 1];
  var nodeLen = nodeAt.map(function (idx) { return cum[idx]; });

  /* ---------- paint ---------- */

  var svg = document.getElementById("field");
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  var d = "M " + pts[0].x.toFixed(2) + " " + pts[0].y.toFixed(2);
  for (var p = 1; p < pts.length; p++) {
    d += " L " + pts[p].x.toFixed(2) + " " + pts[p].y.toFixed(2);
  }

  var thread = document.createElementNS(NS, "path");
  thread.setAttribute("id", "thread");
  thread.setAttribute("d", d);
  thread.setAttribute("stroke-dasharray", TOTAL);
  thread.setAttribute("stroke-dashoffset", TOTAL);
  svg.appendChild(thread);

  var halo = document.createElementNS(NS, "circle");
  halo.setAttribute("class", "halo");
  halo.setAttribute("r", 16);
  svg.appendChild(halo);

  var dots = nodes.map(function (nd) {
    var c = document.createElementNS(NS, "circle");
    c.setAttribute("class", "node is-unlit");
    c.setAttribute("cx", nd.x);
    c.setAttribute("cy", nd.y);
    c.setAttribute("r", nd.r);
    svg.appendChild(c);

    var hit = document.createElementNS(NS, "circle");   // generous tap target
    hit.setAttribute("class", "node-hit");
    hit.setAttribute("cx", nd.x);
    hit.setAttribute("cy", nd.y);
    hit.setAttribute("r", 20);
    hit.addEventListener("click", function () { go(nd.i); });
    svg.appendChild(hit);

    return c;
  });

  /* ---------- the text ---------- */

  var panel   = document.getElementById("panel");
  var counter = document.getElementById("counter");
  var hint    = document.getElementById("hint");
  var elPrompt = document.getElementById("prompt");
  var elA = document.getElementById("voice-a");
  var elB = document.getElementById("voice-b");
  var elSig = document.getElementById("sig");

  document.getElementById("name-a").textContent = PEOPLE.a;
  document.getElementById("name-b").textContent = PEOPLE.b;
  elSig.textContent = TITLE + " — " + SUBTITLE;

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function setVoice(el, text) {
    if (text && text.trim()) {
      el.textContent = text;
      el.className = "voice-line";
    } else {
      el.textContent = "not said yet";
      el.className = "voice-line is-empty";
    }
  }

  var current = -1;

  function go(next) {
    next = Math.max(-1, Math.min(N - 1, next));
    current = next;

    thread.setAttribute("stroke-dashoffset",
      current < 0 ? TOTAL : TOTAL - nodeLen[current]);

    dots.forEach(function (c, i) {
      c.setAttribute("class",
        "node " + (i === current ? "is-here" : (i < current ? "is-past" : "is-unlit")));
      c.setAttribute("r", i === current ? nodes[i].r + 1.5 : nodes[i].r);
    });

    if (current < 0) {
      halo.setAttribute("class", "halo");
      panel.className = "";
      counter.innerHTML = "<b>&mdash;</b> / " + N;
      hint.className = "";
      return;
    }

    halo.setAttribute("cx", nodes[current].x);
    halo.setAttribute("cy", nodes[current].y);
    halo.setAttribute("class", "halo is-on");

    var e = ENTRIES[current];
    elPrompt.textContent = e.prompt || "";
    setVoice(elA, e.a);
    setVoice(elB, e.b);

    counter.innerHTML = "<b>" + pad(e.n) + "</b> / " + N +
      "&nbsp;&nbsp;&nbsp;year " + (current < 12 ? "one" : "two");
    panel.className = "is-on";
    hint.className = "is-off";
  }

  /* ---------- moving through it ---------- */

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowRight" || ev.key === "ArrowDown" || ev.key === " " || ev.key === "Enter") {
      ev.preventDefault(); go(current + 1);
    } else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") {
      ev.preventDefault(); go(current - 1);
    } else if (ev.key === "Home") {
      ev.preventDefault(); go(-1);
    } else if (ev.key === "End") {
      ev.preventDefault(); go(N - 1);
    }
  });

  svg.addEventListener("click", function (ev) {
    if (ev.target === svg) go(current + 1);
  });

  var wheelLock = 0;
  window.addEventListener("wheel", function (ev) {
    var now = Date.now();
    if (now - wheelLock < 620) return;
    if (Math.abs(ev.deltaY) < 6) return;
    wheelLock = now;
    go(current + (ev.deltaY > 0 ? 1 : -1));
  }, { passive: true });

  var touchY = null;
  window.addEventListener("touchstart", function (ev) { touchY = ev.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchend", function (ev) {
    if (touchY === null) return;
    var dy = touchY - ev.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) go(current + (dy > 0 ? 1 : -1));
    touchY = null;
  }, { passive: true });

  go(-1);
})();
