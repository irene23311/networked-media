/**
 * pattern-engine.js
 * -----------------
 * Maps personality trait scores to a visual crochet pattern drawn on a canvas.
 *
 * ── TRAIT AXES (all 0–1) ──────────────────────────────────────────────────
 *   calm     → how tranquil the layout feels (speed of motion, regularity)
 *   density  → how close/tight vs open/sparse the stitches are
 *   social   → extroverted = open blooms; introverted = tight closed forms
 *   symmetry → structured grid vs free organic placement
 *   warmth   → cool pastels vs warm rosy tones
 *
 * ── PATTERN ARCHETYPES ──────────────────────────────────────────────────
 *   1. "Quiet Grid"        calm↑ density↑ symmetry↑ social↓
 *   2. "Scattered Blooms"  calm↓ density↓ symmetry↓ social↑
 *   3. "Spiral Garden"     calm↑ density↓ symmetry↑ warmth↑
 *   4. "Dense Weave"       density↑ symmetry↑ calm↑ social↓
 *   5. "Wild Lace"         calm↓ symmetry↓ social↑ density↓
 *   6. "Ripple Wave"       calm↑ symmetry↑ density↓ social↑
 *
 * The archetype is chosen by finding the best dot-product match to the
 * user's trait vector — so it feels EARNED, not random.
 */

// ─── Color Palettes ──────────────────────────────────────────────────────────
// Each palette is a set of yarn-inspired pastels.
// warmth 0 → cool palette; warmth 1 → warm palette
const PALETTES = {
  cool: {
    bg:      "#F4F0F8",
    primary: "#C4B8D8",  // lavender
    accent:  "#9EBFB4",  // mint
    mid:     "#B8D0D8",  // ice blue
    dark:    "#6B7F8A",  // dusty teal
  },
  warm: {
    bg:      "#FAF2EC",
    primary: "#F2C4B0",  // blush
    accent:  "#E8D4A0",  // gold
    mid:     "#D4C8B0",  // sand
    dark:    "#B07860",  // terracotta
  },
  mixed: {
    bg:      "#F4F4EE",
    primary: "#C8C4D8",  // soft purple
    accent:  "#C8D8C0",  // sage
    mid:     "#E0D0C0",  // warm gray
    dark:    "#807870",  // taupe
  }
};

