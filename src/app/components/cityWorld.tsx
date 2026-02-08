// AakashDevWorld.tsx
// NOTE: This is a direct conversion of your HTML into a React TSX component.
// Implementation is kept the same (same IDs, same DOM-based logic, same three.js logic).
// You must have these files available in your public folder:
// public/models/source/gamecity.glb
// public/models/source/car.glb
//
// Also install:
// npm i three
//
// Tailwind: keep your existing Tailwind setup (this file assumes Tailwind is already configured globally).
import { Icon } from "@iconify/react";
import MiniMap from "./zones/MiniMap";
import { ZONES } from "./zones/index";
import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// If you want Iconify web component exactly as in HTML (<Icon/>),
// we load the same script once.

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "Icon": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon?: string;
        width?: string | number;
        height?: string | number;
      };
    }
  }
}



export default function AakashDevWorld() {
useEffect(() => {
  let disposed = false;

  // Load Iconify script (same as HTML)
  const ensureIconify = () => {
    const id = "Iconpt";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://code.Icongn/Icon/1.0.7/Icon.min.js";
    s.async = true;
    document.head.appendChild(s);
  };

  ensureIconify();

  // Inject the same CSS you had in <style> to preserve implementation/looks
  const styleTag = document.createElement("style");
  styleTag.setAttribute("data-aakash-world", "true");
  styleTag.textContent = `
    body {
        font-family: 'Inter', sans-serif;
        background-color: #18181b;
        overflow-x: hidden;
        overflow-y: auto;
        touch-action: auto;
    }
    #canvas-container {
        width: 100%;
        height: 100%;
        display: block;
    }
    .modal-panel {
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(16px);
    }
    .key-cap {
        box-shadow: 0 4px 0 #27272a;
        transition: all 0.1s;
    }
    .key-cap:active, .key-cap.pressed {
        transform: translateY(4px);
        box-shadow: 0 0 0 #27272a;
    }
    .world-label {
        position: absolute;
        transform: translate(-50%, -50%);
        pointer-events: none;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 10;
    }
    .custom-scroll::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scroll::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }
    .custom-scroll::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    }
  `;
  document.head.appendChild(styleTag);

  // Add Inter font (same as HTML)
  const ensureInter = () => {
    const id = "inter-font";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  };
  ensureInter();

// ===== ENGINE AUDIO (REPLACED - REAL ENGINE LOOP) =====
let audioCtx: AudioContext | null = null;

let engineEl: HTMLAudioElement | null = null;
let engineSrc: MediaElementAudioSourceNode | null = null;

let engineGain: GainNode | null = null;
let engineFilter: BiquadFilterNode | null = null;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const initEngineAudio = () => {
  if (audioCtx) return;

  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

  // Create HTMLAudio (loop)
  engineEl = new Audio("/sounds/ferrari-engine.mp3"); // ✅ put file in public/sounds/
  engineEl.loop = true;
  engineEl.preload = "auto";
  engineEl.crossOrigin = "anonymous";

  // Route through WebAudio so we can filter + control volume cleanly
  engineSrc = audioCtx.createMediaElementSource(engineEl);

  engineFilter = audioCtx.createBiquadFilter();
  engineFilter.type = "lowpass";
  engineFilter.frequency.value = 1200;

  engineGain = audioCtx.createGain();
  engineGain.gain.value = 0; // start silent

  engineSrc.connect(engineFilter);
  engineFilter.connect(engineGain);
  engineGain.connect(audioCtx.destination);

  // Start playback (browser allows because startGame is a user gesture)
  engineEl.currentTime = 0;
  engineEl.play().catch(() => {
    // if blocked for any reason, it's ok — will start on next gesture
  });
};


  // ===== Original script logic (unchanged) wrapped inside useEffect =====
  const container = document.getElementById("canvas-container") as HTMLDivElement | null;
  const hud = document.getElementById("hud") as HTMLDivElement | null;
  const startScreen = document.getElementById("start-screen") as HTMLDivElement | null;
  const btnStart = document.getElementById("btn-start") as HTMLButtonElement | null;

  if (!container || !hud || !startScreen || !btnStart) {
    // If something isn't mounted yet, stop.
    return () => {
      styleTag.remove();
    };
  }

  // --- THREE.JS SETUP ---
  const scene = new THREE.Scene();
  const fogColor = new THREE.Color("#2a2f3a");
  scene.background = fogColor;
  scene.fog = new THREE.Fog(fogColor, 25, 120);

  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Clear old canvas if any (React remount safety)
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  // --- LIGHTING ---
  const ambientLight = new THREE.HemisphereLight(0xe5e7eb, 0x1f2933, 1.2);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(50, 100, 50);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  scene.add(dirLight);

  // --- COLLISION & GAME VARIABLES ---
  const collidableMeshList: THREE.Object3D[] = [];
  const roadMeshes: THREE.Object3D[] = [];
  const buildingMeshes: THREE.Object3D[] = [];

  void roadMeshes;
  void buildingMeshes;

  let cameraMode = 0; // 0: Rear, 1: Side, 2: Top/Far

  // --- WORLD GENERATION ---
const zones = ZONES.map((z) => ({
  id: z.id,
  x: z.x,
  z: z.z,
  color: z.color,
  mesh: undefined as THREE.Mesh | undefined,
}));



  const worldGroup = new THREE.Group();
  scene.add(worldGroup);

  const cityLoader = new GLTFLoader();
  cityLoader.load(
    "/models/source/gamecity.glb",
    (gltf) => {
      if (disposed) return;
      const city = gltf.scene;
      city.scale.set(2.5, 2.5, 2.5);
      city.position.set(0, 0, 0);
      city.traverse((node: any) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          collidableMeshList.push(node);
        }
      });
      worldGroup.add(city);
    },
    undefined,
    (err) => console.error("City load error", err)
  );

  // --- CAR / PLAYER SETUP ---
  const playerGroup = new THREE.Group();
  const loader = new GLTFLoader();
  loader.load(
    "/models/source/car.glb",
    (gltf) => {
      if (disposed) return;
      const carModel = gltf.scene;
      carModel.scale.set(1, 1, 1);
      carModel.position.set(0, 0.1, 0);
      carModel.rotation.y = Math.PI;
      carModel.traverse((node: any) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      playerGroup.add(carModel);
    },
    undefined,
    () => {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.5, 2),
        new THREE.MeshStandardMaterial({ color: 0x555555 })
      );
      box.position.y = 0.5;
      playerGroup.add(box);
    }
  );

  const hlSpot = new THREE.SpotLight(0x00ffcc, 5, 40, 0.6, 0.5, 1);
  hlSpot.position.set(0, 0.5, -1);
  hlSpot.target.position.set(0, 0, -10);
  playerGroup.add(hlSpot);
  playerGroup.add(hlSpot.target);
  scene.add(playerGroup);

  // --- ZONE MARKERS ---
  zones.forEach((zone) => {
    const ringGeo = new THREE.RingGeometry(3.5, 3.8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: zone.color, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(zone.x, 0.1, zone.z);
    scene.add(ring);

    const beamGeo = new THREE.CylinderGeometry(3.5, 3.5, 20, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: zone.color,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(zone.x, 10, zone.z);
    scene.add(beam);

    const iconGeo = new THREE.BoxGeometry(1, 1, 1);
    const iconMat = new THREE.MeshBasicMaterial({ color: zone.color, wireframe: true });
    const iconMesh = new THREE.Mesh(iconGeo, iconMat);
    iconMesh.position.set(zone.x, 2, zone.z);
    (iconMesh as any).userData = { yStart: 2, speed: Math.random() * 0.02 + 0.01 };
    scene.add(iconMesh);
    zone.mesh = iconMesh;

    const pLight = new THREE.PointLight(zone.color, 1.5, 20);
    pLight.position.set(zone.x, 2, zone.z);
    scene.add(pLight);
  });

  // --- GAME STATE ---
  const state = {
    speed: 0,
    angle: Math.PI,
    targetAngle: Math.PI,
    keys: { w: false, a: false, s: false, d: false },
    activeZone: null as null | string,
    modalOpen: false,
    gameStarted: false,
  };

  // --- CONTROLS ---
  const onKeyDown = (e: KeyboardEvent) => {
    if (!state.gameStarted && e.key === "Enter") startGame();
    if (state.modalOpen) {
      if (e.key === "Escape") closeModal();
      return;
    }
    if (e.key.toLowerCase() === "c") cameraMode = (cameraMode + 1) % 3;

    const k = e.key.toLowerCase();
    const map: Record<string, "w" | "a" | "s" | "d"> = {
      arrowup: "w",
      arrowdown: "s",
      arrowleft: "a",
      arrowright: "d",
    };
    const key = (map as any)[k] || k;
    if ((state.keys as any).hasOwnProperty(key)) (state.keys as any)[key] = true;
    if (e.key === "Enter" && state.activeZone) openModal(state.activeZone);

    // ✅ send player position to minimap
window.dispatchEvent(
  new CustomEvent("cityworld:tick", {
    detail: {
      x: playerGroup.position.x,
      z: playerGroup.position.z,
      angle: state.angle,
      activeZone: state.activeZone,
    },
  })
);

  };

  const onKeyUp = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    const map: Record<string, "w" | "a" | "s" | "d"> = {
      arrowup: "w",
      arrowdown: "s",
      arrowleft: "a",
      arrowright: "d",
    };
    const key = (map as any)[k] || k;
    if ((state.keys as any).hasOwnProperty(key)) (state.keys as any)[key] = false;
  };

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  const btnMap: Record<string, "w" | "a" | "s" | "d"> = {
    "btn-gas": "w",
    "btn-brake": "s",
    "btn-left": "a",
    "btn-right": "d",
  };

  const touchHandlers: Array<{
    el: HTMLElement;
    press: (e: Event) => void;
    release: (e: Event) => void;
    key: "w" | "a" | "s" | "d";
  }> = [];

  Object.entries(btnMap).forEach(([btnId, key]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      const press = (e: any) => {
        e.preventDefault();
        state.keys[key] = true;
      };
      const release = (e: any) => {
        e.preventDefault();
        state.keys[key] = false;
      };
      btn.addEventListener("touchstart", press);
      btn.addEventListener("touchend", release);
      btn.addEventListener("mousedown", press);
      btn.addEventListener("mouseup", release);
      touchHandlers.push({ el: btn, press, release, key });
    }
  });

  const btnCam = document.getElementById("btn-cam");
  const onCamClick = (e: Event) => {
    e.preventDefault();
    cameraMode = (cameraMode + 1) % 3;
  };
  if (btnCam) btnCam.addEventListener("click", onCamClick);

  function startGame() {
    // ✅ ADDED: init audio only after user interaction
    initEngineAudio();

    state.gameStarted = true;
    startScreen.classList.add("opacity-0", "pointer-events-none");
    hud.classList.remove("opacity-0");
    setTimeout(() => {
      if (!disposed) startScreen.style.display = "none";
    }, 700);
  }
  btnStart.addEventListener("click", startGame);

  function updateLabels() {
    zones.forEach((zone) => {
      const el = document.getElementById(`label-${zone.id}`) as HTMLDivElement | null;
      if (!el) return;
      const pos = new THREE.Vector3(zone.x, 4, zone.z);
      pos.project(camera);
      const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(pos.y * 0.5) + 0.5) * window.innerHeight;
      const dist = playerGroup.position.distanceTo(new THREE.Vector3(zone.x, 0, zone.z));

      if (pos.z < 1 && Math.abs(pos.x) < 1.2 && Math.abs(pos.y) < 1.2) {
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        if (dist < 50) {
          el.classList.remove("opacity-0");
          el.style.transform = `translate(-50%, -50%) scale(${Math.max(0.6, 1 - dist / 60)})`;
        } else el.classList.add("opacity-0");
      } else el.classList.add("opacity-0");
    });
  }

  function openModal(zoneId: string) {
    state.modalOpen = true;
    state.speed = 0;

    const modalContainer = document.getElementById("modal-container");
    modalContainer?.classList.remove("hidden");

    document
      .querySelectorAll(".modal-panel")
      .forEach((p) => p.classList.add("hidden", "opacity-0", "scale-95"));
    const panel = document.getElementById(`modal-${zoneId}`);
    if (panel) {
      panel.classList.remove("hidden");
      setTimeout(() => {
        panel.classList.remove("opacity-0", "scale-95");
        panel.classList.add("opacity-100", "scale-100");
      }, 10);
    }
  }

  function closeModal() {
    document.querySelectorAll(".modal-panel:not(.hidden)").forEach((p) => {
      p.classList.remove("opacity-100", "scale-100");
      p.classList.add("opacity-0", "scale-95");
    });
    setTimeout(() => {
      const modalContainer = document.getElementById("modal-container");
      modalContainer?.classList.add("hidden");
      state.modalOpen = false;
    }, 500);
  }

  const closeBtns = Array.from(document.querySelectorAll(".close-modal"));
  closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

  const MAX_FWD_SPEED = 0.45;
  const MAX_REV_SPEED = -0.25;
  const ROLLING_RESISTANCE = 0.006; // natural slowdown (realistic)


  const ACCEL_RATE = 0.018;
  const BRAKE_RATE = 0.035;
  const COAST_RATE = 0.94;

  const groundRay = new THREE.Raycaster();
  const DOWN = new THREE.Vector3(0, -1, 0);
  void groundRay;
  void DOWN;

  let raf = 0;

  // --- MAIN LOOP ---
  function animate() {
    raf = requestAnimationFrame(animate);

    if (disposed) return;

    if (state.gameStarted && !state.modalOpen) {
      const ROT_S = 0.035;

      // --- SPEED CONTROL (FIXED: real coasting) ---
let targetSpeed: number | null = null;

// throttle / reverse intent
if (state.keys.w) targetSpeed = MAX_FWD_SPEED;
else if (state.keys.s) targetSpeed = MAX_REV_SPEED;

// accelerate only when input exists
if (targetSpeed !== null) {
  if (state.speed < targetSpeed) {
    state.speed += ACCEL_RATE;
    if (state.speed > targetSpeed) state.speed = targetSpeed;
  } else if (state.speed > targetSpeed) {
    // braking only when user is actively pressing reverse / switching direction
    state.speed -= BRAKE_RATE;
    if (state.speed < targetSpeed) state.speed = targetSpeed;
  }
} else {
  // ===== REALISTIC COASTING (no throttle, no brake) =====
  if (state.speed > 0) {
    state.speed -= ROLLING_RESISTANCE;
    if (state.speed < 0) state.speed = 0;
  } else if (state.speed < 0) {
    state.speed += ROLLING_RESISTANCE;
    if (state.speed > 0) state.speed = 0;
  }
}


// ===== REALISTIC COASTING =====
if (!state.keys.w && !state.keys.s) {
  if (state.speed > 0) {
    state.speed -= ROLLING_RESISTANCE;
    if (state.speed < 0) state.speed = 0;
  } else if (state.speed < 0) {
    state.speed += ROLLING_RESISTANCE;
    if (state.speed > 0) state.speed = 0;
  }
}


    // ===== ENGINE SOUND UPDATE (REALISTIC) =====
    if (engineEl && engineGain && audioCtx) {
      const speedAbs = Math.abs(state.speed);

      if (speedAbs > 0.01) {
        // volume follows speed
        const volume = clamp01(speedAbs * 2.2);
        engineGain.gain.setTargetAtTime(
          volume * 0.8,
          audioCtx.currentTime,
          0.05
        );

        // RPM / pitch simulation
        engineEl.playbackRate = 0.9 + speedAbs * 2.4;

        // Ferrari roar opens with speed
        engineFilter!.frequency.setTargetAtTime(
          900 + speedAbs * 3000,
          audioCtx.currentTime,
          0.05
        );
      } else {
        // smooth idle fade-out
        engineGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.08);
      }
    }



      if (Math.abs(state.speed) > 0.01) {
        const dir = state.speed > 0 ? 1 : -1;
        if (state.keys.a) state.targetAngle += ROT_S * dir;
        if (state.keys.d) state.targetAngle -= ROT_S * dir;
      }
      state.angle += (state.targetAngle - state.angle) * 0.15;

      // Collision Detection (Raycasting)
      const moveDir = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), state.angle);
      if (state.speed < 0) moveDir.negate();

      const rayOrigin = playerGroup.position.clone().add(new THREE.Vector3(0, 1.5, 0));
      const raycaster = new THREE.Raycaster(rayOrigin, moveDir.normalize(), 0, 1.2);
      const intersects = raycaster.intersectObjects(collidableMeshList, true);

      if (intersects.length > 0 && Math.abs(state.speed) > 0.01) {
        state.speed = 0;
      } else {
        playerGroup.rotation.y = state.angle;
        playerGroup.position.x -= Math.sin(state.angle) * state.speed;
        playerGroup.position.z -= Math.cos(state.angle) * state.speed;
      }

      // ======= Y AXIS ALIGNMENT WITH CITY SURFACE ========
      const groundRayOrigin = playerGroup.position.clone();
      groundRayOrigin.y += 10;

      const groundRaycaster = new THREE.Raycaster(
        groundRayOrigin,
        new THREE.Vector3(0, -1, 0),
        0,
        30
      );
      const groundHits = groundRaycaster.intersectObjects(collidableMeshList, true);

      if (groundHits.length > 0) {
        playerGroup.position.y = groundHits[0].point.y + 0.12;
      }

      // Camera Logic
      const camOffsets = [
        new THREE.Vector3(0, 6, 9),
        new THREE.Vector3(-9, 4, 4),
        new THREE.Vector3(0, 8, 15),
      ];
      const ideal = camOffsets[cameraMode].clone();
      ideal.applyAxisAngle(new THREE.Vector3(0, 1, 0), state.angle);
      ideal.add(playerGroup.position);

      camera.position.lerp(ideal, 0.08);
      camera.lookAt(playerGroup.position.clone().add(new THREE.Vector3(0, 1, 0)));
    } else if (!state.gameStarted) {
      const t = Date.now() * 0.0005;
      camera.position.x = Math.sin(t) * 30;
      camera.position.z = Math.cos(t) * 30;
      camera.position.y = 20;
      camera.lookAt(0, 0, 0);
    }

    zones.forEach((zone) => {
      if (zone.mesh) {
        zone.mesh.rotation.x += 0.01;
        zone.mesh.rotation.y += 0.01;
        (zone.mesh as any).position.y =
          (zone.mesh as any).userData.yStart + Math.sin(Date.now() * 0.002) * 0.5;
      }
    });

    let nearby: string | null = null;
    zones.forEach((zone) => {
      if (Math.hypot(playerGroup.position.x - zone.x, playerGroup.position.z - zone.z) < 6)
        nearby = zone.id;
    });

    const alertEl = document.getElementById("proximity-alert");
    if (nearby !== state.activeZone) {
      state.activeZone = nearby;
      if (nearby) {
        alertEl?.classList.remove("opacity-0", "scale-90", "translate-y-4");
        alertEl?.classList.add("opacity-100", "scale-100", "translate-y-0");
      } else {
        alertEl?.classList.add("opacity-0", "scale-90", "translate-y-4");
        alertEl?.classList.remove("opacity-100", "scale-100", "translate-y-0");
      }
    }

    if (state.gameStarted) {
      const coordsEl = document.getElementById("coords");
      if (coordsEl)
        coordsEl.innerText = `X:${Math.round(playerGroup.position.x)} Z:${Math.round(
          playerGroup.position.z
        )}`;
      updateLabels();
    }
    renderer.render(scene, camera);
  }

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", onResize);

  animate();

  // cleanup
  return () => {
    disposed = true;

    cancelAnimationFrame(raf);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("resize", onResize);

    btnStart.removeEventListener("click", startGame);

    if (btnCam) btnCam.removeEventListener("click", onCamClick);

    closeBtns.forEach((btn) => btn.removeEventListener("click", closeModal));

    touchHandlers.forEach(({ el, press, release }) => {
      el.removeEventListener("touchstart", press);
      el.removeEventListener("touchend", release);
      el.removeEventListener("mousedown", press);
      el.removeEventListener("mouseup", release);
    });

// ✅ stop engine sound
try {
  if (engineGain && audioCtx) engineGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.03);
} catch {}

