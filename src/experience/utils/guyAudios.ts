import { ASSETS } from "./constants";
import { MAIN_TERRITORIES_NAMES, OTHER_TERRITORIES_NAMES, TERRITORIES_NAMES } from "./enums";
import { AudioConfig } from "./interfaces";

interface TerritoryInstanceAudio extends AudioConfig {
  playInterval: number;
}

type TerritoryAudio = { [key in TERRITORIES_NAMES]?: TerritoryInstanceAudio };

// minutes in milliseconds
const PLAY_ONCE = 0;
const THREE_MIN_MS = 3 * 60 * 1000;
const FIVE_MIN_MS = 5 * 60 * 1000;
const TEN_MIN_MS = 10 * 60 * 1000;

export const TERRITORY_AUDIOS: TerritoryAudio = {
  [MAIN_TERRITORIES_NAMES.BAR]: {
    path: ASSETS.GUY_AUDIO + "space-bar.wav",
    playInterval: FIVE_MIN_MS,
    duration: 4000,
    subtitle: "Look! Space Bar! They have coffee too. Click on the coffee.",
  },
  [MAIN_TERRITORIES_NAMES.TV_BRIDGE]: {
    path: ASSETS.GUY_AUDIO + "bridge.wav",
    playInterval: THREE_MIN_MS,
    duration: 2000,
    subtitle: "Maybe we can jump on the drone that passes by here.",
  },
  [MAIN_TERRITORIES_NAMES.DEAD_END_ALLEY]: {
    path: ASSETS.GUY_AUDIO + "duct-pipes.wav",
    playInterval: FIVE_MIN_MS,
    duration: 4000,
    subtitle:
      "The duct pipes are suspiciously connected to those escape stairs, but it's probably just a coincidence.",
  },
  [MAIN_TERRITORIES_NAMES.STORE]: {
    path: ASSETS.GUY_AUDIO + "building-with-interior.wav",
    playInterval: TEN_MIN_MS,
    duration: 2000,
    subtitle: "Woa! We can actually go inside this building!",
  },
  [MAIN_TERRITORIES_NAMES.TECH_CENTER]: {
    path: ASSETS.GUY_AUDIO + "sci-fi-stuff.wav",
    playInterval: TEN_MIN_MS,
    duration: 2000,
    subtitle: "Woohoo! There is so many sci-fi stuff here!",
  },
  [MAIN_TERRITORIES_NAMES.POST_OFFICE]: {
    path: ASSETS.GUY_AUDIO + "dev-contact.wav",
    playInterval: TEN_MIN_MS,
    duration: 3000,
    subtitle:
      "Those seems like the developers contact information! Let's click them!",
  },
  [MAIN_TERRITORIES_NAMES.BLOCKED_ROAD]: {
    path: ASSETS.GUY_AUDIO + "block-way.wav",
    playInterval: THREE_MIN_MS,
    duration: 2000,
    subtitle: "We probably can't go this way. It's blocked!",
  },
  [MAIN_TERRITORIES_NAMES.UNFINISHED_ROAD]: {
    path: ASSETS.GUY_AUDIO + "unfinished-road.wav",
    playInterval: FIVE_MIN_MS,
    duration: 2000,
    subtitle: "The developer probably forgot to finish this area",
  },
  [OTHER_TERRITORIES_NAMES.PARK_FOUNTAIN]: {
    path: ASSETS.GUY_AUDIO + "empty-city.wav",
    playInterval: THREE_MIN_MS,
    duration: 1000,
    subtitle: "Why there's no one else in this city?",
  },
  [OTHER_TERRITORIES_NAMES.PARK_NAME]: {
    path: ASSETS.GUY_AUDIO + "name.wav",
    playInterval: PLAY_ONCE,
    duration: 2000,
    subtitle: "You just ran over the developer's name!",
  },
  [OTHER_TERRITORIES_NAMES.PIPES]: {
    path: ASSETS.GUY_AUDIO + "death-by-fall.wav",
    playInterval: FIVE_MIN_MS,
    duration: 2000,
    subtitle: "We probably die if we fall from here!",
  },
};

export const GUY_AUDIOS: { [key: string]: AudioConfig } = {
  TRUE_FAN: {
    path: ASSETS.GUY_AUDIO + "finished.wav",
    duration: 7000,
    subtitle: "Waw, you did it. Congratulations! you have unlocked all the audios and places, good job. You can now send us a mail as a true fan.",
  },
  MAIL_SENT: {
    path: ASSETS.GUY_AUDIO + "mail-sent.wav",
    duration: 2000,
    subtitle: "Your letter has been successfully mailed.",
  },
  MAIL_FAILED: {
    path: ASSETS.GUY_AUDIO + "mail-failed.wav",
    duration: 2000,
    subtitle: "Failed to deliver the letter, please try again later.",
  },
  FALL : {
    path: ASSETS.GUY_AUDIO + "fall-from-map.wav",
    duration: 1000,
    subtitle: "Did you really fall off the map?",
  },
  BUG: {
    path: ASSETS.GUY_AUDIO + "bug.wav",
    duration: 2000,
    subtitle: " Was that a bug? Maybe report how it happened.",
  },
  DEV_TOOLS: {
    path: ASSETS.GUY_AUDIO + "dev-tools.wav",
    duration: 2000,
    subtitle: "What are you looking for in the developer tools?",
  },
  PAGE_RETURN: {
    path: ASSETS.GUY_AUDIO + "came-back.wav",
    duration: 2000,
    subtitle: "Yay, You came back. I've missed you.",
  },
  OBTAINED_UNOBTANIUM: {
    path: ASSETS.GUY_AUDIO + "unobtanium.wav",
    duration: 4000,
    subtitle:
      "Not Guy: Oh jeez! you got the unobtanium. \nGuy: Hey! I should be the only voice over!",
  },
};
