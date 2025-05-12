import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Bounds,
  GizmoHelper,
  GizmoViewport,
  Grid
} from "@react-three/drei";
import { build3DModel } from "./build-geometry";

import { useMemo } from "react";
import clsx from "clsx";
import { usePlanComponents } from "../plan-state";
import { CELL_SIZE } from "@/lib/units";
import { useResolvedTheme } from "@/components/theme-provider";

/* =============================================== */

const styles = {
  light: {
    skyColor: "#F6F6F6",
    gridCellColor: "#AAAAAA",
    gridSectionColor: "#FAFAFA"
  },
  dark: {
    skyColor: "#101115",
    gridCellColor: "#6E6E6E",
    gridSectionColor: "#2E2E2E"
  }
};

function World3DEditor() {
  const plan = usePlanComponents();

  const model = useMemo(() => build3DModel(plan), [plan]);
  const isDark = useResolvedTheme() === "dark";
  const style = isDark ? styles.dark : styles.light;

  return (
    <Canvas camera={{ position: [-2, 27, 5], near: 0.1, far: 600 }}>
      <color attach='background' args={[style.skyColor]} />

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
          cellColor={style.gridCellColor}
          sectionColor={style.gridSectionColor}
        />
      </Bounds>
    </Canvas>
  );
}

export function World3DPane() {
  return (
    <div className='relative flex flex-1-fix flex-col'>
      <>
        <div className='flex-1-fix'>
          <World3DEditor />
        </div>

        <div
          className={clsx(
            "pointer-events-none absolute top-0 right-0",
            "-translate-x-20 translate-y-20"
          )}
        >
          <div className='size-36 translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground opacity-5'></div>
        </div>
      </>
    </div>
  );
}
