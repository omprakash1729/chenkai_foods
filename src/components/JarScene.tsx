import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Lightformer, useGLTF, ContactShadows } from "@react-three/drei";
import { createElement, Suspense, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";


const SECTION_IDS = [
  "sec-hero",
  "sec-signature",
  "sec-collection",
  "sec-table",
  "sec-chenkai-way",
  "sec-orderband",
];

const progress = { v: 0, seg: 0, scrollY: 0, reduced: false };
const cursor = {
  hoverX: 0,
  hoverY: 0,
  dragX: 0,
  dragY: 0,
  isDragging: false,
  lastX: 0,
  lastY: 0,
};

const mobileInteractive = {
  rotX: 0,
  rotY: 0,
  targetRotX: 0,
  targetRotY: 0,
};

const LOCAL_GLB_URL = "/models/chenkai-jar.glb";

// Preload GLB model immediately
try {
  useGLTF.preload(LOCAL_GLB_URL);
} catch {
  // Silent catch
}

function GLTFJar() {
  const { scene } = useGLTF(LOCAL_GLB_URL);
  const modelScale = useMemo(() => {
    const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
    return size.y > 0 ? 1 / size.y : 1;
  }, [scene]);
  const g = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      (window as any).__CHENKAI_GLB_LOADED__ = true;
      window.dispatchEvent(new CustomEvent("chenkai-glb-loaded"));
    }
  }, [scene]);

  useEffect(() => {
    const onFlip = () => {
      mobileInteractive.targetRotX += Math.PI * 2;
    };
    const onSpin = () => {
      mobileInteractive.targetRotY += Math.PI * 2;
    };
    window.addEventListener("chenkai-jar-flip", onFlip);
    window.addEventListener("chenkai-jar-spin", onSpin);
    return () => {
      window.removeEventListener("chenkai-jar-flip", onFlip);
      window.removeEventListener("chenkai-jar-spin", onSpin);
    };
  }, []);

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.033);
    const p = progress.reduced ? 0 : progress.v;
    const mobile = state.size.width < 768;
    const tablet = state.size.width >= 768 && state.size.width < 1024;
    const side = state.viewport.width * (mobile ? 0.28 : tablet ? 0.2 : 0.25);

    // Smoothly ease mobile interactive rotations
    mobileInteractive.rotX += (mobileInteractive.targetRotX - mobileInteractive.rotX) * Math.min(1, 10 * dt);
    mobileInteractive.rotY += (mobileInteractive.targetRotY - mobileInteractive.rotY) * Math.min(1, 10 * dt);

    // xs positions corresponding to:
    // 0: sec-hero -> RIGHT
    // 1: sec-signature -> LEFT
    // 2: sec-collection -> RIGHT
    // 3: sec-table -> RIGHT (user requirement: at your table jar goes right)
    // 4: sec-chenkai-way -> LEFT (user requirement: 04 chenkai way jar goes left)
    // 5: sec-orderband -> RIGHT (order band CTA)
    // 6: beyond -> RIGHT
    const xs = tablet
      ? [side * 0.9, -side * 0.9, side * 0.8, side * 0.82, -side * 0.85, side * 0.4, side * 0.4]
      : [side * 0.95, -side * 0.95, side * 0.85, side * 0.88, -side * 0.92, side * 0.45, side * 0.45];

    const seg = Math.min(Math.max(0, progress.seg), 5.999);
    const i = Math.min(Math.floor(seg), 5);
    const t = seg - i; // progress in between section i and section i+1 (0 to 1)

    // Smooth horizontal position interpolation for desktop/tablet
    const e = t * t * (3 - 2 * t);
    const a = xs[i] ?? 0;
    const b = xs[i + 1] ?? a;
    const desktopTx = a + (b - a) * e;

    // Mobile layout:
    // 1. In Hero: jar sits on the RIGHT END (side * 0.82), leaving left 60% for title and CTA.
    // 2. On scroll: jar smoothly exits upward and fades out so Section 01 and products are completely unobstructed.
    const mobileExitProgress = mobile
      ? Math.max(0, Math.min(1, progress.scrollY / (Math.max(1, state.size.height) * 0.42)))
      : 0;
    const mobileExitEase = mobileExitProgress * mobileExitProgress * (3 - 2 * mobileExitProgress);
    const mobileExitY = mobileExitEase * state.viewport.height * 2.2;

    const tx = mobile
      ? side * 0.82 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03
      : desktopTx;

    const ty = mobile
      ? -state.viewport.height * 0.02 - mobileExitY + Math.cos(state.clock.elapsedTime * 1.5) * 0.025
      : 0;

    // Scale: mobile jar is compact and fades out on scroll
    const s = mobile
      ? state.viewport.height * 0.28 * Math.max(0, 1 - mobileExitEase * 0.9)
      : state.viewport.height * (tablet ? 0.38 : 0.48) * (1 + Math.sin(p * Math.PI * 2) * 0.04);

    // CURSOR & TOUCH INTERACTION:
    // 1. Reactive hover tilt tracking across viewport
    const hoverTiltX = -cursor.hoverY * 0.45;
    const hoverTiltY = cursor.hoverX * 0.75;

    // 2. Direct user click-and-drag 360-degree rotation
    const userDragX = cursor.dragY;
    const userDragY = cursor.dragX;

    // FRONT PRAWN PICKLE LABEL ORIENTATION:
    const LABEL_FRONT_OFFSET = Math.PI * 1.55;

    // SEAMLESS VERTICAL FLIP IN BETWEEN SECTIONS (Desktop):
    const u = Math.max(0, Math.min(1, (t - 0.15) / 0.7));
    const flipEase = u * u * u * (u * (u * 6 - 15) + 10);
    const verticalFlip = progress.reduced ? 0 : (i * Math.PI * 2) + (flipEase * Math.PI * 2);

    const inBetweenSwayY = progress.reduced ? 0 : Math.sin(flipEase * Math.PI) * 0.14;
    const inBetweenRollZ = progress.reduced ? 0 : Math.sin(flipEase * Math.PI) * ((i % 2 === 0 ? 1 : -1) * 0.12);

    if (!g.current) return;
    const k = 1 - Math.exp(-8 * dt);
    g.current.position.x += (tx - g.current.position.x) * k;
    g.current.position.y += (ty - g.current.position.y) * k;

    const targetRotX = (mobile ? 0 : verticalFlip) + hoverTiltX + userDragX + (mobile ? mobileInteractive.rotX : 0);
    const targetRotY = LABEL_FRONT_OFFSET + (mobile ? 0 : inBetweenSwayY) + hoverTiltY + userDragY + (mobile ? mobileInteractive.rotY : 0);
    const targetRotZ = mobile ? 0 : inBetweenRollZ;

    g.current.rotation.x += (targetRotX - g.current.rotation.x) * k;
    g.current.rotation.y += (targetRotY - g.current.rotation.y) * k;
    g.current.rotation.z += (targetRotZ - g.current.rotation.z) * k;

    const cs = g.current.scale.x + (s - g.current.scale.x) * k;
    g.current.scale.setScalar(cs);
  });

  return createElement("group", { ref: g },
    createElement(Center, null,
      createElement("primitive", { object: scene, scale: modelScale }),
    ),
  );
}

