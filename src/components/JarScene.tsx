import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Lightformer, useGLTF, ContactShadows } from "@react-three/drei";
import { createElement, Suspense, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";


const progress = { v: 0, reduced: false };
const cursor = {
  hoverX: 0,
  hoverY: 0,
  dragX: 0,
  dragY: 0,
  isDragging: false,
  lastX: 0,
  lastY: 0,
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

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.033);
    const p = progress.reduced ? 0 : progress.v;
    const mobile = state.size.width < 768;
    const side = state.viewport.width * 0.25;

    // Smooth journey across entire site from top to end:
    // Hero (right) -> Sec 01 (left) -> Products (right) -> Banner (left) -> Sec 04 (right) -> End / OrderBand (center)
    const xs = mobile
      ? [0, 0, 0, 0, 0, 0]
      : [side * 0.95, -side * 0.95, side * 0.85, -side * 0.8, side * 0.85, 0];

    const seg = Math.min(p * 5, 4.999);
    const i = Math.floor(seg);
    const t = seg - i;
    const e = t * t * (3 - 2 * t);
    const a = xs[i] ?? 0;
    const b = xs[i + 1] ?? 0;
    const tx = a + (b - a) * e;
    const ty = mobile ? -state.viewport.height * 0.22 : 0;
    const s = state.viewport.height * (mobile ? 0.26 : 0.5) * (1 + Math.sin(p * Math.PI * 2) * 0.06);

    // CURSOR INTERACTION:
    // 1. Reactive hover tilt tracking across viewport
    const hoverTiltX = -cursor.hoverY * 0.55;
    const hoverTiltY = cursor.hoverX * 0.85;

    // 2. Direct user click-and-drag 360-degree rotation
    const userDragX = cursor.dragY;
    const userDragY = cursor.dragX;

    // FRONT LABEL ORIENTATION:
    // Starts facing the FRONT branded label (180 deg opposite of untextured back)
    const LABEL_FRONT_OFFSET = Math.PI * 1.55;

    // SCROLL FLIPS:
    // Dynamic vertical flip on X (360 deg flips during travel across page)
    const verticalFlip = progress.reduced ? 0 : p * Math.PI * 4;
    // Horizontal spin on Y across scroll
    const horizontalSpin = progress.reduced ? 0 : p * Math.PI * 6;
    // Dynamic tumble roll on Z
    const tumbleRoll = progress.reduced ? 0 : Math.sin(p * Math.PI * 4) * 0.35;

    if (!g.current) return;
    const k = 1 - Math.exp(-8 * dt);
    g.current.position.x += (tx - g.current.position.x) * k;
    g.current.position.y += (ty - g.current.position.y) * k;

    // Target rotations combining scroll flips + cursor hover tilt + user drag rotation
    const targetRotX = verticalFlip + hoverTiltX + userDragX;
    const targetRotY = LABEL_FRONT_OFFSET + horizontalSpin + hoverTiltY + userDragY;
    const targetRotZ = tumbleRoll;

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
          const section = document.getElementById("jar-story");
          if (section) {
            const max = section.offsetHeight - window.innerHeight;
            progress.v = max > 0 ? Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / max)) : 0;
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
      <div className="sticky top-0 h-[100svh]">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.3, 5], fov: 35 }}
          gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
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


