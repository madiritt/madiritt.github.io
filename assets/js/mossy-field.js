/* Mossy silhouette field: tall grasses + dragonflies + hanging spiders,
   faded behind all content on every page. Replaces the former orb-web
   texture layer (removed 2026-07-06).

   Approved settings (Trevor + Madison, 2026-07-06, from the interactive
   mockup at _design-reference/grass-insects-mockup.html - reopen that file
   in a browser to retune, then update CONFIG here):
     grass       height 0.50 of viewport, opacity 0.12, amount 1.30
     dragonflies count 6, size 1.20, opacity 0.12
     spiders     count 6, size 1.00, opacity 0.12
   (opacity raised from 0.07 -> 0.12 on 2026-07-10 for a bit more visibility;
    still readable, cream text keeps high contrast over the green silhouettes)

   HARD RULE: no clipped imagery. The field is generated to the exact
   viewport size and regenerated on resize: blade tips and seed heads are
   clamped inside the canvas, figures are complete and clamped fully inside
   the viewport. Blades rise from the bottom edge (rooted, natural) and
   spider draglines run off the top edge (anchored above, natural).

   The layer is a fixed, pointer-events:none SVG at z-index -1 (above the
   body's gradient background, behind all content). Styling is inline from
   this script, so PurgeCSS cannot strip it; only the --mossy-sil color
   custom property lives in _sass/_mossy.scss (per theme). A MutationObserver
   re-renders on theme toggle so the silhouette color follows the theme. */

