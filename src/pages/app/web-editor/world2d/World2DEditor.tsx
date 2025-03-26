import Konva from "konva";
import { useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useMeasure } from "@uidotdev/usehooks";

import {
  RenderRooms,
  RenderWalls,
  RenderDoors,
  RenderRoomLabels,
  RenderWallMeasures
} from "./render-objects/objects";

import { useSettings, useSetZoomLevel } from "./state/settings";
import { useWheelZoomListener } from "./hooks/useWheelZoomListener";
import { useInitialRecenter } from "./hooks/useInitialRecenter";
import { commandsSubject } from "./state/commands";
import { useCamera } from "@/lib/camera";
import { usePlanComponents } from "../plan-state";

/* ============================================= */


export function World2DEditor() {
  const components = usePlanComponents();

  const [containerRef, containerSize] = useMeasure();
  const stageRef = useRef<Konva.Stage | null>(null);

  const setZoomLevel = useSetZoomLevel();
  const camera = useCamera(stageRef, containerSize, components, setZoomLevel);

  useInitialRecenter(camera);
  useWheelZoomListener(camera);

  useEffect(() => {
    const subscription = commandsSubject.subscribe(cmd => {
      if (cmd.type === "recenter") {
        camera.recenter();
      } else if (cmd.type === "set-zoom") {
        camera.setZoom(cmd.zoomPercent / 100.0);
      }
    });

    return () => subscription.unsubscribe();
  }, [camera]);

  const settings = useSettings();

  return (
    <div ref={containerRef} className='h-full max-h-full w-full max-w-full'>
      <Stage
        ref={stageRef}
        width={containerSize.width || 0}
        height={containerSize.height || 0}
        draggable
        style={{ background: "#F6F6F6" }}
      >
        <Layer>
          {settings.viewMode === "color" && <RenderRooms />}
          <RenderWalls />
          <RenderDoors />
          {settings.enableRoomLabels && <RenderRoomLabels />}
          {settings.enableWallMeasure && <RenderWallMeasures />}
        </Layer>
      </Stage>
    </div>
  );
}
