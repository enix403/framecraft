import {
  useRef,
  useLayoutEffect,
} from "react";
import { CameraController } from "../state/camera";

export function useInitialRecenter(camera: CameraController) {
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
