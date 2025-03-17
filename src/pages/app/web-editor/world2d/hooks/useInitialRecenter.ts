import { useRef, useLayoutEffect } from "react";
import { Camera } from "../state/camera";

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
