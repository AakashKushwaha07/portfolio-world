// AakashDevWorld.tsx
// Mobile + low-end performance + framerate-independent car speed + tap-to-inspect zones
// FIXES INCLUDED:
// ✅ Mobile slow car on Oppo / low FPS: speed & accel scaled by CITY_SCALE (because city is scaled 2.5x)
// ✅ Mobile controls not good: use Pointer Events (more reliable than touchstart/touchend)
// ✅ Sound not working on mobiles: audioCtx.resume + playsInline + visibility recovery + force play on gesture
// ✅ Brakes too slow: stronger BRAKE + HARD BRAKE when pressing S while moving forward
// ✅ Building/road jump + sinking on slopes: stable ground alignment (snap up, smooth down, ignore spikes)
// ✅ NEW: Wall/building stuck fix: collision push-out + slide along wall (no more sticking)

import { Icon } from "@iconify/react";
import MiniMap from "./zones/MiniMap";
import { ZONES } from "./zones/index";
import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Icon: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
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

    // ---------- Device / Quality heuristics ----------
    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) ||
      window.matchMedia?.("(pointer: coarse)").matches;

    const deviceMemory = (navigator as any).deviceMemory ?? 4;
    const cores = navigator.hardwareConcurrency ?? 4;
    const lowEnd = isMobile || deviceMemory <= 4 || cores <= 4;

    const QUALITY = {
      maxPixelRatio: lowEnd ? 1.25 : 2,
      antialias: !lowEnd,
      shadows: !lowEnd,
      shadowMap: lowEnd ? 1024 : 2048,
      fog: !lowEnd,
    };

    // Iconify web component (optional)
    const ensureIconify = () => {
      const id = "iconify-webcomponent";
      if (document.getElementById(id)) return;
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js";
      s.async = true;
      document.head.appendChild(s);
    };
    ensureIconify();

    // Inject CSS
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
      #canvas-container { width: 100%; height: 100%; display: block; }
      .modal-panel { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); backdrop-filter: blur(16px); }
      .key-cap { box-shadow: 0 4px 0 #27272a; transition: all 0.1s; }
      .key-cap:active, .key-cap.pressed { transform: translateY(4px); box-shadow: 0 0 0 #27272a; }
      .world-label { position: absolute; transform: translate(-50%, -50%); pointer-events: none; transition: opacity 0.3s, transform 0.3s; z-index: 10; }
      .custom-scroll::-webkit-scrollbar { width: 6px; }
      .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
      .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
    `;
    document.head.appendChild(styleTag);

    // Inter font
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

    // ---------- ENGINE AUDIO ----------
    let audioCtx: AudioContext | null = null;
    let engineEl: HTMLAudioElement | null = null;
    let engineSrc: MediaElementAudioSourceNode | null = null;
    let engineGain: GainNode | null = null;
    let engineFilter: BiquadFilterNode | null = null;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

    const initEngineAudio = () => {
      if (audioCtx) return;

      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

      engineEl = new Audio("/sounds/ferrari-engine.mp3");
      engineEl.loop = true;
      engineEl.preload = "auto";
      engineEl.crossOrigin = "anonymous";
      (engineEl as any).playsInline = true;
      engineEl.muted = false;
      engineEl.volume = 1;

      engineSrc = audioCtx.createMediaElementSource(engineEl);

      engineFilter = audioCtx.createBiquadFilter();
      engineFilter.type = "lowpass";
      engineFilter.frequency.value = 1200;

      engineGain = audioCtx.createGain();
      engineGain.gain.value = 0;

      engineSrc.connect(engineFilter);
      engineFilter.connect(engineGain);
      engineGain.connect(audioCtx.destination);

      engineEl.currentTime = 0;
      engineEl.play().catch(() => {});
    };

    // ---------- DOM refs ----------
    const container = document.getElementById("canvas-container") as HTMLDivElement | null;
    const hud = document.getElementById("hud") as HTMLDivElement | null;
    const startScreen = document.getElementById("start-screen") as HTMLDivElement | null;
    const btnStart = document.getElementById("btn-start") as HTMLButtonElement | null;
    const proximityAlert = document.getElementById("proximity-alert") as HTMLDivElement | null;
    const btnInspect = document.getElementById("btn-inspect") as HTMLButtonElement | null;

    if (!container || !hud || !startScreen || !btnStart) {
      return () => {
        styleTag.remove();
      };
    }

    // ---------- THREE SETUP ----------
    const scene = new THREE.Scene();
    const fogColor = new THREE.Color("#2a2f3a");
    scene.background = fogColor;
    if (QUALITY.fog) scene.fog = new THREE.Fog(fogColor, 25, 120);

    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      antialias: QUALITY.antialias,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, QUALITY.maxPixelRatio));
    renderer.shadowMap.enabled = QUALITY.shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.HemisphereLight(0xe5e7eb, 0x1f2933, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(50, 100, 50);
    dirLight.castShadow = QUALITY.shadows;
    dirLight.shadow.mapSize.width = QUALITY.shadowMap;
    dirLight.shadow.mapSize.height = QUALITY.shadowMap;
    scene.add(dirLight);

    // ---------- World / Collision ----------
    const collidableMeshList: THREE.Object3D[] = [];
    let cameraMode = 0;

    const zones = ZONES.map((z) => ({
      id: z.id,
      x: z.x,
      z: z.z,
      color: z.color,
      mesh: undefined as THREE.Mesh | undefined,
    }));

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // City is scaled => speed must scale too
    const CITY_SCALE = 2.5;
    const SPEED_SCALE = CITY_SCALE;

    const cityLoader = new GLTFLoader();
    cityLoader.load(
      "/models/source/gamecity.glb",
      (gltf) => {
        if (disposed) return;
        const city = gltf.scene;
        city.scale.set(CITY_SCALE, CITY_SCALE, CITY_SCALE);
        city.position.set(0, 0, 0);
        city.traverse((node: any) => {
          if (node.isMesh) {
            node.castShadow = QUALITY.shadows;
            node.receiveShadow = QUALITY.shadows;
            collidableMeshList.push(node);
          }
        });
        worldGroup.add(city);
      },
      undefined,
      (err) => console.error("City load error", err)
    );

    // ---------- Player / Car ----------
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
            node.castShadow = QUALITY.shadows;
            node.receiveShadow = QUALITY.shadows;
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

    const hlSpot = new THREE.SpotLight(0x00ffcc, lowEnd ? 3 : 5, 40, 0.6, 0.5, 1);
    hlSpot.position.set(0, 0.5, -1);
    hlSpot.target.position.set(0, 0, -10);
    playerGroup.add(hlSpot);
    playerGroup.add(hlSpot.target);
    scene.add(playerGroup);

    // ---------- Zone markers ----------
    zones.forEach((zone) => {
      const ringGeo = new THREE.RingGeometry(3.5, 3.8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: zone.color, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(zone.x, 0.1, zone.z);
      scene.add(ring);

      const beamGeo = new THREE.CylinderGeometry(3.5, 3.5, 20, 24, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: zone.color,
        transparent: true,
        opacity: 0.12,
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

      const pLight = new THREE.PointLight(zone.color, lowEnd ? 1.0 : 1.5, lowEnd ? 14 : 20);
      pLight.position.set(zone.x, 2, zone.z);
      scene.add(pLight);
    });

    // ---------- Game State ----------
    const state = {
      speed: 0,
      angle: Math.PI,
      targetAngle: Math.PI,
      keys: { w: false, a: false, s: false, d: false },
      activeZone: null as null | string,
      modalOpen: false,
      gameStarted: false,
    };

    // ---------- Controls ----------
    const openInspectIfPossible = () => {
      if (state.activeZone) openModal(state.activeZone);
    };

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

      if (e.key === "Enter") openInspectIfPossible();
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

    // Mobile buttons -> Pointer Events
    const btnMap: Record<string, "w" | "a" | "s" | "d"> = {
      "btn-gas": "w",
      "btn-brake": "s",
      "btn-left": "a",
      "btn-right": "d",
    };

    const touchHandlers: Array<{ el: HTMLElement; press: (e: Event) => void; release: (e: Event) => void }> = [];

    Object.entries(btnMap).forEach(([btnId, key]) => {
      const btn = document.getElementById(btnId) as HTMLElement | null;
      if (!btn) return;

      btn.style.touchAction = "none";

      const press = (e: any) => {
        e.preventDefault();
        if (!state.gameStarted) startGame();
        state.keys[key] = true;
        try {
          btn.setPointerCapture?.(e.pointerId);
        } catch {}
      };

      const release = (e: any) => {
        e.preventDefault();
        state.keys[key] = false;
        try {
          btn.releasePointerCapture?.(e.pointerId);
        } catch {}
      };

      btn.addEventListener("pointerdown", press, { passive: false });
      btn.addEventListener("pointerup", release, { passive: false });
      btn.addEventListener("pointercancel", release, { passive: false });
      btn.addEventListener("pointerleave", release, { passive: false });

      touchHandlers.push({ el: btn, press, release });
    });

    const btnCam = document.getElementById("btn-cam");
    const onCamClick = (e: Event) => {
      e.preventDefault();
      cameraMode = (cameraMode + 1) % 3;
    };
    if (btnCam) btnCam.addEventListener("click", onCamClick);

    const onProximityClick = (e: Event) => {
      e.preventDefault();
      openInspectIfPossible();
    };
    if (proximityAlert) {
      proximityAlert.style.pointerEvents = "auto";
      proximityAlert.addEventListener("click", onProximityClick);
      proximityAlert.addEventListener("touchend", onProximityClick, { passive: false });
    }
    if (btnInspect) {
      btnInspect.addEventListener("click", onProximityClick);
      btnInspect.addEventListener("touchend", onProximityClick, { passive: false });
    }

    function startGame() {
      initEngineAudio();
      audioCtx?.resume?.().catch(() => {});
      engineEl?.play().catch(() => {});

      state.gameStarted = true;
      startScreen.classList.add("opacity-0", "pointer-events-none");
      hud.classList.remove("opacity-0");
      setTimeout(() => {
        if (!disposed) startScreen.style.display = "none";
      }, 700);
    }
    btnStart.addEventListener("click", startGame);

    const onVis = () => {
      if (!state.gameStarted) return;
      audioCtx?.resume?.().catch(() => {});
      engineEl?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);

    // ---------- Labels ----------
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
          } else {
            el.classList.add("opacity-0");
          }
        } else {
          el.classList.add("opacity-0");
        }
      });
    }

    // ---------- Modals ----------
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

    // ---------- PHYSICS ----------
    const BASE_MAX_FWD = (lowEnd ? 22 : 28) * SPEED_SCALE;
    const BOOST_MAX_FWD = (lowEnd ? 48 : 58) * SPEED_SCALE;
    const BOOST_BUILD_RATE = (lowEnd ? 14 : 18) * SPEED_SCALE;
    const BOOST_DECAY_RATE = (lowEnd ? 22 : 28) * SPEED_SCALE;

    const MAX_REV_SPEED = -12 * SPEED_SCALE;

    const ACCEL = (lowEnd ? 24 : 32) * SPEED_SCALE;
    const BRAKE = (lowEnd ? 55 : 70) * SPEED_SCALE;
    const BRAKE_HARD = (lowEnd ? 85 : 110) * SPEED_SCALE;
    const ROLLING_DECEL = (lowEnd ? 10 : 12) * SPEED_SCALE;

    const ROT_S = 2.1;
    let dynamicMaxFwd = BASE_MAX_FWD;
    const HIGH_SPEED_ACCEL_MULT = 1.15;

    // ✅ NEW: Anti-stuck collision parameters
    const COLLISION_PUSH = 0.8 * SPEED_SCALE; // push out strength
    const COLLISION_DAMP = 0.35; // speed loss on hit
    const WALL_SLIDE = 0.25; // slide amount

    // Ground alignment (anti-jump + no-sink)
    const groundRaycaster = new THREE.Raycaster();
    const tmpDown = new THREE.Vector3(0, -1, 0);

    let carY = playerGroup.position.y;
    let lastGroundY = 0;

    const CAR_CLEARANCE = 0.14;
    const UP_SNAP_SPEED = lowEnd ? 45 : 60;
    const DOWN_SMOOTH_SPEED = lowEnd ? 20 : 28;
    const MAX_GROUND_SPIKE = 3.0;

    const clock = new THREE.Clock();
    let raf = 0;

    function animate() {
      raf = requestAnimationFrame(animate);
      if (disposed) return;

      const dt = Math.min(clock.getDelta(), 0.05);

      if (state.gameStarted && !state.modalOpen) {
        // ---- speed target ----
        let targetSpeed: number | null = null;

        if (state.keys.w) {
          dynamicMaxFwd = Math.min(BOOST_MAX_FWD, dynamicMaxFwd + BOOST_BUILD_RATE * dt);
          targetSpeed = dynamicMaxFwd;
        } else {
          dynamicMaxFwd = Math.max(BASE_MAX_FWD, dynamicMaxFwd - BOOST_DECAY_RATE * dt);
        }

        if (state.keys.s) {
          if (state.speed > 2) targetSpeed = 0;
          else targetSpeed = MAX_REV_SPEED;
        }

        if (targetSpeed !== null) {
          const accelNow = state.speed > BASE_MAX_FWD * 0.75 ? ACCEL * HIGH_SPEED_ACCEL_MULT : ACCEL;

          let rate = targetSpeed > state.speed ? accelNow : BRAKE;
          if (state.keys.s && state.speed > 0.5) rate = BRAKE_HARD;

          const diff = targetSpeed - state.speed;
          const step = Math.sign(diff) * rate * dt;

          if (Math.abs(step) > Math.abs(diff)) state.speed = targetSpeed;
          else state.speed += step;
        } else {
          if (state.speed > 0) state.speed = Math.max(0, state.speed - ROLLING_DECEL * dt);
          else if (state.speed < 0) state.speed = Math.min(0, state.speed + ROLLING_DECEL * dt);
        }

        // ---- engine sound ----
        if (engineEl && engineGain && audioCtx) {
          const speedAbs = Math.abs(state.speed);
          const maxForNorm = state.speed >= 0 ? Math.max(1, dynamicMaxFwd) : Math.max(1, Math.abs(MAX_REV_SPEED));
          const norm = clamp01(speedAbs / maxForNorm);

          if (norm > 0.02) {
            if (engineEl.paused) engineEl.play().catch(() => {});
            engineGain.gain.setTargetAtTime(norm * 0.85, audioCtx.currentTime, 0.06);
            engineEl.playbackRate = 0.9 + norm * 2.3;
            engineFilter!.frequency.setTargetAtTime(900 + norm * 3200, audioCtx.currentTime, 0.06);
          } else {
            engineGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.09);
          }
        }

        // ---- steering ----
        if (Math.abs(state.speed) > 0.2) {
          const dir = state.speed > 0 ? 1 : -1;
          if (state.keys.a) state.targetAngle += ROT_S * dt * dir;
          if (state.keys.d) state.targetAngle -= ROT_S * dt * dir;
        }
        state.angle += (state.targetAngle - state.angle) * Math.min(1, 10 * dt);

        // ---- movement + collision (ANTI-STUCK) ----
        const moveDir = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), state.angle);
        const forward = moveDir.clone().normalize();

        // cast longer at higher speed to avoid entering walls
        const castDist = 1.3 + Math.min(1.2, Math.abs(state.speed) * 0.03);

        const rayOrigin = playerGroup.position.clone().add(new THREE.Vector3(0, 1.2, 0));
        const raycaster = new THREE.Raycaster(rayOrigin, forward, 0, castDist);
        const hits = raycaster.intersectObjects(collidableMeshList, true);

        const stepDist = state.speed * dt;

        // intended move
        let dx = -Math.sin(state.angle) * stepDist;
        let dz = -Math.cos(state.angle) * stepDist;

        if (hits.length > 0 && Math.abs(state.speed) > 0.15) {
          // collision normal in world space
          const n = hits[0].face?.normal?.clone() ?? new THREE.Vector3(0, 0, 1);
          n.transformDirection(hits[0].object.matrixWorld).normalize();

          // push out so you don't stay stuck
          const push = COLLISION_PUSH * dt;
          playerGroup.position.addScaledVector(n, push);

          // lose speed but don't hard-lock
          state.speed *= COLLISION_DAMP;

          // slide along wall (remove component into the normal)
          const v = new THREE.Vector3(dx, 0, dz);
          const into = v.dot(n);
          const slide = v.clone().addScaledVector(n, -into).multiplyScalar(WALL_SLIDE);

          dx = slide.x;
          dz = slide.z;
        }

        // apply movement after push/slide
        playerGroup.rotation.y = state.angle;
        playerGroup.position.x += dx;
        playerGroup.position.z += dz;

        // ---- ground align (stable) ----
        const groundRayOrigin = playerGroup.position.clone();
        groundRayOrigin.y += 12;

        groundRaycaster.set(groundRayOrigin, tmpDown);
        groundRaycaster.far = 60;

        const gHits = groundRaycaster.intersectObjects(collidableMeshList, true);
        if (gHits.length > 0) {
          const hitY = gHits[0].point.y;

          if (Math.abs(hitY - lastGroundY) < MAX_GROUND_SPIKE || lastGroundY === 0) {
            lastGroundY = hitY;
          }

          const targetY = lastGroundY + CAR_CLEARANCE;
          const diffY = targetY - carY;

          if (diffY > 0) carY += Math.min(diffY, UP_SNAP_SPEED * dt);
          else carY += Math.max(diffY, -DOWN_SMOOTH_SPEED * dt);

          playerGroup.position.y = carY;
        }

        // ---- camera ----
        const camOffsets = [new THREE.Vector3(0, 6, 9), new THREE.Vector3(-9, 4, 4), new THREE.Vector3(0, 8, 15)];
        const ideal = camOffsets[cameraMode].clone();
        ideal.applyAxisAngle(new THREE.Vector3(0, 1, 0), state.angle);
        ideal.add(playerGroup.position);

        camera.position.lerp(ideal, 1 - Math.pow(0.0001, dt));
        camera.lookAt(playerGroup.position.clone().add(new THREE.Vector3(0, 1, 0)));
      } else if (!state.gameStarted) {
        const t = Date.now() * 0.0005;
        camera.position.x = Math.sin(t) * 30;
        camera.position.z = Math.cos(t) * 30;
        camera.position.y = 20;
        camera.lookAt(0, 0, 0);
      }

      // zone icon motion
      zones.forEach((zone) => {
        if (zone.mesh) {
          zone.mesh.rotation.x += 0.8 * dt;
          zone.mesh.rotation.y += 0.8 * dt;
          (zone.mesh as any).position.y = (zone.mesh as any).userData.yStart + Math.sin(Date.now() * 0.002) * 0.5;
        }
      });

      // detect nearby zone
      let nearby: string | null = null;
      zones.forEach((zone) => {
        if (Math.hypot(playerGroup.position.x - zone.x, playerGroup.position.z - zone.z) < 6) nearby = zone.id;
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

      // coords + labels + minimap tick
      if (state.gameStarted) {
        const coordsEl = document.getElementById("coords");
        if (coordsEl) {
          coordsEl.innerText = `X:${Math.round(playerGroup.position.x)} Z:${Math.round(playerGroup.position.z)}`;
        }
        updateLabels();

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
      }

      renderer.render(scene, camera);
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, QUALITY.maxPixelRatio));
    };
    window.addEventListener("resize", onResize);

    animate();

    // ---------- cleanup ----------
    return () => {
      disposed = true;

      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", onResize);

      btnStart.removeEventListener("click", startGame);
      document.removeEventListener("visibilitychange", onVis);

      if (btnCam) btnCam.removeEventListener("click", onCamClick);

      if (proximityAlert) {
        proximityAlert.removeEventListener("click", onProximityClick);
        proximityAlert.removeEventListener("touchend", onProximityClick as any);
      }
      if (btnInspect) {
        btnInspect.removeEventListener("click", onProximityClick);
        btnInspect.removeEventListener("touchend", onProximityClick as any);
      }

      closeBtns.forEach((btn) => btn.removeEventListener("click", closeModal));

      touchHandlers.forEach(({ el, press, release }) => {
        el.removeEventListener("pointerdown", press as any);
        el.removeEventListener("pointerup", release as any);
        el.removeEventListener("pointercancel", release as any);
        el.removeEventListener("pointerleave", release as any);
      });

      // stop engine sound
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

      try {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentElement) {
          renderer.domElement.parentElement.removeChild(renderer.domElement);
        }
      } catch {}

      styleTag.remove();
    };
  }, []);

  return (
    <div className="bg-zinc-900 text-zinc-300 antialiased h-screen w-screen overflow-hidden">
      {/* INTRO OVERLAY */}
      <div
        id="start-screen"
        className="fixed inset-0 z-[60] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black
             flex items-center justify-center text-center p-6
             transition-opacity duration-700"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px]
                    bg-emerald-500/10 blur-[140px] rounded-full"
          />
        </div>

        <div className="relative space-y-8 max-w-xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                    bg-emerald-500/10 border border-emerald-500/30
                    text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Online
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
            Aakash
            <span className="block text-zinc-400 font-light tracking-wide text-3xl sm:text-4xl mt-1">
              Kushwaha
            </span>
          </h1>

          <h2 className="text-base sm:text-lg text-zinc-400 font-light tracking-wide">
            Java Backend Developer (SDE-1) · AI Builder · Spring Boot . REST APIs . SQL 
          </h2>

          <p className="text-sm text-zinc-500 leading-relaxed max-w-md mx-auto">
            This is an interactive world built from my journey — drive through skills, projects,
            certifications, and milestones.
          </p>

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
          {/* ✅ Skip to Dashboard (fast path) */}
          <a
          href="#dashboard"
          className="px-7 py-4 rounded-full text-sm font-semibold
                   border border-zinc-700 bg-zinc-900/40 text-zinc-200
                   hover:bg-zinc-900/60 hover:border-zinc-600 transition"
            >Skip World → Dashboard
          </a>

          <div className="pt-10 flex flex-col gap-3 text-[10px] text-zinc-600 uppercase tracking-widest">
            <p className="text-zinc-500">Controls</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["WASD", "Arrows", "Touch", "C : Camera", "Tap Inspect"].map((c) => (
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
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1 pointer-events-auto bg-zinc-900/60 backdrop-blur p-3 rounded-lg border border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <Icon icon="solar:gamepad-linear" className="text-emerald-400" width="16" />
              <h1 className="text-xs font-semibold tracking-tight text-white uppercase">
                Aakash.Dev [World]
              </h1>
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
          className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 transform scale-90 pointer-events-auto flex flex-col items-center"
        >
          <button
            id="btn-inspect"
            className="bg-white/90 backdrop-blur text-black px-5 py-3 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.4)] border border-white active:scale-95 transition-transform"
          >
            <Icon icon="solar:maximize-square-linear" width="16" className="animate-pulse" />
            <span className="hidden sm:inline">PRESS ENTER TO INSPECT</span>
            <span className="sm:hidden">TAP TO INSPECT</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex justify-between items-end w-full pb-4 pointer-events-auto">
          <div className="flex gap-4">
            <button
              id="btn-left"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center"
            >
              <Icon icon="solar:arrow-left-linear" className="text-white" width="24" />
            </button>
            <button
              id="btn-right"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center"
            >
              <Icon icon="solar:arrow-right-linear" className="text-white" width="24" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <button
              id="btn-gas"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center"
            >
              <Icon icon="solar:arrow-up-linear" className="text-white" width="24" />
            </button>
            <button
              id="btn-brake"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center"
            >
              <Icon icon="solar:arrow-down-linear" className="text-white" width="24" />
            </button>
            <button
              id="btn-cam"
              className="w-14 h-14 rounded-full bg-zinc-800/80 border border-white/20 active:bg-white/10 active:scale-95 transition-transform backdrop-blur flex items-center justify-center mt-4"
            >
              <Icon icon="solar:camera-linear" className="text-white" width="24" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D CANVAS */}
      <div id="canvas-container" className="relative z-0" />

      {/* WORLD LABELS */}
      <div id="labels-container" className="absolute inset-0 pointer-events-none z-10">
        {ZONES.map((zone) => (
          <div key={zone.id}>{zone.labelJSX}</div>
        ))}
      </div>

      {/* MODALS */}
      <div
        id="modal-container"
        className="fixed inset-0 z-[100] bg-zinc-900/80 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6"
      >
        {ZONES.map((zone) => (
          <div key={zone.id}>{zone.modalJSX}</div>
        ))}
      </div>

      <MiniMap zones={ZONES} />
    </div>
  );
}

export function startCityWorld() {
  throw new Error("Function not implemented.");
}
