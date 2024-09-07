import { Vector3 } from "three";

export const IS_DEV = import.meta.env.DEV;

export const CHARACTER_INITIAL_POSITION = new Vector3(-11, 0.01, -23);
// export const CHARACTER_INITIAL_POSITION = new Vector3(5.5, 9, 12);
// export const CHARACTER_INITIAL_POSITION = new Vector3(21, 0.01, 7);

export const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

export const POSITION_DISPLACEMENT_THRESHOLD = {
  x: 0.5,
  y: 0.1,
  z: 0.5,
};

export const ALTITUDE_DISPLACEMENT_THRESHOLD = 1.5;

export const WORLD_THRESHOLD = {
  LOW: -10,
  HIGH: 30,
  FLIP: -0.6,
};

export const ASSETS = {
  MODELS: {
    FOX: "/blob/model/Fox/Fox.gltf",
    ROBOT: "/blob/model/Robot.glb",
    CITY: "/blob/model/night-city.glb",
    DRONE: "/blob/model/drone.glb",
    UNOBTANIUM: "/blob/model/unobtanium.glb",
    INFO: "/blob/model/InfoButton.glb",
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
  GUY_AUDIO: "/blob/audio/guy/",
  TEXT_FONT: "/blob/fonts/helvetiker_regular.typeface.json",
};

export const DEFAULT_MUSIC_VOLUME = 0.5;

export const MAX_CLICKABLE_DISTANCE = 9;

export const ROBOT_NAME = "CyrusAI";

export const CHAT_HISTORY_MAX_LENGTH = 20;

export const PAGES = {
  RESUME: "resume",
  CONTACT: "contact",
  CREDITS: "credits",
};

export const LOCAL_STORAGE_KEYS = {
  VISITED_PLACES: "visitedPlaces",
  DISCOVERED_AUDIOS: "discoveredAudios",
  DISCOVERED_UNKNOWN: "discoveredUnknown",
  FINISHED: "finished",
  SHOW_TUTORIAL: "showTutorial",
  CHAT_HISTORY: "chatHistory",
};

export const AI_CHAT_ENDPOINT = IS_DEV
  ? `${window.location.protocol}//${window.location.hostname}:8000/api/v1/ai-chat`
  : `${window.location.origin}/api/v1/ai-chat`;

export const EXTERNAL_LINKS = {
  LINKEDIN: "https://www.linkedin.com/in/cyrusmobini",
  GITHUB: "https://www.github.com/cyrus2281",
  COFFEE: "https://www.buymeacoffee.com/cyrus2281",
  SOURCE_CODE: "https://github.com/cyrus2281/night-city",
};

export const NIGHT_CITY_FONT = `
███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗     ██████╗██╗████████╗██╗   ██╗
████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝    ██╔════╝██║╚══██╔══╝╚██╗ ██╔╝
██╔██╗ ██║██║██║  ███╗███████║   ██║       ██║     ██║   ██║    ╚████╔╝ 
██║╚██╗██║██║██║   ██║██╔══██║   ██║       ██║     ██║   ██║     ╚██╔╝  
██║ ╚████║██║╚██████╔╝██║  ██║   ██║       ╚██████╗██║   ██║      ██║   
╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝        ╚═════╝╚═╝   ╚═╝      ╚═╝  

* Check ${window.location.origin}{worldPath}#dev for debug options
* Check ${window.location.origin}{worldPath}/credits for the credits
* Check ${EXTERNAL_LINKS.COFFEE} to support the developer
* Check ${EXTERNAL_LINKS.SOURCE_CODE} for the source code
`;