const ARCHETYPES = [
  {
    id: "quiet-grid",
    name: "The Quiet Grid",
    signature: { calm: 0.85, density: 0.85, symmetry: 0.9, social: 0.2, warmth: 0.4 },
    traits: ["Introspective", "Methodical", "Self-contained"],
    explanation: "Your pattern is a meditative grid — each stitch placed with intention, never rushed. The tight, even spacing reflects someone who finds peace in consistency. You notice the small things others miss, and you give them care.",
    draw: drawQuietGrid,
    meta: { yarn: "DK weight", hook: "4mm (US G)", skill: "Beginner" },
    steps: [
      "Make a foundation chain of 20 stitches (ch 20).",
      "Row 1: Single crochet (sc) in the 2nd chain from hook, sc across. (19 sc)",
      "Chain 1, turn. Repeat Row 1 for every subsequent row.",
      "After 19 rows, you'll have a square. The tight grid is your pattern.",
      "Fasten off. Weave in ends with a yarn needle in neat, small loops.",
      "Optional: add a border of slip stitches (sl st) around all 4 edges.",
    ],
  },

  {
    id: "scattered-blooms",
    name: "Scattered Blooms",
    signature: { calm: 0.15, density: 0.25, symmetry: 0.1, social: 0.9, warmth: 0.85 },
    traits: ["Spontaneous", "Social", "Expressive"],
    explanation: "Your pattern bursts outward — open, warm, never the same twice. Like you, it fills any space it enters. The irregular blossoms signal someone who connects easily and brings color wherever they go.",
    draw: drawScatteredBlooms,
    meta: { yarn: "Worsted weight", hook: "5mm (US H)", skill: "Beginner" },
    steps: [
      "Create a magic ring: loop the yarn, insert hook, pull up a loop.",
      "Ch 3 (counts as first dc), work 11 dc into the ring. (12 dc total)",
      "Pull tail to close the ring. Sl st to top of ch-3 to join.",
      "Round 2: Ch 1, *sc in next dc, ch 3, skip 1 dc* — repeat around. (6 loops)",
      "Fasten off, leaving a long tail. Make several flowers in different colors.",
      "Arrange on a background and sew in place with the tail — let them scatter freely.",
    ],
  },

  {
    id: "spiral-garden",
    name: "The Spiral Garden",
    signature: { calm: 0.8, density: 0.4, symmetry: 0.7, social: 0.45, warmth: 0.75 },
    traits: ["Curious", "Nurturing", "Centred"],
    explanation: "Spirals from a still centre — your pattern expands outward in organized layers. You have an inner world that radiates warmth, but you're selective about where that warmth goes. Growth is part of your nature.",
    draw: drawSpiralGarden,
    meta: { yarn: "DK weight", hook: "4mm (US G)", skill: "Beginner" },
    steps: [
      "Start with a magic ring. Ch 1, work 6 sc into ring. Do not join — work in a continuous spiral.",
      "Round 2: Work 2 sc in every stitch around. (12 sc)",
      "Round 3: *Sc in next st, inc* — repeat around. (18 sc)",
      "Round 4: *Sc in next 2 sts, inc* — repeat around. (24 sc)",
      "Continue the pattern: add 1 plain sc before each inc per round. This is how granny circles are made!",
      "Fasten off after round 6 (36 sc) for a small coaster, or keep going for a larger piece.",
    ],
  },

  {
    id: "dense-weave",
    name: "The Dense Weave",
    signature: { calm: 0.7, density: 0.95, symmetry: 0.75, social: 0.2, warmth: 0.35 },
    traits: ["Detail-oriented", "Resilient", "Focused"],
    explanation: "Every element of your pattern is interlocked — nothing is left to chance. The dense, overlapping structure mirrors the way you build things to last. You process deeply and hold space for complexity.",
    draw: drawDenseWeave,
    meta: { yarn: "Fingering weight", hook: "3mm (US C)", skill: "Beginner" },
    steps: [
      "Ch 21 for your foundation. Sc in 2nd ch from hook, sc across. (20 sc)",
      "Row 2: Ch 2, turn. Hdc in back loop only (BLO) of every stitch across. (20 hdc)",
      "Row 3: Ch 1, turn. Sc in BLO of every stitch across. (20 sc)",
      "Alternate rows 2 and 3. Working in BLO creates a ridge texture — dense and structured.",
      "After 30 rows, you'll have a firm, textured rectangle — a washcloth or coaster.",
      "Fasten off and add a border of single crochets for clean edges.",
    ],
  },

  {
    id: "wild-lace",
    name: "Wild Lace",
    signature: { calm: 0.2, density: 0.15, symmetry: 0.1, social: 0.8, warmth: 0.7 },
    traits: ["Free-spirited", "Energetic", "Adventurous"],
    explanation: "Open spaces and unexpected tangles — your pattern refuses to be contained. The lace-like gaps are where your energy breathes. You're someone who leaves room for improvisation and trusts the process.",
    draw: drawWildLace,
    meta: { yarn: "Lace weight", hook: "3.5mm (US E)", skill: "Beginner-friendly" },
    steps: [
      "Ch 28. Sc in 4th ch from hook, *ch 2, skip 2 ch, sc in next ch* — repeat to end.",
      "Row 2: Ch 5, turn. *Sc in ch-2 space, ch 2* — repeat, ending with dc in last sc.",
      "Row 3: Ch 3, turn. *Sc in ch-2 sp, ch 2* — repeat, dc in last ch-5 sp.",
      "Repeat rows 2–3. The offset creates a diagonal mesh — airy and free.",
      "Work as many rows as you like — the pattern grows naturally from there.",
      "Fasten off. Block by pinning flat on foam and lightly dampening with water.",
    ],
  },

  {
    id: "ripple-wave",
    name: "The Ripple Wave",
    signature: { calm: 0.75, density: 0.35, symmetry: 0.8, social: 0.7, warmth: 0.6 },
    traits: ["Balanced", "Social", "Calming"],
    explanation: "Your pattern moves in waves — structured enough to feel safe, open enough to breathe. The ripple is both active and serene, like you: able to hold space for others without losing your own rhythm.",
    draw: drawRippleWave,
    meta: { yarn: "Worsted weight", hook: "5mm (US H)", skill: "Beginner" },
    steps: [
      "Ch multiple of 12 + 3 (try ch 27 to start).",
      "Row 1: Dc in 4th ch from hook, dc in next 3 sts, *skip 2, dc in next 5, 3 dc in next st, dc in next 5, skip 2* — repeat, ending 2 dc in last ch.",
      "Row 2: Ch 3, turn. Dc in same st, dc in next 4, *skip 2, dc in next 5, 3 dc in next st, dc in next 5, skip 2* — repeat.",
      "Rows 2 is the ripple repeat. Work it over and over.",
      "Change yarn color every 2–3 rows for a classic chevron blanket effect.",
      "The wave pattern grows quickly — great for a cozy scarf or baby blanket.",
    ],
  },
];