(function () {
  "use strict";

  var CONFIG = {
    grass: { height: 0.5, opacity: 0.12, density: 1.3 },
    dragonflies: { count: 6, size: 1.2, opacity: 0.12 },
    spiders: { count: 6, size: 1.0, opacity: 0.12 },
  };

  var SVG = "http://www.w3.org/2000/svg";
  var field = null;
  var seed = (Math.random() * 1e9) | 0; // fresh arrangement each page load

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function el(name, attrs) {
    var n = document.createElementNS(SVG, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function silColor() {
    var c = getComputedStyle(document.documentElement).getPropertyValue("--mossy-sil").trim();
    return c || "#52743f";
  }

  /* One tapered grass blade; the tip is clamped to [xmin, xmax] so no blade
     ever leans out of the canvas. */
  function blade(rand, x, ground, h, xmin, xmax) {
    var lean = (rand() * 2 - 1) * h * 0.5;
    lean = Math.min(Math.max(x + lean, xmin), xmax) - x;
    var w = 1.1 + rand() * 1.5 + h * 0.008;
    var tipX = x + lean;
    var tipY = ground - h;
    var cx = x + lean * 0.22;
    var cy = ground - h * 0.55;
    return (
      "M" + (x - w) + " " + ground +
      " Q" + (cx - w * 0.5) + " " + cy + " " + tipX + " " + tipY +
      " Q" + (cx + w * 0.5) + " " + cy + " " + (x + w) + " " + ground + " Z"
    );
  }

  /* A clump of blades around cx; some blades become timothy-style seed-head
     stems. maxH already leaves headroom so every tip stays inside the layer. */
  function clump(rand, g, cx, ground, maxH, color, xmin, xmax) {
    var n = 4 + Math.floor(rand() * 6);
    var tallestSeedTip = null;
    for (var i = 0; i < n; i++) {
      var x = cx + (rand() * 2 - 1) * 16;
      if (rand() < 0.16) {
        var h = maxH * (0.6 + rand() * 0.35);
        var headLen = 9 + rand() * 5 + maxH * 0.02;
        var stemH = h - headLen;
        var lean = (rand() * 2 - 1) * stemH * 0.35;
        lean = Math.min(Math.max(x + lean, xmin + 6), xmax - 6) - x;
        var tipX = x + lean;
        var tipY = ground - stemH;
        g.appendChild(
          el("path", {
            d: "M" + x + " " + ground + " Q" + (x + lean * 0.25) + " " + (ground - stemH * 0.55) + " " + tipX + " " + tipY,
            fill: "none",
            stroke: color,
            "stroke-width": (1.2 + maxH * 0.002).toFixed(2),
            "stroke-linecap": "round",
          })
        );
        var ang = (Math.atan2(-stemH * 0.45, lean * 0.75) * 180) / Math.PI + 90;
        g.appendChild(
          el("ellipse", {
            cx: tipX,
            cy: tipY - headLen * 0.45,
            rx: 2.6 + maxH * 0.004,
            ry: headLen * 0.55,
            fill: color,
            transform: "rotate(" + ang.toFixed(1) + " " + tipX + " " + tipY + ")",
          })
        );
        if (!tallestSeedTip || stemH > tallestSeedTip.h) {
          tallestSeedTip = { x: tipX, y: tipY - headLen, h: stemH };
        }
      } else {
        g.appendChild(el("path", { d: blade(rand, x, ground, maxH * (0.3 + rand() * 0.68), xmin, xmax), fill: color }));
      }
    }
    return tallestSeedTip;
  }

  function dragonfly(color, scale, rotate) {
    // top view: head, thorax, tapered abdomen, four wings
    var g = el("g", { fill: color });
    var wings = el("g", { opacity: "0.55" });
    wings.appendChild(el("ellipse", { cx: -21, cy: -13, rx: 20, ry: 4.2, transform: "rotate(-9 -21 -13)" }));
    wings.appendChild(el("ellipse", { cx: 21, cy: -13, rx: 20, ry: 4.2, transform: "rotate(9 21 -13)" }));
    wings.appendChild(el("ellipse", { cx: -18, cy: -4, rx: 18, ry: 5, transform: "rotate(-24 -18 -4)" }));
    wings.appendChild(el("ellipse", { cx: 18, cy: -4, rx: 18, ry: 5, transform: "rotate(24 18 -4)" }));
    g.appendChild(wings);
    g.appendChild(el("circle", { cx: 0, cy: -24, r: 3.6 }));
    g.appendChild(el("circle", { cx: -3, cy: -25.5, r: 2 }));
    g.appendChild(el("circle", { cx: 3, cy: -25.5, r: 2 }));
    g.appendChild(el("ellipse", { cx: 0, cy: -15, rx: 4.6, ry: 6.5 }));
    g.appendChild(el("path", { d: "M-2.4 -10 L-0.9 30 Q0 33 0.9 30 L2.4 -10 Z" }));
    g.setAttribute("data-halfsize", 46 * scale);
    g.setAttribute("data-t", "scale(" + scale + ") rotate(" + rotate + ")");
    return g;
  }

  function damselfly(color, scale) {
    // perched side view on the tallest seed head, wings folded
    var g = el("g", { fill: color });
    g.appendChild(el("circle", { cx: -7, cy: -3, r: 2.2 }));
    g.appendChild(el("ellipse", { cx: -3, cy: -1.5, rx: 3.4, ry: 2.6 }));
    g.appendChild(el("path", { d: "M-1 -2 L26 -17 L26.8 -15.6 L0.4 -0.2 Z" }));
    g.appendChild(el("ellipse", { cx: 8, cy: -8, rx: 10.5, ry: 2.1, opacity: "0.55", transform: "rotate(-29 8 -8)" }));
    var legs = el("g", { stroke: color, "stroke-width": "0.9", fill: "none", "stroke-linecap": "round" });
    legs.appendChild(el("path", { d: "M-4 1 L-6 6" }));
    legs.appendChild(el("path", { d: "M-2 1 L0 6" }));
    g.appendChild(legs);
    g.setAttribute("data-halfsize", 28 * scale);
    g.setAttribute("data-t", "scale(" + scale + ")");
    return g;
  }

  function spider(color, scale) {
    // hanging orb-weaver seen from behind: abdomen up toward the thread,
    // cephalothorax below, four leg pairs curving out
    var g = el("g", { fill: color });
    var legs = el("g", { stroke: color, fill: "none", "stroke-linecap": "round", "stroke-width": "1.2" });
    legs.appendChild(el("path", { d: "M2.5 -1 Q10 -7 13 -15" }));
    legs.appendChild(el("path", { d: "M3 0 Q12 -3 16 -8" }));
    legs.appendChild(el("path", { d: "M3 2 Q12 5 15 11" }));
    legs.appendChild(el("path", { d: "M2.5 3.5 Q9 10 10 17" }));
    var legsL = legs.cloneNode(true);
    legsL.setAttribute("transform", "scale(-1 1)");
    g.appendChild(legs);
    g.appendChild(legsL);
    g.appendChild(el("ellipse", { cx: 0, cy: -6.5, rx: 5.2, ry: 6.8 }));
    g.appendChild(el("circle", { cx: 0, cy: 2, r: 3.4 }));
    g.setAttribute("data-halfsize", 20 * scale);
    g.setAttribute("data-t", "scale(" + scale + ")");
    return g;
  }

  /* clamp a figure fully inside the viewport, then position it */
  function placeFigure(g, x, y, W, H) {
    var half = parseFloat(g.getAttribute("data-halfsize"));
    var cx = Math.min(Math.max(x, half + 14), W - half - 14);
    var cy = Math.min(Math.max(y, half + 14), H - half - 14);
    g.setAttribute("transform", "translate(" + cx + " " + cy + ") " + g.getAttribute("data-t"));
    return { x: cx, y: cy };
  }

  function render() {
    var W = window.innerWidth;
    var H = window.innerHeight;
    if (!field || W < 100 || H < 100) return;
    field.setAttribute("viewBox", "0 0 " + W + " " + H);
    field.setAttribute("width", W);
    field.setAttribute("height", H);
    while (field.firstChild) field.removeChild(field.firstChild);

    var rand = mulberry32(seed);
    var color = silColor();

    // fewer figures on narrow screens so phones don't feel crowded
    var crowd = Math.min(1, W / 1200);
    var dfCount = Math.max(1, Math.round(CONFIG.dragonflies.count * crowd));
    var spCount = Math.max(1, Math.round(CONFIG.spiders.count * crowd));

    var defs = el("defs", {});
    field.appendChild(defs);
    var grassG = el("g", { opacity: CONFIG.grass.opacity });
    var spiderG = el("g", { opacity: CONFIG.spiders.opacity });
    var dfG = el("g", { opacity: CONFIG.dragonflies.opacity });
    field.appendChild(grassG);
    field.appendChild(spiderG);
    field.appendChild(dfG);

    var bandH = Math.round(H * CONFIG.grass.height);
    var ground = H;
    var maxH = bandH - 16;

    var reach = 40;
    var xmin = 4;
    var xmax = W - 4;
    var seedTips = [];
    var x = reach + rand() * 60;
    while (x < W - reach) {
      if (rand() < 0.5) {
        var back = el("g", { opacity: "0.5" });
        grassG.appendChild(back);
        clump(rand, back, Math.min(Math.max(x + (rand() * 2 - 1) * 40, reach), W - reach), ground, maxH * 0.5, color, xmin, xmax);
      }
      var tip = clump(rand, grassG, x, ground, maxH * (0.7 + rand() * 0.3), color, xmin, xmax);
      if (tip) seedTips.push(tip);
      x += (95 + rand() * 190) / CONFIG.grass.density;
    }

    // figure placement with simple overlap avoidance
    var placed = [];
    function tryPlace(radius, genXY) {
      var p;
      for (var attempt = 0; attempt < 30; attempt++) {
        p = genXY();
        var ok = placed.every(function (q) {
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          return Math.sqrt(dx * dx + dy * dy) > radius + q.r;
        });
        if (ok) break;
      }
      placed.push({ x: p.x, y: p.y, r: radius });
      return p;
    }

    var i, scale;

    // dragonflies hover in the open air above the grass band
    for (i = 0; i < dfCount; i++) {
      scale = CONFIG.dragonflies.size * (0.65 + rand() * 0.45);
      var df = dragonfly(color, scale, -25 + rand() * 50);
      if (i > 0 && rand() < 0.5) df.setAttribute("opacity", "0.65"); // depth
      dfG.appendChild(df);
      var airTop = 70;
      var airBottom = Math.max(airTop + 40, H - bandH - 60);
      tryPlace(60 * scale, function () {
        return placeFigure(df, rand() * W, airTop + rand() * (airBottom - airTop), W, H);
      });
    }
    // the perched damselfly rides along whenever dragonflies are present
    if (dfCount > 0 && seedTips.length) {
      seedTips.sort(function (a, b) {
        return b.h - a.h;
      });
      var t = seedTips[0];
      var dm = damselfly(color, Math.min(CONFIG.dragonflies.size, 1.3));
      dfG.appendChild(dm);
      placeFigure(dm, t.x + 4, t.y - 4, W, H);
    }

    // spiders hang head-down from draglines anchored above the viewport
    for (i = 0; i < spCount; i++) {
      scale = CONFIG.spiders.size * (0.7 + rand() * 0.4);
      var sp = spider(color, scale);
      spiderG.appendChild(sp);
      var hangTop = 60 + 20 * scale;
      var hangBottom = Math.max(hangTop + 40, H * 0.55);
      var pos = tryPlace(70 * scale, function () {
        return placeFigure(sp, rand() * W, hangTop + rand() * (hangBottom - hangTop), W, H);
      });
      // dragline: from the top edge down to the abdomen (drawn behind the body).
      // Faded along its length (invisible for the top half, easing in near the
      // spider) so a long line never cuts across page content as an artifact
      // (Trevor, 2026-07-12: the solid line read as a rendering glitch).
      var dragEnd = pos.y - 12 * scale;
      var gradId = "mossy-dragfade-" + i;
      var grad = el("linearGradient", {
        id: gradId,
        gradientUnits: "userSpaceOnUse",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: dragEnd,
      });
      grad.appendChild(el("stop", { offset: "0", "stop-color": color, "stop-opacity": "0" }));
      grad.appendChild(el("stop", { offset: "0.5", "stop-color": color, "stop-opacity": "0" }));
      grad.appendChild(el("stop", { offset: "1", "stop-color": color, "stop-opacity": "0.55" }));
      defs.appendChild(grad);
      spiderG.insertBefore(
        el("line", {
          x1: pos.x,
          y1: 0,
          x2: pos.x,
          y2: dragEnd,
          stroke: "url(#" + gradId + ")",
          "stroke-width": "0.9",
        }),
        sp
      );
    }
  }

  function init() {
    try {
      field = el("svg", { id: "mossy-field", "aria-hidden": "true" });
      // inline styles: PurgeCSS-proof, no stylesheet dependency
      field.style.position = "fixed";
      field.style.top = "0";
      field.style.left = "0";
      field.style.width = "100vw";
      field.style.height = "100vh";
      field.style.zIndex = "-1";
      field.style.pointerEvents = "none";
      document.body.insertBefore(field, document.body.firstChild);
      render();

      var resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(render, 150);
      });

      // follow the light/dark toggle (al-folio flips data-theme on <html>)
      new MutationObserver(render).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    } catch (e) {
      // decorative layer only: never let it break the page
      console.error("mossy-field failed to initialize:", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
