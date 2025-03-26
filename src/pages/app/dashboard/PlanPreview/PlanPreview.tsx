import Konva from "konva";
import { atom, useAtomValue, useSetAtom } from "jotai";
import {
  RefObject,
  useMemo,
  useLayoutEffect,
  useState
} from "react";

import { useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useMeasure } from "@uidotdev/usehooks";

import { RenderRooms, RenderWalls, RenderDoors } from "./preview-objects";

/* ============================================= */

import { CELL_SIZE } from "./preview-objects";

type Size = { width: number; height: number };
type Nullable<T> = { [K in keyof T]: T[K] | null };

/* ================== */

type PlanFocus = {
  planCenter: Konva.Vector2d;
  baseScale: number;
};

const noFocus: PlanFocus = {
  planCenter: { x: NaN, y: NaN },
  baseScale: 1
};

function _calculateFocus(plan, containerSize: Size) {
  if (plan.rooms.length === 0) return noFocus;

  let minRow = Infinity,
    minCol = Infinity;
  let maxRow = -Infinity,
    maxCol = -Infinity;

  // Find bounding box of all room rects
  plan.rooms.forEach(room => {
    room.rects.forEach(({row, col, width, height}) => {
      minRow = Math.min(minRow, row);
      minCol = Math.min(minCol, col);
      maxRow = Math.max(maxRow, row + height);
      maxCol = Math.max(maxCol, col + width);
    });
  });

  // Convert to pixel dimensions
  const boundingWidth = (maxCol - minCol) * CELL_SIZE;
  const boundingHeight = (maxRow - minRow) * CELL_SIZE;

  const paddingFactor = 0.9; // Leave 10% padding around the plan
  const scaleX = (containerSize.width / boundingWidth) * paddingFactor;
  const scaleY = (containerSize.height / boundingHeight) * paddingFactor;
  const baseScale = Math.min(scaleX, scaleY); // Fit to the smaller dimension

  // Compute center of bounding box
  const centerX = ((minCol + maxCol) / 2) * CELL_SIZE;
  const centerY = ((minRow + maxRow) / 2) * CELL_SIZE;

  // Compute new viewport offset to center it
  const screenCenterX = containerSize.width / 2;
  const screenCenterY = containerSize.height / 2;

  const planCenter = {
    x: screenCenterX - centerX * baseScale,
    y: screenCenterY - centerY * baseScale
  };

  return { planCenter, baseScale } as PlanFocus;
}

function usePlanComponentsFocus(components, containerSize: Nullable<Size>) {
  const [focus, setFocus] = useState(noFocus);

  useLayoutEffect(() => {
    if (!containerSize.width || !containerSize.height) return;

    setFocus(_calculateFocus(components, containerSize as any));
  }, [containerSize]);

  return focus;
}

/* ================== */

function _scaleStageToImpl(
  stage: Konva.Stage,
  newScale: number,
  focusPoint?: Konva.Vector2d
) {
  if (!focusPoint)
    focusPoint = {
      x: stage.width() / 2,
      y: stage.height() / 2
    };

  /* ===== Set Position ===== */
  const oldScale = stage.scaleX();

  const mousePointTo = {
    x: (focusPoint.x - stage.x()) / oldScale,
    y: (focusPoint.y - stage.y()) / oldScale
  };

  const newPos = {
    x: focusPoint.x - mousePointTo.x * newScale,
    y: focusPoint.y - mousePointTo.y * newScale
  };

  stage.position(newPos);

  /* ===== Set Scale ===== */
  stage.scale({ x: newScale, y: newScale });
}

const zoomLevelAtom = atom(1);

export function useZoomLevel() {
  return useAtomValue(zoomLevelAtom);
}

export class Camera {
  public constructor(
    private readonly stageRef: RefObject<Konva.Stage | null>,
    private readonly focus: PlanFocus,
    private readonly setZoomLevel: (x: number) => void
  ) {}

  public get Stage() {
    return this.stageRef.current;
  }

  public isStageActive() {
    return Boolean(this.Stage) && !isNaN(this.focus.planCenter.x);
  }

  public get CurrentScale() {
    return this.stageRef.current?.scaleX() || 1;
  }

  public get BaseScale() {
    return this.focus.baseScale;
  }

  public get PlanCenter() {
    return this.focus.planCenter;
  }

  public scaleStageTo(newScale: number, focusPoint?: Konva.Vector2d) {
    if (!this.Stage) return;

    _scaleStageToImpl(this.Stage, newScale, focusPoint);
    this.setZoomLevel(newScale / this.focus.baseScale);
  }

  public moveStageTo(pos: Konva.Vector2d) {
    if (!this.Stage) return;

    this.Stage.position(pos);
  }

  public setZoom(zoomLevel: number) {
    this.scaleStageTo(zoomLevel * this.focus.baseScale);
  }

  public recenter() {
    this.scaleStageTo(this.BaseScale);
    this.moveStageTo(this.PlanCenter);
  }
}

export function useCamera(
  components,
  stageRef: RefObject<Konva.Stage | null>,
  containerSize: Nullable<Size>
) {
  const focus = usePlanComponentsFocus(components, containerSize);

  const setZoomLevel = useSetAtom(zoomLevelAtom);
  const camera = useMemo(
    () => new Camera(stageRef, focus, setZoomLevel),
    [focus]
  );

  useEffect(() => {
    camera.scaleStageTo(camera.CurrentScale);
  }, [camera]);

  return camera;
}


/* ============================================= */

export function useInitialRecenter(camera: Camera) {
  const initiallyRecentered = useRef(false);

  useLayoutEffect(() => {
    if (!camera.isStageActive()) {
      return;
    }

    if (initiallyRecentered.current) {
      return;
    }

    initiallyRecentered.current = true;

    camera.recenter();
  }, [camera]);
}


/* ============================================= */

// export function World2DEditor() {
export function PlanPreview({ plan }: { plan: any }) {
  const [containerRef, containerSize] = useMeasure();
  const stageRef = useRef<Konva.Stage | null>(null);

  const components = plan.canvas.canvasData;
  const camera = useCamera(components, stageRef, containerSize);

  useInitialRecenter(camera);

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
          <RenderRooms components={components} />
          <RenderWalls components={components} />
          <RenderDoors components={components} />
        </Layer>
      </Stage>
    </div>
  );
}

/* export function PlanPreview({ plan }: { plan: any }) {
  return (
    <div className='h-full w-full'>
      <img src='/plan1.jpg' className='h-full w-full object-fill' />
    </div>
  );
}
 */