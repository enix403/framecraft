import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds } from "@react-three/drei";
import { getInitialPlan } from "@/lib/demo/initialPlan";
import { build3DModel } from "./build-geometry";
import { COLOR_SKY } from "./styles";

/* =============================================== */

const model = build3DModel(getInitialPlan());

export function World3DPane() {
  return (
    <Canvas camera={{ position: [-10, 40, 5], near: 0.1, far: 100 }}>
      <color attach='background' args={[COLOR_SKY]} />

      <ambientLight intensity={0.8} />
      <directionalLight position={[100, 150, 100]} intensity={0.8} />
      <directionalLight position={[100, -150, 100]} intensity={0.8} />
      <directionalLight position={[0, -150, 0]} intensity={0.8} />
      <directionalLight position={[0, 150, 0]} intensity={0.8} />

      <OrbitControls target={[0, 0, 0]} enableDamping={true} />
      <Bounds fit clip observe margin={1.2}>
        <primitive object={model} />
      </Bounds>
    </Canvas>
  );
}
