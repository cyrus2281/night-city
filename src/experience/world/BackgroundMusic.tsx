import { useEffect } from "react";
import useSound from "../stores/useSound";
import { ASSETS } from "../utils/constants";
import { AudioConfig } from "../utils/interfaces";

let currentLofiIndex = 0;
function BackgroundMusic() {
  const playSound = useSound((state) => state.playSound);

  const backgroundMusicConfig: { [name: string]: AudioConfig } = {
    rain: {
      path: ASSETS.BACKGROUND_MUSIC.RAIN,
      volume: 0.1,
      duration: 0,
    },
    lofi: {
      path: ASSETS.BACKGROUND_MUSIC.LOFI[currentLofiIndex],
      volume: 0.15,
      onEnded: () => {
        currentLofiIndex =
          (currentLofiIndex + 1) % ASSETS.BACKGROUND_MUSIC.LOFI.length;
        backgroundMusicConfig.lofi.path =
          ASSETS.BACKGROUND_MUSIC.LOFI[currentLofiIndex];
        playSound(backgroundMusicConfig.lofi);
      },
    },
  };

  useEffect(() => {
    playSound(backgroundMusicConfig.rain);
    playSound(backgroundMusicConfig.lofi);
  }, []);

  return <></>;
}

export default BackgroundMusic;
