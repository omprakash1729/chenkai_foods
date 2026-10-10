import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Lightformer, useGLTF, ContactShadows } from "@react-three/drei";
import { createElement, Suspense, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

const progress = { v: 0, reduced: false };
const LOCAL_GLB_URL = "/models/chenkai-jar.glb";

// Preload GLB model immediately so fallback cylinder jar NEVER displays
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
    const side = state.viewport.width * 0.24;

    const xs = mobile ? [0, 0, 0, 0] : [side, side * 0.4, -side, -side];
    const seg = Math.min(p * 3, 2.999);
    const i = Math.floor(seg);
    const t = seg - i;
    const e = t * t * (3 - 2 * t);
    const a = xs[i] ?? 0;
    const b = xs[i + 1] ?? 0;
    const tx = a + (b - a) * e;
    const ty = mobile ? -state.viewport.height * 0.25 : 0;
    const s = state.viewport.height * (mobile ? 0.26 : 0.52) * (1 + Math.sin(p * Math.PI) * 0.06);

    const mouseX = state.pointer.x * 0.35;
    const mouseY = -state.pointer.y * 0.25;

    // START GLB FILE FROM LABEL-LOOKING FRONT VIEW
    const LABEL_FRONT_OFFSET = Math.PI * 1.55;

    if (!g.current) return;
    const k = 1 - Math.exp(-8 * dt);
    g.current.position.x += (tx - g.current.position.x) * k;
    g.current.position.y += (ty - g.current.position.y) * k;

    // Keep dynamic flip & rotations while starting from the front label view
    g.current.rotation.x += (mouseY - g.current.rotation.x) * k;
    g.current.rotation.y += ((progress.reduced ? 0 : LABEL_FRONT_OFFSET + p * Math.PI * 4 + state.clock.elapsedTime * 0.15 + mouseX) - g.current.rotation.y) * k;
    g.current.rotation.z += ((Math.sin(p * Math.PI * 2) * 0.25) - g.current.rotation.z) * k;

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

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
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

