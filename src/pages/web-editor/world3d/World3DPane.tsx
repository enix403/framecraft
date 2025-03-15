import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Bounds,
  GizmoHelper,
  GizmoViewport,
  GizmoViewcube,
  Grid,
  Html
} from "@react-three/drei";
import { getInitialPlan } from "@/lib/demo/initialPlan";
import { build3DModel } from "./build-geometry";
import { COLOR_SKY } from "./styles";
import { CELL_SIZE } from "../world2d/common";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { RecenterButton } from "../world2d/controls/RecenterButton";
import clsx from "clsx";

/* =============================================== */

const model = build3DModel(getInitialPlan());

function World3DEditor() {
  return (
    <Canvas camera={{ position: [-10, 40, 5], near: 0.1, far: 600 }}>
      <color attach='background' args={[COLOR_SKY]} />

      <ambientLight intensity={0.8} />
      <directionalLight position={[100, 150, 100]} intensity={0.8} />
      <directionalLight position={[100, -150, 100]} intensity={0.8} />
      <directionalLight position={[0, -150, 0]} intensity={0.8} />
      <directionalLight position={[0, 150, 0]} intensity={0.8} />

      <OrbitControls target={[0, 0, 0]} enableDamping={true} />

      <GizmoHelper
        alignment='top-right' // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      >
        <GizmoViewport axisHeadScale={1.2} />
      </GizmoHelper>

      <Bounds fit clip observe margin={1.2}>
        <primitive object={model} />
        <Grid
          infiniteGrid
          cellSize={(CELL_SIZE * 12) / 2}
          sectionSize={CELL_SIZE * 12}
          fadeDistance={10000}
          fadeStrength={4}
          position={[0, -1, 0]}
          side={THREE.DoubleSide}
          cellColor='#AAAAAA'
          sectionColor='#FAFAFA'
        />
      </Bounds>
    </Canvas>
  );
}

export function World3DPane() {
  return (
    <div className='relative flex flex-1-fix flex-col'>
      <div className='flex-1-fix'>
        <World3DEditor />
      </div>

      <div
        className={clsx(
          "absolute rounded-full",
          "bg-[#000000] opacity-5 pointer-events-none",
          "top-2 right-2 size-36"
        )}
      ></div>
    </div>
  );
}
