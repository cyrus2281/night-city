import { ASSETS } from "./constants";
import { TERRITORIES_NAMES } from "./enums";
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
  [TERRITORIES_NAMES.BAR]: {
    path: ASSETS.GUY_AUDIO + "space-bar.wav",
    playInterval: FIVE_MIN_MS,
    duration: 4000,
    subtitle: "Look! Space Bar! They have coffee too. Click on the coffee.",
  },
  [TERRITORIES_NAMES.TV_BRIDGE]: {
    path: ASSETS.GUY_AUDIO + "death-by-fall.wav",
    playInterval: FIVE_MIN_MS,
    duration: 2000,
    subtitle: "We probably die if we fall from here!",
  },
  [TERRITORIES_NAMES.DEAD_END_ALLEY]: {
    path: ASSETS.GUY_AUDIO + "duct-pipes.wav",
    playInterval: FIVE_MIN_MS,
    duration: 4000,
    subtitle:
      "The duct pipes are suspiciously connected to those escape stairs, but it's probably just a coincidence.",
  },
  [TERRITORIES_NAMES.STORE]: {
    path: ASSETS.GUY_AUDIO + "building-with-interior.wav",
    playInterval: TEN_MIN_MS,
    duration: 2000,
    subtitle: "Woa! We can actually go inside this building!",
  },
  [TERRITORIES_NAMES.TECH_CENTER]: {
    path: ASSETS.GUY_AUDIO + "sci-fi-stuff.wav",
    playInterval: TEN_MIN_MS,
    duration: 2000,
    subtitle: "Woohoo! There is so many sci-fi stuff here!",
  },
  [TERRITORIES_NAMES.POST_OFFICE]: {
    path: ASSETS.GUY_AUDIO + "dev-contact.wav",
    playInterval: TEN_MIN_MS,
    duration: 3000,
    subtitle:
      "Those seems like the developers contact information! Let's click them!",
  },
  [TERRITORIES_NAMES.BLOCKED_ROAD]: {
    path: ASSETS.GUY_AUDIO + "block-way.wav",
    playInterval: THREE_MIN_MS,
    duration: 2000,
    subtitle: "We probably can't go this way. It's blocked!",
  },
  [TERRITORIES_NAMES.PARK_FOUNTAIN]: {
    path: ASSETS.GUY_AUDIO + "empty-city.wav",
    playInterval: THREE_MIN_MS,
    duration: 1000,
    subtitle: "Why there's no one else in this city?",
  },
};

export const GUY_AUDIOS: { [key: string]: AudioConfig } = {
  TRUE_FAN: {
    path: ASSETS.GUY_AUDIO + "finished.wav",
    duration: 7000,
    subtitle: "Waw, you did it. Congratulations! you have unlocked all the audios and places, good job. You can now send us a mail as a true fan",
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
    subtitle: "Did you really fall off the map",
  },
  BUG: {
    path: ASSETS.GUY_AUDIO + "bug.wav",
    duration: 2000,
    subtitle: " Was that a bug? Maybe report how it happened.",
  }
};
