import Konva from "konva";
import { atom, useSetAtom } from "jotai";
import { PlanFocus } from "../hooks/usePlanFocus";
import { RefObject, SetStateAction, useEffect, useMemo } from "react";
import { Certificate } from "crypto";

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

  const oldScale = stage.scaleX();

  const mousePointTo = {
    x: (focusPoint.x - stage.x()) / oldScale,
    y: (focusPoint.y - stage.y()) / oldScale
  };

  stage.scale({ x: newScale, y: newScale });

  const newPos = {
    x: focusPoint.x - mousePointTo.x * newScale,
    y: focusPoint.y - mousePointTo.y * newScale
  };

  stage.position(newPos);
}

const zoomLevelAtom = atom(1);

export class CameraController {
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
    () => new CameraController(stageRef, focus, setZoomLevel),
    [focus]
  );

  useEffect(() => {
    camera.scaleStageTo(camera.CurrentScale);
  }, [camera]);

  return camera;

  /*   function scaleStageTo(newScale: number, focusPoint?: Konva.Vector2d) {
    if (!stageRef.current) return;

    _scaleStageToImpl(stageRef.current, newScale, focusPoint);
    setZoomLevel(newScale / focus.baseScale);
  }

  function setZoom(zoomLevel: number) {
    if (!stageRef.current) return;

    scaleStageTo(zoomLevel * focus.baseScale);
  }

  useEffect(() => {
    if (!stageRef.current) return;

    scaleStageTo(stageRef.current.scaleX());
  }, [focus]); */
}