// ─── Core: Score & Select Archetype ─────────────────────────────────────────

/**
 * Given a traits object, find the best-matching archetype.
 * Uses weighted dot-product similarity between trait vectors.
 *
 * @param {object} traits - { calm, density, social, symmetry, warmth }
 * @returns {object} the best matching archetype
 */
function selectArchetype(traits) {
  const axes = ["calm", "density", "social", "symmetry", "warmth"];

  let bestScore = -Infinity;
  let bestArchetype = ARCHETYPES[0];

  for (const arch of ARCHETYPES) {
    let score = 0;
    for (const axis of axes) {
      const userVal = traits[axis] ?? 0.5;
      const archVal = arch.signature[axis] ?? 0.5;
      // Squared similarity — penalizes large differences
      score -= Math.pow(userVal - archVal, 2);
    }
    if (score > bestScore) {
      bestScore = score;
      bestArchetype = arch;
    }
  }

  return bestArchetype;
}

/**
 * Given a traits object, determine which color palette to use.
 * warmth > 0.6 → warm; warmth < 0.4 → cool; else mixed
 */
function selectPalette(traits) {
  if (traits.warmth > 0.6) return PALETTES.warm;
  if (traits.warmth < 0.4) return PALETTES.cool;
  return PALETTES.mixed;
}

// ─── Pattern Drawing Functions ───────────────────────────────────────────────
// Each function receives (ctx, width, height, traits, palette)
// and draws the pattern onto the canvas context.

/**
 * QUIET GRID: calm, dense, symmetrical
 * Regular dots or crosses arranged in a strict grid.
 * Density → spacing; calm → size uniformity.
 */
function drawQuietGrid(ctx, W, H, traits, palette) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const spacing = Math.round(lerp(28, 18, traits.density));
  const dotRadius = Math.round(lerp(3, 6, traits.density));

  const cols = Math.floor(W / spacing);
  const rows = Math.floor(H / spacing);
  const offsetX = (W - cols * spacing) / 2;
  const offsetY = (H - rows * spacing) / 2;

  // Subtle jitter based on calm (calm=1 → no jitter; calm=0 → more jitter)
  const jitter = lerp(0, spacing * 0.25, 1 - traits.calm);

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const x = offsetX + c * spacing + rand(jitter);
      const y = offsetY + r * spacing + rand(jitter);

      // Alternate dot styles based on symmetry
      if (traits.symmetry > 0.6) {
        // Symmetrical: clean circles
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = (r + c) % 2 === 0 ? palette.primary : palette.accent;
        ctx.fill();
      } else {
        // Less symmetrical: small squares
        ctx.fillStyle = palette.primary;
        ctx.fillRect(x - dotRadius, y - dotRadius, dotRadius * 2, dotRadius * 2);
      }
    }
  }

  // Cross-hatch lines for high density
  if (traits.density > 0.7) {
    ctx.strokeStyle = palette.mid;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY + r * spacing);
      ctx.lineTo(W - offsetX, offsetY + r * spacing);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}

