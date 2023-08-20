import { Vector3 } from "three";

// export const CHARACTER_INITIAL_POSITION = new Vector3(-20, 0.01, 11);
export const CHARACTER_INITIAL_POSITION = new Vector3(21, 0.01, 7);

export const POSITION_DISPLACEMENT_THRESHOLD = {
  x: 0.5,
  y: 0.1,
  z: 0.5,
};

export const ALTITUDE_DISPLACEMENT_THRESHOLD = 2;

export const WORLD_THRESHOLD = {
  LOW: -10,
  HIGH: 30,
  FLIP: -0.6,
};

export const ASSETS = {
  MODELS: {
    FOX: "/blob/Fox/Fox.gltf",
    CITY: "/blob/night-city.glb",
  },
  ENV_MAP: "/blob/envMap/night_city.jpg",
  BACKGROUND_MUSIC: {
    RAIN: "/blob/audio/background/rolling-thunder.mp3",
    LOFI: [
      "/blob/audio/background/lofi/the-last-train-122342.mp3",
      "/blob/audio/background/lofi/wish-you-were-here-118975.mp3",
      "/blob/audio/background/lofi/you-and-i-133401.mp3",
    ],
  },
  GUY_AUDIO: "/blob/audio/guy/"
};

export const DEFAULT_MUSIC_VOLUME = 0.5;

export const MAX_CLICKABLE_DISTANCE = 8;

export const PAGES = {
  RESUME: "resume",
  CONTACT: "contact",
  CREDITS: "credits",
};

export const LOCAL_STORAGE_KEYS = {
  VISITED_PLACES: "visitedPlaces",
  DISCOVERED_AUDIOS: "discoveredAudios",
  FINISHED: "finished",
};

export const EXTERNAL_LINKS = {
  LINKEDIN: "https://www.linkedin.com/in/cyrusmobini",
  GITHUB: "https://www.github.com/cyrus2281",
  COFFEE: "https://www.buymeacoffee.com/cyrus2281",
}

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
  // console.clear();
  setTimeout(() =>
    console.log(NIGHT_CITY_FONT.replaceAll("{worldPath}", worldPath))
  );
};
