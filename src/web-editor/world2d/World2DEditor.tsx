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

import { eventSubject, useSettings } from "./state/settings";
import { usePlanFocus } from "./hooks/usePlanFocus";
import {
  useStageScaler,
  useWheelZoomListener
} from "./hooks/useWheelZoomListener";
import { useRecenter } from "./hooks/useRecenter";

/* ============================================= */

export function World2DEditor() {
  const [containerRef, containerSize] = useMeasure();
  const stageRef = useRef<Konva.Stage | null>(null);

  const { baseScale, initialPos } = usePlanFocus(stageRef, containerSize);

  const scaleStageTo = useStageScaler(stageRef, baseScale);
  const { forceRecenter } = useRecenter(
    stageRef,
    baseScale,
    initialPos,
    scaleStageTo
  );

  useWheelZoomListener(stageRef, baseScale);

  useEffect(() => {
    const subscription = eventSubject.subscribe(event => {
      if (event.type === "recenter") {
        forceRecenter();
      } else if (event.type === "set-zoom") {
        let zoomLevel = event.zoomPercent / 100.0;
        let newScale = zoomLevel * baseScale;
        scaleStageTo(newScale);
      }
    });

    return () => subscription.unsubscribe();
  }, [forceRecenter, scaleStageTo, baseScale]);

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