/**
 * SCATTERED BLOOMS: chaotic, open, extroverted
 * Flower-like shapes at irregular positions.
 * social → petal count; warmth → color intensity.
 */
function drawScatteredBlooms(ctx, W, H, traits, palette) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const count = Math.round(lerp(8, 22, traits.social));
  const petalCount = Math.round(lerp(4, 8, traits.social));
  const baseRadius = lerp(18, 32, traits.warmth);

  // Seed positions pseudo-randomly but reproducibly
  const positions = [];
  let sx = 0.5, sy = 0.3;
  for (let i = 0; i < count; i++) {
    // Deterministic pseudo-random using golden ratio
    sx = (sx + 0.618033) % 1;
    sy = (sy + 0.381966) % 1;
    positions.push({ x: sx * W * 0.85 + W * 0.075, y: sy * H * 0.85 + H * 0.075 });
  }

  for (let i = 0; i < positions.length; i++) {
    const { x, y } = positions[i];
    const radius = baseRadius * (0.6 + (i % 5) * 0.12);
    const color = i % 3 === 0 ? palette.primary : (i % 3 === 1 ? palette.accent : palette.mid);

    drawFlower(ctx, x, y, radius, petalCount, color, palette.dark);
  }
}

function drawFlower(ctx, x, y, r, petals, fillColor, centerColor) {
  const petalLength = r;
  const petalWidth = r * 0.4;

  ctx.save();
  ctx.translate(x, y);
  for (let p = 0; p < petals; p++) {
    const angle = (p / petals) * Math.PI * 2;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, -petalLength / 2, petalWidth, petalLength / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.globalAlpha = 0.75;
    ctx.fill();
    ctx.restore();
  }
  // Centre dot
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = centerColor;
  ctx.globalAlpha = 0.9;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
}

/**
 * SPIRAL GARDEN: calm, medium density, symmetrical
 * Concentric spirals from centre outward.
 * calm → tightness of spiral; warmth → color gradient.
 */
function drawSpiralGarden(ctx, W, H, traits, palette) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const spiralCount = Math.round(lerp(2, 5, traits.density));
  const turns = lerp(2, 5, traits.calm);
  const maxRadius = Math.min(W, H) * 0.44;

  for (let s = 0; s < spiralCount; s++) {
    const angleOffset = (s / spiralCount) * Math.PI * 2;
    const colorArr = [palette.primary, palette.accent, palette.mid, palette.dark];
    const color = colorArr[s % colorArr.length];

    drawArchimedeanSpiral(ctx, W / 2, H / 2, maxRadius, turns, angleOffset, color, traits);
  }

  // Central dot
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 5, 0, Math.PI * 2);
  ctx.fillStyle = palette.dark;
  ctx.fill();
}

