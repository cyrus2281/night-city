import { useEffect } from "react";
import { getCameraFOV } from "../utils/utils";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import useSound from "../stores/useSound";
import { GUY_AUDIOS } from "../utils/guyAudios";
import { printNightCityInfo } from "../utils/utils";

const PAGE_TIMEOUT = 1000 * 60 * 5; // 5 minutes

let lastDevToolsWarning = 0;
let leftPageDate = 0;

function Effects() {
  const playSound = useSound((state) => state.playSound);
  const fadeOutSounds = useSound((state) => state.fadeOutSounds);
  const fadeInSounds = useSound((state) => state.fadeInSounds);

  const camera = useThree((state) => state.camera);
  // Pov Update and Dev Tools Warning on Resize
  useEffect(() => {
    const handleResize = () => {
      // Update camera FOV on window resize
      const fov = getCameraFOV();
      (camera as PerspectiveCamera).fov = fov;
      camera.updateProjectionMatrix();
      // Check if user has open dev tools
      if (
        window.outerHeight - window.innerHeight > 200 &&
        Date.now() - lastDevToolsWarning > 60000
      ) {
        printNightCityInfo();
        console.log("You're a developer, aren't you?");
        lastDevToolsWarning = Date.now();
        playSound(GUY_AUDIOS.DEV_TOOLS);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // User leave/return to page detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        leftPageDate = Date.now();
        fadeOutSounds();
      } else {
        fadeInSounds(() => {
          if (leftPageDate && Date.now() - leftPageDate > PAGE_TIMEOUT) {
            playSound(GUY_AUDIOS.PAGE_RETURN);
          }
          leftPageDate = 0;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return <></>;
}

export default Effects;
