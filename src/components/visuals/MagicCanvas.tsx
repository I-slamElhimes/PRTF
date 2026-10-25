"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { clamp, lerp, seeded } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────────────────
 *  THE LIVING BACKGROUND
 *
 *  One canvas, one requestAnimationFrame loop, three layers:
 *
 *    1. Stardust     — parallax particles giving the void depth
 *    2. Constellation— named technology nodes joined by faint links
 *    3. Butterflies  — each carrying the name of a language or framework,
 *                      flying cubic-Bézier paths at different depths
 *
 *  The layers talk to each other: when a butterfly passes close to a
 *  technology node, that node ignites and its links flare. Code becomes light.
 *
 *  Everything is drawn imperatively rather than as React elements — a hundred
 *  particle components would cost far more than a hundred draw calls.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Names the butterflies carry through the universe. */
const WING_LABELS = [
  "PHP",
  "React",
  "JavaScript",
  "Java",
  "SQL",
  "NoSQL",
  "Python",
  "TypeScript",
  "Laravel",
  "FastAPI",
  "Angular",
  "Docker",
] as const;

/** The fixed constellation. Positions are fractions of the viewport. */
const NODES = [
  { label: "AI", x: 0.5, y: 0.18, weight: 1 },
  { label: "DATA", x: 0.26, y: 0.3, weight: 1 },
  { label: "RAG", x: 0.72, y: 0.28, weight: 1 },
  { label: "LLM", x: 0.85, y: 0.44, weight: 0.9 },
  { label: "PYTHON", x: 0.14, y: 0.52, weight: 0.9 },
  { label: "API", x: 0.38, y: 0.62, weight: 0.8 },
  { label: "VISION", x: 0.63, y: 0.66, weight: 0.8 },
  { label: "DOCKER", x: 0.88, y: 0.76, weight: 0.7 },
  { label: "SQL", x: 0.22, y: 0.82, weight: 0.7 },
  { label: "ML", x: 0.55, y: 0.86, weight: 0.8 },
] as const;

/** Which nodes are joined. Indices into NODES. */
const LINKS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [0, 2],
  [2, 3],
  [4, 1],
  [1, 5],
  [5, 6],
  [6, 3],
  [3, 7],
  [8, 5],
  [5, 9],
  [9, 6],
  [4, 8],
];

interface Butterfly {
  /** Cubic Bézier control points, in normalised viewport space. */
  p0x: number; p0y: number;
  p1x: number; p1y: number;
  p2x: number; p2y: number;
  p3x: number; p3y: number;
  t: number;
  speed: number;
  /** 0 = far background, 1 = close to the viewer. */
  depth: number;
  label: string;
  flap: number;
  flapSpeed: number;
  wobbleAmp: number;
  wobbleFreq: number;
  gradient: number;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  depth: number;
  drift: number;
  phase: number;
}

function makeButterfly(index: number, total: number): Butterfly {
  const s = (n: number) => seeded(index * 17.13 + n);
  // Alternate travel direction so the field never reads as a single current.
  const leftToRight = index % 2 === 0;
  const startX = leftToRight ? -0.15 - s(1) * 0.2 : 1.15 + s(1) * 0.2;
  const endX = leftToRight ? 1.15 + s(2) * 0.2 : -0.15 - s(2) * 0.2;
  const depth = 0.15 + (index / Math.max(total - 1, 1)) * 0.85;

  return {
    p0x: startX,
    p0y: 0.1 + s(3) * 0.8,
    p1x: lerp(startX, endX, 0.3),
    p1y: s(4) * 0.9 + 0.05,
    p2x: lerp(startX, endX, 0.7),
    p2y: s(5) * 0.9 + 0.05,
    p3x: endX,
    p3y: 0.1 + s(6) * 0.8,
    t: s(7),
    // Nearer butterflies cross faster — classic parallax cue.
    speed: (0.000055 + s(8) * 0.00009) * lerp(0.55, 1.5, depth),
    depth,
    label: WING_LABELS[index % WING_LABELS.length]!,
    flap: s(9) * Math.PI * 2,
    flapSpeed: 0.16 + s(10) * 0.13,
    wobbleAmp: 0.012 + s(11) * 0.03,
    wobbleFreq: 2 + s(12) * 3.5,
    gradient: index % 4,
  };
}

