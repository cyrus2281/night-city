import { useEffect } from "react";
import { getCameraFOV } from "../utils/utils";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import useSound from "../stores/useSound";
import { GUY_AUDIOS } from "../utils/guyAudios";
import { printNightCityInfo } from "../utils/utils";

let lastDevToolsWarning = 0;

function Effects() {
  const playSound = useSound((state) => state.playSound);

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

  return <></>;
}

export default Effects;
