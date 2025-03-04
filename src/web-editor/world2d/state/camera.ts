import Konva from "konva";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { PlanFocus } from "../hooks/usePlanFocus";
import { RefObject, useEffect, useMemo } from "react";

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
    return Boolean(this.Stage) && !isNaN(this.focus.initialPos.x);
  }

  public get CurrentScale() {
    return this.stageRef.current?.scaleX() || 1;
  }

  public get BaseScale() {
    return this.focus.baseScale;
  }

  public get InitialPos() {
    return this.focus.initialPos;
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
    this.moveStageTo(this.InitialPos);
  }
}

export function useCamera(
  stageRef: RefObject<Konva.Stage | null>,
  focus: PlanFocus
) {
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