function respawn(b: Butterfly, index: number, total: number): void {
  const fresh = makeButterfly(index + Math.floor(Math.random() * 997), total);
  Object.assign(b, fresh, { t: 0, depth: b.depth, label: b.label });
}

/** Cubic Bézier value and derivative at t. */
function bezier(a: number, b: number, c: number, d: number, t: number): number {
  const mt = 1 - t;
  return mt * mt * mt * a + 3 * mt * mt * t * b + 3 * mt * t * t * c + t * t * t * d;
}
function bezierSlope(a: number, b: number, c: number, d: number, t: number): number {
  const mt = 1 - t;
  return 3 * mt * mt * (b - a) + 6 * mt * t * (c - b) + 3 * t * t * (d - c);
}

/** Soft radial sprite, drawn once and blitted — never `shadowBlur`. */
function makeGlow(size: number, inner: string, outer: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, inner);
    grad.addColorStop(0.4, outer);
    grad.addColorStop(1, "rgba(168,85,247,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  return c;
}

interface MagicCanvasProps {
  /** `soft` thins everything out for content-heavy sections. */
  variant?: "full" | "soft";
  className?: string;
}

export function MagicCanvas({ variant = "full", className }: MagicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pointer = useRef({ tx: 0.5, ty: 0.5, x: 0.5, y: 0.5, active: false });
  const visible = useRef(true);

  const onPointerMove = useCallback((event: PointerEvent) => {
    pointer.current.tx = event.clientX / window.innerWidth;
    pointer.current.ty = event.clientY / window.innerHeight;
    pointer.current.active = true;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    /* ── Device tiering ─────────────────────────────────────────────────── */
    const w0 = window.innerWidth;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowPower = coarse || (navigator.hardwareConcurrency ?? 4) <= 4;
    const soft = variant === "soft";

    const butterflyCount = prefersReducedMotion
      ? 3
      : w0 < 640
        ? soft ? 3 : 5
        : w0 < 1024
          ? soft ? 5 : 8
          : lowPower
            ? soft ? 6 : 9
            : soft ? 8 : 13;

    const particleCount = w0 < 640 ? 34 : w0 < 1024 ? 60 : lowPower ? 80 : 120;
    const maxDpr = w0 < 640 ? 1.5 : lowPower ? 1.75 : 2;
    const showConstellation = !soft;

    /* ── Population ─────────────────────────────────────────────────────── */
    const butterflies: Butterfly[] = Array.from({ length: butterflyCount }, (_, i) =>
      makeButterfly(i, butterflyCount),
    );

    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: seeded(i * 3.7),
      y: seeded(i * 5.1 + 40),
      r: 0.5 + seeded(i * 7.3) * 1.6,
      depth: 0.2 + seeded(i * 11.9) * 0.8,
      drift: (seeded(i * 13.1) - 0.5) * 0.00006,
      phase: seeded(i * 2.9) * Math.PI * 2,
    }));

    /** Ignition level per node, 0..1, decays every frame. */
    const heat = new Float32Array(NODES.length);

    /* ── Sprites & gradients (built once) ───────────────────────────────── */
    const glowRose = makeGlow(72, "rgba(244,114,182,0.75)", "rgba(236,72,153,0.22)");
    const glowViolet = makeGlow(72, "rgba(216,180,254,0.75)", "rgba(168,85,247,0.22)");
    const glowStar = makeGlow(48, "rgba(255,255,255,0.9)", "rgba(216,180,254,0.25)");

    // Wing gradients live in local (pre-transform) space, so a single object
    // renders correctly under every butterfly's transform.
    const wingGradients = [
      ["#f472b6", "#a855f7"],
      ["#ec4899", "#7c5cf0"],
      ["#d8b4fe", "#ec4899"],
      ["#c084fc", "#f9a8d4"],
    ].map(([from, to]) => {
      const g = ctx.createLinearGradient(-18, -16, 18, 16);
      g.addColorStop(0, from!);
      g.addColorStop(1, to!);
      return g;
    });

    let W = 0;
    let H = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    /* ── Butterfly rendering ────────────────────────────────────────────── */
    const drawWing = (sign: number, squash: number, scale: number) => {
      ctx.save();
      ctx.scale(sign * squash, 1);
      // Upper wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(3, -11 * scale, 14 * scale, -16 * scale, 17 * scale, -7 * scale);
      ctx.bezierCurveTo(19 * scale, -1, 10 * scale, 2, 0, 0);
      ctx.fill();
      // Lower wing
      ctx.beginPath();
      ctx.moveTo(0, 1);
      ctx.bezierCurveTo(7 * scale, 3, 13 * scale, 7 * scale, 11 * scale, 12 * scale);
      ctx.bezierCurveTo(8 * scale, 16 * scale, 2, 9 * scale, 0, 1);
      ctx.fill();
      ctx.restore();
    };

    const drawButterfly = (b: Butterfly, px: number, py: number, angle: number) => {
      const scale = lerp(0.42, 1.15, b.depth);
      const alpha = lerp(0.22, 0.92, b.depth);
      const squash = 0.28 + 0.72 * Math.abs(Math.cos(b.flap));

      // Aura — sells both the glow and the depth-of-field of far butterflies.
      const auraSize = 62 * scale * lerp(1.5, 1, b.depth);
      ctx.globalAlpha = alpha * lerp(0.5, 0.28, b.depth);
      ctx.drawImage(
        b.gradient % 2 === 0 ? glowRose : glowViolet,
        px - auraSize / 2,
        py - auraSize / 2,
        auraSize,
        auraSize,
      );

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = wingGradients[b.gradient] ?? wingGradients[0]!;

      drawWing(-1, squash, 1);
      drawWing(1, squash, 1);

      // Body
      ctx.globalAlpha = alpha * 0.95;
      ctx.fillStyle = "rgba(255,235,250,0.85)";
      ctx.beginPath();
      ctx.ellipse(0, 1.5, 1.5, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Antennae
      ctx.strokeStyle = "rgba(255,225,245,0.5)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.quadraticCurveTo(-3, -11, -6, -12);
      ctx.moveTo(0, -5);
      ctx.quadraticCurveTo(3, -11, 6, -12);
      ctx.stroke();
      ctx.restore();

      // The technology it carries — only for the nearer ones, or the field
      // turns into a word cloud.
      if (b.depth > 0.52) {
        ctx.globalAlpha = (b.depth - 0.52) * 1.5;
        ctx.font = `400 ${Math.round(8.5 * lerp(0.9, 1.25, b.depth))}px var(--font-jost), system-ui, sans-serif`;
        ctx.fillStyle = "rgba(236,214,255,0.9)";
        ctx.textAlign = "center";
        let x = px;
        const label = b.label.toUpperCase();
        // Manual tracking; `ctx.letterSpacing` is not universally supported.
        const width = label.split("").reduce((sum, ch) => sum + ctx.measureText(ch).width + 1.6, 0);
        x = px - width / 2;
        ctx.textAlign = "left";
        for (const ch of label) {
          ctx.fillText(ch, x, py + 26 * scale);
          x += ctx.measureText(ch).width + 1.6;
        }
        ctx.textAlign = "start";
      }

      ctx.globalAlpha = 1;
    };

    /* ── Frame ──────────────────────────────────────────────────────────── */
    const render = (animate: boolean) => {
      const p = pointer.current;
      p.x = lerp(p.x, p.tx, 0.05);
      p.y = lerp(p.y, p.ty, 0.05);
      const parX = (p.x - 0.5) * 2;
      const parY = (p.y - 0.5) * 2;

      ctx.clearRect(0, 0, W, H);

      /* Stardust ------------------------------------------------------- */
      for (const particle of particles) {
        if (animate) {
          particle.x += particle.drift;
          particle.phase += 0.006;
          if (particle.x > 1.05) particle.x = -0.05;
          if (particle.x < -0.05) particle.x = 1.05;
        }
        const px = (particle.x + parX * 0.02 * particle.depth) * W;
        const py =
          (particle.y + parY * 0.02 * particle.depth) * H +
          Math.sin(particle.phase) * 6 * particle.depth;
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(particle.phase * 1.7));

        ctx.globalAlpha = twinkle * particle.depth * 0.7;
        ctx.fillStyle = particle.depth > 0.7 ? "rgba(244,214,255,0.95)" : "rgba(190,170,230,0.8)";
        ctx.beginPath();
        ctx.arc(px, py, particle.r * particle.depth, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* Constellation --------------------------------------------------- */
      if (showConstellation) {
        const nodePos = NODES.map((n, i) => ({
          x: (n.x + parX * 0.035 * n.weight) * W,
          y: (n.y + parY * 0.03 * n.weight) * H,
          heat: heat[i] ?? 0,
        }));

        // Links first, so nodes sit on top of them.
        ctx.lineWidth = 1;
        for (const [a, b] of LINKS) {
          const na = nodePos[a];
          const nb = nodePos[b];
          if (!na || !nb) continue;
          const flare = Math.max(na.heat, nb.heat);
          const alpha = 0.05 + flare * 0.4;
          ctx.strokeStyle =
            flare > 0.15 ? `rgba(244,140,220,${alpha})` : `rgba(150,120,210,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.stroke();
        }

        for (let i = 0; i < NODES.length; i += 1) {
          const node = NODES[i]!;
          const pos = nodePos[i]!;
          const h = pos.heat;

          const size = (26 + h * 46) * node.weight;
          ctx.globalAlpha = 0.28 + h * 0.72;
          ctx.drawImage(glowStar, pos.x - size / 2, pos.y - size / 2, size, size);

          ctx.globalAlpha = 0.5 + h * 0.5;
          ctx.fillStyle = h > 0.2 ? "rgba(255,220,250,1)" : "rgba(214,196,255,0.85)";
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 1.6 + h * 1.6, 0, Math.PI * 2);
          ctx.fill();

          // The node names itself once a butterfly wakes it.
          if (h > 0.04) {
            ctx.globalAlpha = Math.min(h * 1.6, 0.95);
            ctx.font = `400 9px var(--font-jost), system-ui, sans-serif`;
            ctx.fillStyle = "rgba(248,226,255,0.95)";
            let x = pos.x + 10;
            for (const ch of node.label) {
              ctx.fillText(ch, x, pos.y + 3.4);
              x += ctx.measureText(ch).width + 1.8;
            }
          }

          if (animate) heat[i] = Math.max(0, h - 0.012);
        }
        ctx.globalAlpha = 1;
      }

      /* Butterflies ----------------------------------------------------- */
      for (let i = 0; i < butterflies.length; i += 1) {
        const b = butterflies[i]!;

        if (animate) {
          b.t += b.speed;
          b.flap += b.flapSpeed;
          if (b.t >= 1) respawn(b, i, butterflies.length);
        }

        const t = clamp(b.t, 0, 1);
        const bx = bezier(b.p0x, b.p1x, b.p2x, b.p3x, t);
        const by = bezier(b.p0y, b.p1y, b.p2y, b.p3y, t);

        // Sine wobble applied perpendicular to travel — the flutter.
        const wobble = Math.sin(t * Math.PI * b.wobbleFreq) * b.wobbleAmp;

        const px = (bx + parX * 0.05 * b.depth) * W;
        const py = (by + wobble + parY * 0.045 * b.depth) * H;

        const dx = bezierSlope(b.p0x, b.p1x, b.p2x, b.p3x, t) * W;
        const dy = bezierSlope(b.p0y, b.p1y, b.p2y, b.p3y, t) * H;
        // Nose along the path, plus a gentle bank from the wobble.
        const angle = Math.atan2(dy, dx) + Math.PI / 2 + Math.cos(t * Math.PI * b.wobbleFreq) * 0.25;

        // Ignite any technology node the butterfly brushes past.
        if (showConstellation && animate) {
          for (let n = 0; n < NODES.length; n += 1) {
            const node = NODES[n]!;
            const nx = (node.x + parX * 0.035 * node.weight) * W;
            const ny = (node.y + parY * 0.03 * node.weight) * H;
            const dist = Math.hypot(px - nx, py - ny);
            const reach = 130;
            if (dist < reach) {
              const boost = (1 - dist / reach) * 0.08 * b.depth;
              heat[n] = Math.min(1, (heat[n] ?? 0) + boost);
            }
          }
        }

        drawButterfly(b, px, py, angle);
      }
    };

    /* ── Loop ───────────────────────────────────────────────────────────── */
    if (prefersReducedMotion) {
      render(false);
      const onResizeStatic = () => {
        resize();
        render(false);
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    let running = true;
    let frame = 0;
    const loop = () => {
      if (!running) return;
      if (visible.current && !document.hidden) render(true);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry?.isIntersecting ?? true;
      },
      { rootMargin: "160px" },
    );
    observer.observe(canvas);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [onPointerMove, prefersReducedMotion, variant]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
