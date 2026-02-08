import React, { useEffect, useMemo, useRef, useState } from "react";

type Zone = {
  id: string;
  x: number;
  z: number;
  color: number;
};

type TickDetail = {
  x: number;
  z: number;
  angle: number;
  activeZone: string | null;
};

function toHex(color: number) {
  return "#" + color.toString(16).padStart(6, "0");
}

export default function MiniMap({
  zones,
  size = 190,
  padding = 18,
}: {
  zones: Zone[];
  size?: number;
  padding?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ✅ show only inside game (enter -> show, exit -> hide)
  const [visible, setVisible] = useState(false);

  // player tick
  const [tick, setTick] = useState<TickDetail>({
    x: 0,
    z: 0,
    angle: Math.PI,
    activeZone: null,
  });

  // ✅ keep a short travel trail (for “real travel” feel)
  const trailRef = useRef<{ x: number; z: number }[]>([]);
  const lastTrailPushRef = useRef<number>(0);

  // ✅ auto-fit bounds from ZONES (+ some margin)
  const bounds = useMemo(() => {
    if (!zones.length) return { minX: -50, maxX: 50, minZ: -50, maxZ: 50 };

    let minX = zones[0].x,
      maxX = zones[0].x,
      minZ = zones[0].z,
      maxZ = zones[0].z;

    for (const z of zones) {
      minX = Math.min(minX, z.x);
      maxX = Math.max(maxX, z.x);
      minZ = Math.min(minZ, z.z);
      maxZ = Math.max(maxZ, z.z);
    }

    // add margin so points aren’t on edge
    const mx = Math.max(10, (maxX - minX) * 0.12);
    const mz = Math.max(10, (maxZ - minZ) * 0.12);

    return { minX: minX - mx, maxX: maxX + mx, minZ: minZ - mz, maxZ: maxZ + mz };
  }, [zones]);

  // ✅ show/hide based on world lifecycle events
  useEffect(() => {
    const onEnter = () => setVisible(true);
    const onExit = () => {
      setVisible(false);
      trailRef.current = [];
    };

    // try multiple event names (so it works with your current wiring)
    window.addEventListener("cityworld:enter", onEnter as any);
    window.addEventListener("cityworld:entered", onEnter as any);
    window.addEventListener("cityworld:start", onEnter as any);

    window.addEventListener("cityworld:exit", onExit as any);
    window.addEventListener("cityworld:exited", onExit as any);
    window.addEventListener("cityworld:stop", onExit as any);
    window.addEventListener("cityworld:leave", onExit as any);

    return () => {
      window.removeEventListener("cityworld:enter", onEnter as any);
      window.removeEventListener("cityworld:entered", onEnter as any);
      window.removeEventListener("cityworld:start", onEnter as any);

      window.removeEventListener("cityworld:exit", onExit as any);
      window.removeEventListener("cityworld:exited", onExit as any);
      window.removeEventListener("cityworld:stop", onExit as any);
      window.removeEventListener("cityworld:leave", onExit as any);
    };
  }, []);

  // ✅ listen to cityWorld tick event
  useEffect(() => {
    const onTick = (e: Event) => {
      const detail = (e as CustomEvent<TickDetail>).detail;
      if (!detail) return;

      // if your world never emits enter event, we still show minimap once we start receiving ticks
      if (!visible) setVisible(true);

      setTick(detail);

      // add to trail (throttled)
      const now = performance.now();
      if (now - lastTrailPushRef.current > 120) {
        lastTrailPushRef.current = now;
        const t = trailRef.current;
        t.push({ x: detail.x, z: detail.z });
        if (t.length > 44) t.shift(); // keep it light
      }
    };

    window.addEventListener("cityworld:tick", onTick as any);
    return () => window.removeEventListener("cityworld:tick", onTick as any);
  }, [visible]);

  // ✅ draw
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const { minX, maxX, minZ, maxZ } = bounds;
    const W = size;
    const H = size;

    // world->minimap mapping
    const mapX = (wx: number) => {
      const t = (wx - minX) / (maxX - minX || 1);
      return padding + t * (W - padding * 2);
    };
    const mapY = (wz: number) => {
      const t = (wz - minZ) / (maxZ - minZ || 1);
      return padding + t * (H - padding * 2);
    };

    // clear
    ctx.clearRect(0, 0, W, H);

    // ---------- Travel style panel ----------
    // background
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    roundRect(ctx, 0, 0, W, H, 18);
    ctx.fill();

    // vignette
    const vg = ctx.createRadialGradient(W / 2, H / 2, W * 0.15, W / 2, H / 2, W * 0.62);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,0.38)");
    ctx.fillStyle = vg;
    roundRect(ctx, 0, 0, W, H, 18);
    ctx.fill();

    // border
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    roundRect(ctx, 0.5, 0.5, W - 1, H - 1, 18);
    ctx.stroke();

    // subtle terrain noise dots
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    for (let i = 0; i < 95; i++) {
      const x = 8 + Math.random() * (W - 16);
      const y = 8 + Math.random() * (H - 16);
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // grid like “map lines”
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    const steps = 4;
    for (let i = 1; i < steps; i++) {
      const x = padding + (i / steps) * (W - padding * 2);
      const y = padding + (i / steps) * (H - padding * 2);

      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, H - padding);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(W - padding, y);
      ctx.stroke();
    }

    // ---------- Travel trail ----------
    const trail = trailRef.current;
    if (trail.length > 1) {
      ctx.save();
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // fade gradient along trail
      for (let i = 1; i < trail.length; i++) {
        const a = i / trail.length;
        ctx.strokeStyle = `rgba(0,255,200,${0.08 + a * 0.55})`;
        ctx.beginPath();
        ctx.moveTo(mapX(trail[i - 1].x), mapY(trail[i - 1].z));
        ctx.lineTo(mapX(trail[i].x), mapY(trail[i].z));
        ctx.stroke();
      }

      ctx.restore();
    }

    // ---------- zones ----------
    for (const z of zones) {
      const x = mapX(z.x);
      const y = mapY(z.z);
      const isActive = tick.activeZone === z.id;

      // glow ring
      ctx.beginPath();
      ctx.fillStyle = isActive ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)";
      ctx.arc(x, y, isActive ? 8 : 6, 0, Math.PI * 2);
      ctx.fill();

      // dot
      ctx.beginPath();
      ctx.fillStyle = toHex(z.color);
      ctx.arc(x, y, isActive ? 4.2 : 3.2, 0, Math.PI * 2);
      ctx.fill();

      // label
      ctx.font =
        "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.62)";
      ctx.fillText(z.id.toUpperCase(), x + 8, y + 4);
    }

    // ---------- player ----------
    const px = mapX(tick.x);
    const py = mapY(tick.z);

    // player glow
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,255,200,0.20)";
    ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.fill();

    // player dot
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,255,200,0.95)";
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();

    // heading arrow
    const dirLen = 14;
    const dx = -Math.sin(tick.angle) * dirLen;
    const dy = -Math.cos(tick.angle) * dirLen;

    ctx.strokeStyle = "rgba(0,255,200,0.85)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + dx, py + dy);
    ctx.stroke();

    // arrow head
    ctx.save();
    ctx.translate(px + dx, py + dy);
    ctx.rotate(Math.atan2(dy, dx));
    ctx.fillStyle = "rgba(0,255,200,0.85)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-6, -3);
    ctx.lineTo(-6, 3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // ---------- compass (N) ----------
    ctx.save();
    ctx.globalAlpha = 0.9;

    // compass circle
    const cx = W - 30;
    const cy = 28;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.stroke();

    // N marker
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace";
    ctx.fillText("N", cx - 3, cy - 18 + 14);

    // compass needle (always points up, just for travel vibe)
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 8);
    ctx.lineTo(cx, cy - 10);
    ctx.stroke();

    ctx.restore();

    // ---------- title strip ----------
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    roundRect(ctx, 12, 12, 92, 20, 10);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.78)";
    ctx.font =
      "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
    ctx.fillText("TRAVEL MAP", 20, 26);
    ctx.restore();
  }, [bounds, tick, zones, size, padding, visible]);

  // ✅ show in-game; disappear on exit; also stays hidden during loading if your app emits "cityworld:exit"
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed top-4 right-4 z-[120]"
      style={{
        animation: "minimapIn 280ms cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="backdrop-blur-md rounded-2xl shadow-[0_0_30px_rgba(0,255,200,0.12)]"
      />

      <div className="mt-2 text-[10px] text-white/60 text-right font-mono pr-1">
        NAV • ZONES • TRAIL
      </div>

      {/* small CSS for entry */}
      <style>{`
        @keyframes minimapIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// helper: rounded rect
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