export function JarScene() {
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight;
          const scrollY = window.scrollY;

          // Compute targets: the scrollY position where each section center aligns with viewport center
          const targets = SECTION_IDS.map((id, index) => {
            const el = document.getElementById(id);
            if (!el) return index * vh;
            if (index === 0) return 0;
            const rect = el.getBoundingClientRect();
            const elTop = scrollY + rect.top;
            const elH = el.offsetHeight;
            return Math.max(0, elTop + elH / 2 - vh / 2);
          });

          // Ensure monotonic order of targets
          for (let k = 1; k < targets.length; k++) {
            if (targets[k] <= targets[k - 1]) {
              targets[k] = targets[k - 1] + 1;
            }
          }

          let seg = 0;
          if (scrollY <= targets[0]) {
            seg = 0;
          } else if (scrollY >= targets[targets.length - 1]) {
            seg = targets.length - 1;
          } else {
            for (let k = 0; k < targets.length - 1; k++) {
              const tA = targets[k];
              const tB = targets[k + 1];
              if (scrollY >= tA && scrollY <= tB) {
                const span = Math.max(1, tB - tA);
                const localProgress = (scrollY - tA) / span;
                seg = k + localProgress;
                break;
              }
            }
          }

          progress.seg = seg;
          progress.scrollY = scrollY;

          const section = document.getElementById("jar-story");
          if (section) {
            const max = section.offsetHeight - vh;
            progress.v = max > 0 ? Math.max(0, Math.min(1, (scrollY - section.offsetTop) / max)) : 0;
            progress.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // CURSOR & DRAG INTERACTION HANDLERS:
    const onPointerMove = (e: PointerEvent) => {
      cursor.hoverX = (e.clientX / window.innerWidth) * 2 - 1;
      cursor.hoverY = (e.clientY / window.innerHeight) * 2 - 1;
      if (cursor.isDragging) {
        const dx = e.clientX - cursor.lastX;
        const dy = e.clientY - cursor.lastY;
        cursor.dragX += dx * 0.007;
        cursor.dragY += dy * 0.007;
        cursor.lastX = e.clientX;
        cursor.lastY = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      // Do not initiate 3D drag if clicking links, buttons, inputs, etc.
      if (target?.closest?.("a, button, input, textarea, select, [role='button']")) {
        return;
      }
      cursor.isDragging = true;
      cursor.lastX = e.clientX;
      cursor.lastY = e.clientY;
    };

    const onPointerUp = () => {
      cursor.isDragging = false;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <div className="sticky top-0 h-[100svh] w-full">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.3, 5], fov: 38 }}
          gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          {createElement("ambientLight", { intensity: 0.6 })}
          {createElement("directionalLight", { position: [3, 5, 4], intensity: 2 })}
          <Suspense fallback={null}>
            {createElement(GLTFJar)}
            {createElement(ContactShadows, { frames: 1, position: [0, -1.4, 0], opacity: 0.35, blur: 2.5, scale: 6 })}
            {createElement(Environment, { resolution: 128 },
              createElement(Lightformer, { intensity: 2, position: [0, 5, 0], scale: [10, 10, 1] }),
              createElement(Lightformer, { intensity: 1.5, color: "#ff3b30", position: [-5, 1, -1], rotation: [0, Math.PI / 2, 0], scale: [20, 1, 1] }),
              createElement(Lightformer, { intensity: 1, position: [5, 1, 1], rotation: [0, -Math.PI / 2, 0], scale: [20, 2, 1] }),
            )}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}


