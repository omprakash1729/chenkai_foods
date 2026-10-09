import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Lightformer, useGLTF, ContactShadows } from "@react-three/drei";
import { createElement, Suspense, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import jarAsset from "@/assets/chenkai-jar.glb.asset.json";

const progress = { v: 0, reduced: false };

function Jar() {
  const { scene } = useGLTF(jarAsset.url);
  const modelScale = useMemo(() => {
    const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
    return size.y > 0 ? 1 / size.y : 1;
  }, [scene]);
  const g = useRef<THREE.Group>(null);
  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const p = progress.reduced ? 0 : progress.v;
    const mobile = state.size.width < 768;
    // keyframes across the page: center -> right -> left -> center
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
    const s = state.viewport.height * (mobile ? 0.26 : 0.55) * (1 + Math.sin(p * Math.PI) * 0.05);
    if (!g.current) return;
    const k = 1 - Math.exp(-6 * dt);
    g.current.position.x += (tx - g.current.position.x) * k;
    g.current.position.y += (ty - g.current.position.y) * k;
    g.current.rotation.y += ((progress.reduced ? 0 : p * Math.PI * 4 + state.clock.elapsedTime * 0.2) - g.current.rotation.y) * k;
    g.current.rotation.z += (Math.sin(p * Math.PI * 2) * 0.25 - g.current.rotation.z) * k;
    const cs = g.current.scale.x + (s - g.current.scale.x) * k;
    g.current.scale.setScalar(cs);
  });
  // Three objects are not DOM nodes: keep editor DOM metadata off their props.
  return createElement("group", { ref: g },
    createElement(Center, null,
      createElement("primitive", { object: scene, scale: modelScale }),
    ),
  );
}

export function JarScene() {
  useEffect(() => {
    const on = () => {
      const section = document.getElementById("jar-story");
      if (!section) return;
      const max = section.offsetHeight - window.innerHeight;
      progress.v = max > 0 ? Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / max)) : 0;
      progress.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="sticky top-0 h-[100svh]"><Canvas dpr={[1, 1.25]} camera={{ position: [0, 0.3, 5], fov: 35 }} gl={{ alpha: true }}>
        {createElement("ambientLight", { intensity: 0.6 })}
        {createElement("directionalLight", { position: [3, 5, 4], intensity: 2 })}
        <Suspense fallback={null}>
          <Jar />
          <ContactShadows frames={1} position={[0, -1.4, 0]} opacity={0.35} blur={2.5} scale={6} />
          <Environment resolution={128}>
            <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
            <Lightformer intensity={1.5} color="#ff3b30" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
            <Lightformer intensity={1} position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[20, 2, 1]} />
          </Environment>
        </Suspense>
      </Canvas></div>
    </div>
  );
}
