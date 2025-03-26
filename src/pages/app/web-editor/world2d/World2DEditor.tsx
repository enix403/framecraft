// import Konva from "konva";
// import { useEffect, useRef } from "react";
// import { Stage, Layer } from "react-konva";
// import { useMeasure } from "@uidotdev/usehooks";

// import {
//   RenderRooms,
//   RenderWalls,
//   RenderDoors,
//   RenderRoomLabels,
//   RenderWallMeasures
// } from "./render-objects/objects";

// import { useSettings } from "./state/settings";
// import { useCamera } from "./state/camera";
// import { useWheelZoomListener } from "./hooks/useWheelZoomListener";
// import { useInitialRecenter } from "./hooks/useInitialRecenter";
// import { commandsSubject } from "./state/commands";

/* ============================================= */

export function World2DEditor() {
  return null;
  const [containerRef, containerSize] = useMeasure();
  const stageRef = useRef<Konva.Stage | null>(null);

  const camera = useCamera(stageRef, containerSize);

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
