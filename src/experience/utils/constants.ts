import { Vector3 } from "three";

export const CHARACTER_INITIAL_POSITION = new Vector3(-20, 0.01, 11);

export const POSITION_DISPLACEMENT_THRESHOLD = {
  x: 0.5,
  y: 0.1,
  z: 0.5,
};

export const ALTITUDE_DISPLACEMENT_THRESHOLD = 2;

export const MODELS = {
  FOX: "/dev/Fox/Fox.gltf",
  CITY: "/dev/night-city.glb",
  ENV_MAP: "/dev/envMap/night_city.hdr",
};

export const BACKGROUND_MUSIC_PATH = {
  RAIN: "/dev/audio/background/rolling-thunder.mp3",
  LOFI: [
    "/dev/audio/background/lofi/the-last-train-122342.mp3",
    "/dev/audio/background/lofi/wish-you-were-here-118975.mp3",
    "/dev/audio/background/lofi/you-and-i-133401.mp3",
  ],
};

export const DEFAULT_MUSIC_VOLUME = 0.5;

export const PAGES = {
  RESUME: "resume",
  CONTACT: "contact",
  CREDITS: "credits",
};

export const NIGHT_CITY_FONT = `
███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗     ██████╗██╗████████╗██╗   ██╗
████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝    ██╔════╝██║╚══██╔══╝╚██╗ ██╔╝
██╔██╗ ██║██║██║  ███╗███████║   ██║       ██║     ██║   ██║    ╚████╔╝ 
██║╚██╗██║██║██║   ██║██╔══██║   ██║       ██║     ██║   ██║     ╚██╔╝  
██║ ╚████║██║╚██████╔╝██║  ██║   ██║       ╚██████╗██║   ██║      ██║   
╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝        ╚═════╝╚═╝   ╚═╝      ╚═╝  

* Check ${window.location.origin}{worldPath}#dev for debug options
* Check ${window.location.origin}{worldPath}/about to learn more about Night City
* Check ${window.location.origin}{worldPath}/credits to learn more about the creators
* Check https://github.com/cyrus2281/night-city for the source code
`;

export const printNightCityInfo = (worldPath: string) => {
  console.clear();
  setTimeout(() =>
    console.log(NIGHT_CITY_FONT.replaceAll("{worldPath}", worldPath))
  );
};
