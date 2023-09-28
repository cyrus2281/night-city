import { useEffect } from "react";
import useSound from "../stores/useSound";
import { ASSETS } from "../utils/constants";
import { AudioConfig } from "../utils/interfaces";
import { GUY_AUDIOS } from "../utils/guyAudios";

const PAGE_TIMEOUT = 1000 * 60 * 5; // 5 minutes

let lastDevToolsWarning = 0;
let leftPageDate = 0;

let currentLofiIndex = 0;

function BackgroundMusic() {
  const playSound = useSound((state) => state.playSound);
  const fadeOutSounds = useSound((state) => state.fadeOutSounds);
  const fadeInSounds = useSound((state) => state.fadeInSounds);

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

export default BackgroundMusic;
