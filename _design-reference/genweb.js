// Generator for the Mossy seamless orb-weaver web tile used as the sitewide
// background field. Builds an even triangular SPOKE lattice (frame / radial
// threads) plus two concentric CONCAVE catch-rings at every node (the capture
// spiral, sagging inward between spokes like real silk). Every node is identical
// and rings interlock with neighbors, so the field reads as one continuous
// geometric net rather than a grid of separate cartoon webs.
//
// Run:  node _design-reference/genweb.js
// Then paste the printed `data:image/svg+xml,...` value into the $mossy-web
// variable in _sass/_mossy.scss, and keep mask-size at the tile's 1:1.732 ratio.
//
// Tuning: `radii` (ring sizes / how many spiral turns show), `sag` (how much the
// catch thread bows inward), `s` (lattice spacing in viewBox units), and the two
// stroke-width values below (thread weight). Density on screen is set by
// mask-size in the SCSS, not here.

const s = 60;                       // node spacing
const h = +(s * Math.sin(Math.PI / 3)).toFixed(4); // row height = 51.9615
const W = s;                        // tile width
const H = +(2 * h).toFixed(4);      // tile height = 103.9230

const r = (n) => +n.toFixed(2);

// --- Spoke lattice: three line families at 0/60/120 deg --------------------
const spokes = [
  `M0 0H${W}`,                      // horizontal row (top; bottom supplied by next tile)
  `M0 ${h}H${W}`,                   // horizontal row (middle)
  `M0 ${H}L${W} 0`,                 // "/" diagonal
  `M0 0L${W} ${H}`,                 // "\" diagonal
];

// --- Concentric concave catch-rings around each hub ------------------------
// Vertices point along the 6 spoke directions (0,60,...,300). Four radii read
// as four turns of the capture spiral; the outer (34) is > s/2 (30) so each
// hub's outermost ring OVERLAPS its neighbors and fills the triangle voids,
// so the field reads as one continuous dense web with no blank gaps.
const radii = [10, 18, 26, 34];
const sag = 0.84; // how far the catch thread bows in toward the hub (0..1)
const hex = (cx, cy, rad) => {
  const v = [];
  for (let k = 0; k < 6; k++) {
    const a = (k * 60) * Math.PI / 180;
    v.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
  }
  // Concave catch-thread: quadratic curve between vertices, control point
  // pulled inward toward the hub so each span sags like real spider silk.
  let d = `M${r(v[0][0])} ${r(v[0][1])}`;
  for (let k = 0; k < 6; k++) {
    const mid = (k * 60 + 30) * Math.PI / 180;
    const cxp = cx + rad * sag * Math.cos(mid);
    const cyp = cy + rad * sag * Math.sin(mid);
    const nxt = v[(k + 1) % 6];
    d += `Q${r(cxp)} ${r(cyp)} ${r(nxt[0])} ${r(nxt[1])}`;
  }
  return d + 'Z';
};

// Hubs whose rings touch the tile: 4 corners + the offset center node. Each
// contributes its slice; the repeat completes parts that overflow the tile.
const hubs = [[0, 0], [W, 0], [0, H], [W, H], [s / 2, h]];
const rings = [];
for (const [cx, cy] of hubs) for (const rad of radii) rings.push(hex(cx, cy, rad));

const svg =
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}'>` +
  `<g fill='none' stroke='#fff' stroke-linecap='round'>` +
  `<path d='${spokes.join('')}' stroke-width='0.5'/>` +
  `<path d='${rings.join('')}' stroke-width='0.45'/>` +
  `</g></svg>`;

// URL-encode the way SCSS url() wants it.
const enc = svg
  .replace(/#/g, '%23')
  .replace(/</g, '%3C')
  .replace(/>/g, '%3E')
  .replace(/"/g, "'");

console.log('viewBox: 0 0 ' + W + ' ' + H + '  (keep mask-size ratio 1:1.732)');
console.log('data:image/svg+xml,' + enc);
