import { useEffect } from "react";
import useSound from "../stores/useSound";
import { BACKGROUND_MUSIC_PATH } from "../utils/constants";
import { AudioConfig } from "../utils/interfaces";

let currentLofiIndex = 0;
function BackgroundMusic() {
  const playSound = useSound((state) => state.playSound);

  const backgroundMusicConfig: { [name: string]: AudioConfig } = {
    rain: {
      path: BACKGROUND_MUSIC_PATH.RAIN,
      volume: 0.1,
      duration: 0,
    },
    lofi: {
      path: BACKGROUND_MUSIC_PATH.LOFI[currentLofiIndex],
      volume: 0.15,
      onEnded: () => {
        currentLofiIndex =
          (currentLofiIndex + 1) % BACKGROUND_MUSIC_PATH.LOFI.length;
        backgroundMusicConfig.lofi.path =
          BACKGROUND_MUSIC_PATH.LOFI[currentLofiIndex];
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
