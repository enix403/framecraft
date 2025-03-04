import {
  useRef,
  useLayoutEffect,
} from "react";
import { CameraController } from "../state/camera";

export function useRecenter(camera: CameraController) {
  const firstPlaced = useRef(false);

  useLayoutEffect(() => {
    if (!camera.isStageActive()) {
      return;
    }

    if (firstPlaced.current) {
      return;
    }

    firstPlaced.current = true;

    // performRecenter();
    camera.recenter();
  }, [camera]);
}
