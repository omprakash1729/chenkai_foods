import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Lightformer, useGLTF, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import jarAsset from "@/assets/chenkai-jar.glb.asset.json";

const progress = { v: 0 };

function Jar() {
  const { scene } = useGLTF(jarAsset.url);
  const g = useRef<THREE.Group>(null);
  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const p = progress.v;
    const mobile = state.size.width < 768;
    // keyframes across the page: center -> right -> left -> center
    const xs = mobile ? [0, 0, 0, 0] : [1.1, -1.3, 1.3, 0];
    const seg = Math.min(p * 3, 2.999);
    const i = Math.floor(seg);
    const t = seg - i;
    const e = t * t * (3 - 2 * t);
    const a = xs[i] ?? 0;
    const b = xs[i + 1] ?? 0;
    const tx = a + (b - a) * e;
    const ty = mobile ? 0.5 - p * 0.3 : 0;
    const s = (mobile ? 1.4 : 2.0) * (1 + Math.sin(p * Math.PI) * 0.15);
    if (!g.current) return;
    const k = 1 - Math.exp(-6 * dt);
    g.current.position.x += (tx - g.current.position.x) * k;
    g.current.position.y += (ty - g.current.position.y) * k;
    g.current.rotation.y += (p * Math.PI * 4 + state.clock.elapsedTime * 0.2 - g.current.rotation.y) * k;
    g.current.rotation.z += (Math.sin(p * Math.PI * 2) * 0.25 - g.current.rotation.z) * k;
    const cs = g.current.scale.x + (s - g.current.scale.x) * k;
    g.current.scale.setScalar(cs);
  });
  return (
    <group ref={g} scale={2.4}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export function JarScene() {
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.v = max > 0 ? window.scrollY / max : 0;
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
    <div className="pointer-events-none fixed inset-0 z-10">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.3, 5], fov: 35 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={2} />
        <Suspense fallback={null}>
          <Jar />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.35} blur={2.5} scale={6} />
          <Environment>
            <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
            <Lightformer intensity={1.5} color="#ff3b30" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
            <Lightformer intensity={1} position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[20, 2, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
