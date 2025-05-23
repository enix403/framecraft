import Konva from "konva";
import { createRef, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useMeasure } from "@uidotdev/usehooks";

import { stageRef, useSettings, useSetZoomLevel } from "./state/settings";
import { useWheelZoomListener } from "./hooks/useWheelZoomListener";
import { commandsSubject } from "./state/commands";
import { useCamera, useInitialRecenter } from "@/lib/camera";
import { usePlanComponents } from "../plan-state";

import { RenderObjectsProvider } from "@/components/plan2d-render-objects/RenderObjectsProvider";
import { RenderRooms } from "@/components/plan2d-render-objects/RenderRooms";
import { RenderWalls } from "@/components/plan2d-render-objects/RenderWalls";
import { RenderDoors } from "@/components/plan2d-render-objects/RenderDoors";
import { RenderRoomLabels } from "@/components/plan2d-render-objects/RenderRoomLabels";
import { RenderWallMeasures } from "@/components/plan2d-render-objects/RenderWallMeasures";
import { useResolvedTheme } from "@/components/theme-provider";
import { wallStyles } from "@/lib/node-styles";

/* ============================================= */

export function World2DEditor() {
  const components = usePlanComponents();

  const [containerRef, containerSize] = useMeasure();

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
  const isDark = useResolvedTheme() === "dark";

  return (
    <div ref={containerRef} className='h-full max-h-full w-full max-w-full'>
      <Stage
        ref={stageRef}
        width={containerSize.width || 0}
        height={containerSize.height || 0}
        draggable
        style={{ background: isDark ? "#101115FF" : "#F6F6F6" }}
      >
        <RenderObjectsProvider planComponents={components}>
          <Layer>
            {settings.viewMode === "color" && <RenderRooms />}
            <RenderWalls wireframeMode={settings.viewMode === "wireframe"} />
            <RenderDoors />
            {settings.enableRoomLabels && <RenderRoomLabels />}
            {settings.enableWallMeasure && (
              <RenderWallMeasures unit={settings.unit} />
            )}
          </Layer>
        </RenderObjectsProvider>
      </Stage>
    </div>
  );
}