function drawArchimedeanSpiral(ctx, cx, cy, maxR, turns, offset, color, traits) {
  const steps = Math.round(turns * 120);
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = offset + t * turns * Math.PI * 2;
    const r = t * maxR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lerp(1.5, 3.5, traits.density);
  ctx.globalAlpha = 0.7;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/**
 * DENSE WEAVE: very dense, symmetrical, structured
 * Interlocking hatched lines creating a textile-like texture.
 * density → line spacing; symmetry → alternation regularity.
 */
function drawDenseWeave(ctx, W, H, traits, palette) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const spacing = Math.round(lerp(20, 8, traits.density));
  const lineW = lerp(1, 2.5, traits.density);

  // Horizontal rows
  ctx.lineWidth = lineW;
  for (let y = spacing / 2; y < H; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.strokeStyle = palette.primary;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
  }

  // Vertical columns (offset for weave effect)
  for (let x = spacing / 2; x < W; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.strokeStyle = palette.accent;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Over-under dots at intersections for weave look
  for (let y = spacing / 2; y < H; y += spacing) {
    for (let x = spacing / 2; x < W; x += spacing) {
      const over = (Math.floor(y / spacing) + Math.floor(x / spacing)) % 2 === 0;
      ctx.beginPath();
      ctx.arc(x, y, lineW * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = over ? palette.primary : palette.accent;
      ctx.globalAlpha = 0.85;
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

/**
 * WILD LACE: sparse, chaotic, energetic
 * Irregular connected nodes with loose thread-like curves.
 * social → node count; calm → edge curvature wildness.
 */
function drawWildLace(ctx, W, H, traits, palette) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const nodeCount = Math.round(lerp(12, 30, traits.social));
  const curviness = lerp(0.1, 0.6, 1 - traits.calm);

  // Generate nodes with golden-ratio distribution
  const nodes = [];
  let gx = 0.15, gy = 0.23;
  for (let i = 0; i < nodeCount; i++) {
    gx = (gx + 0.618033) % 1;
    gy = (gy + 0.381966) % 1;
    nodes.push({
      x: gx * W * 0.9 + W * 0.05,
      y: gy * H * 0.9 + H * 0.05,
    });
  }

  // Draw connecting curves
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.45;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < W * 0.3) {
        const cx1 = nodes[i].x + dy * curviness;
        const cy1 = nodes[i].y - dx * curviness;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.quadraticCurveTo(cx1, cy1, nodes[j].x, nodes[j].y);
        ctx.strokeStyle = palette.primary;
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;

  // Draw nodes
  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = palette.dark;
    ctx.fill();
  }
}

/**
 * RIPPLE WAVE: calm, structured, social
 * Sine-wave rows with gentle frequency.
 * social → amplitude; calm → frequency (calm = fewer ripples).
 */
function drawRippleWave(ctx, W, H, traits, palette) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const rowCount = Math.round(lerp(5, 14, traits.density * 0.5 + 0.25));
  const amplitude = lerp(8, 28, traits.social);
  const frequency = lerp(1.5, 4, 1 - traits.calm);
  const rowSpacing = H / (rowCount + 1);

  const colors = [palette.primary, palette.accent, palette.mid, palette.dark, palette.primary];

  ctx.lineWidth = lerp(3, 6, traits.density);
  ctx.lineCap = "round";

  for (let r = 0; r < rowCount; r++) {
    const baseY = rowSpacing * (r + 1);
    const color = colors[r % colors.length];
    const phase = (r / rowCount) * Math.PI * 0.5; // Slight phase offset per row

    ctx.beginPath();
    for (let x = 0; x <= W; x += 2) {
      const wave = amplitude * Math.sin((x / W) * frequency * Math.PI * 2 + phase);
      const y = baseY + wave;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.6 + (r % 2) * 0.15;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Linear interpolation */
function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

/**
 * Deterministic "random" within range — used to add jitter
 * without true randomness so the pattern is reproducible.
 */
let _seed = 0;
function seededRand(range) {
  _seed = (_seed * 9301 + 49297) % 233280;
  return (_seed / 233280) * range * 2 - range;
}
// rand() wrapper — uses seeded version during drawing
let rand = (r) => seededRand(r);

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Main entry point.
 * Given traits and a canvas, selects the best archetype,
 * draws the pattern, and returns the selected archetype.
 *
 * @param {object}           traits - { calm, density, social, symmetry, warmth }
 * @param {HTMLCanvasElement} canvas
 * @returns {object} the selected archetype
 */
function generatePattern(traits, canvas) {
  _seed = Math.round(Object.values(traits).reduce((a, b) => a + b * 1000, 0)); // Seed from traits

  const archetype = selectArchetype(traits);
  const palette = selectPalette(traits);

  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d");

  // Clear
  ctx.clearRect(0, 0, W, H);

  // Draw the archetype's pattern
  archetype.draw(ctx, W, H, traits, palette);

  return archetype;
}