try {
  engineEl?.pause();
  if (engineEl) engineEl.currentTime = 0;
} catch {}

try {
  engineSrc?.disconnect();
  engineFilter?.disconnect();
  engineGain?.disconnect();
  audioCtx?.close();
} catch {}

engineEl = null;
engineSrc = null;
engineFilter = null;
engineGain = null;
audioCtx = null;


    // Dispose renderer + remove canvas
    try {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    } catch {}

    // Remove injected style
    styleTag.remove();
  };
}, []);


  return (
    <div className="bg-zinc-900 text-zinc-300 antialiased h-screen w-screen overflow-hidden">
      {/* INTRO OVERLAY (Start Area) */}
      <div
  id="start-screen"
  className="fixed inset-0 z-[60] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black
             flex items-center justify-center text-center p-6
             transition-opacity duration-700"
>
  {/* ambient glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px]
                    bg-emerald-500/10 blur-[140px] rounded-full" />
  </div>

  <div className="relative space-y-8 max-w-xl">
    {/* status pill */}
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                    bg-emerald-500/10 border border-emerald-500/30
                    text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      System Online
    </div>

    {/* name */}
    <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
      Aakash
      <span className="block text-zinc-400 font-light tracking-wide text-3xl sm:text-4xl mt-1">
        Kushwaha
      </span>
    </h1>

    {/* role */}
    <h2 className="text-base sm:text-lg text-zinc-400 font-light tracking-wide">
      Java Backend Developer · AI Builder · DSA Enthusiast
    </h2>

    {/* description */}
    <p className="text-sm text-zinc-500 leading-relaxed max-w-md mx-auto">
      This is an interactive world built from my journey —  
      drive through skills, projects, certifications, and milestones.
    </p>

    {/* CTA */}
    <button
      id="btn-start"
      className="group relative mt-6 px-10 py-3 rounded-full
                 bg-white text-black font-semibold
                 transition-all duration-300
                 hover:scale-[1.06] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)]"
    >
      <span className="relative z-10 tracking-wide">Enter World</span>
      <div
        className="absolute inset-0 rounded-full ring-4 ring-white/20
                   group-hover:ring-white/40 transition-all"
      />
    </button>

    {/* controls */}
    <div className="pt-10 flex flex-col gap-3 text-[10px] text-zinc-600 uppercase tracking-widest">
      <p className="text-zinc-500">Controls</p>
      <div className="flex flex-wrap justify-center gap-2">
        {["WASD", "Arrows", "Touch", "C : Camera"].map((c) => (
          <span
            key={c}
            className="px-3 py-1 border border-zinc-800 rounded-md
                       bg-zinc-900/60 backdrop-blur
                       text-zinc-400"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>


      {/* UI LAYER */}
      <div
        id="hud"
        className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 sm:p-8 opacity-0 transition-opacity duration-1000"
      >
        {/* Header */}
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1 pointer-events-auto bg-zinc-900/60 backdrop-blur p-3 rounded-lg border border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <Icon icon="solar:gamepad-linear" className="text-emerald-400" width="16"></Icon>
              <h1 className="text-xs font-semibold tracking-tight text-white uppercase">Aakash.Dev [World]</h1>
            </div>
            <div className="text-[10px] text-zinc-400 tracking-wide font-mono" id="coords">
              POS: 0, 0
            </div>
            <div className="text-[10px] text-zinc-400 tracking-wide mt-1" id="current-objective">
              Objective: Explore the Zones
            </div>
          </div>
        </div>

        {/* Proximity Action */}
        <div
          id="proximity-alert"
          className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 transform scale-90 pointer-events-none flex flex-col items-center"
        >
          <div className="bg-white/90 backdrop-blur text-black px-5 py-3 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.4)] border border-white">
            <Icon icon="solar:maximize-square-linear" width="16" className="animate-pulse"></Icon>
            <span>PRESS ENTER TO INSPECT</span>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex justify-between items-end w-full pb-4 pointer-events-auto">
          <div className="flex gap-4">
            <button
              id="btn-left"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center"
            >
              <Icon icon="solar:arrow-left-linear" className="text-white" width="24"></Icon>
            </button>
            <button
              id="btn-right"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center"
            >
              <Icon icon="solar:arrow-right-linear" className="text-white" width="24"></Icon>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <button
              id="btn-gas"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center"
            >
              <Icon icon="solar:arrow-up-linear" className="text-white" width="24"></Icon>
            </button>
            <button
              id="btn-brake"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center"
            >
              <Icon icon="solar:arrow-down-linear" className="text-white" width="24"></Icon>
            </button>
            <button
              id="btn-cam"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center mt-4"
            >
              <Icon icon="solar:camera-linear" className="text-white" width="24"></Icon>
            </button>
          </div>
        </div>
      </div>

      {/* 3D CANVAS */}
      <div id="canvas-container" className="relative z-0" />

      {/* WORLD LABELS */}
<div id="labels-container" className="absolute inset-0 pointer-events-none z-10">
  {ZONES.map((zone) => (
    <div key={zone.id}>
      {zone.labelJSX}
    </div>
  ))}
</div>

      {/* MODALS */}
<div
  id="modal-container"
  className="fixed inset-0 z-[100] bg-zinc-900/80 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6"
>
  {ZONES.map((zone) => (
    <div key={zone.id}>
      {zone.modalJSX}
    </div>
  ))}
</div>
<MiniMap zones={ZONES} />
    </div>
  );
}
export function startCityWorld() {
  throw new Error("Function not implemented.");
}

