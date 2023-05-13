import { TERRITORIES_NAMES } from "./enums";
import { AudioConfig } from "./interfaces";

interface TerritoryInstanceAudio extends AudioConfig {
    playInterval: number;
}

type TerritoryAudio = {[key in TERRITORIES_NAMES]?: TerritoryInstanceAudio};

// minutes in milliseconds
const PLAY_ONCE = 0;
const THREE_MIN_MS = 3 * 60 * 1000;
const FIVE_MIN_MS = 5 * 60 * 1000;
const TEN_MIN_MS = 10 * 60 * 1000;

export const territoryAudios: TerritoryAudio = {
    [TERRITORIES_NAMES.BAR]: {
        path: "/dev/audio/floating-chair.wav",
        playInterval: FIVE_MIN_MS,
        duration: 4000,
        subtitle: "OH! Look at that char, it's floating! It's like a sci-fi movie!",
    },
    [TERRITORIES_NAMES.TV_BRIDGE]: {
        path: "/dev/audio/death-by-fall.wav",
        playInterval: FIVE_MIN_MS,
        duration: 2000,
        subtitle: "We probably die if we fall from here!"
    },
    [TERRITORIES_NAMES.DEAD_END_ALLEY]: {
        path: "/dev/audio/duct-pipes.wav",
        playInterval: FIVE_MIN_MS,
        duration: 4000,
        subtitle: "The duct pipes are suspiciously connected to those escape stairs, but it's probably just a coincidence.",
    },
    [TERRITORIES_NAMES.STORE]: {
        path: "/dev/audio/building-with-interior.wav",
        playInterval: TEN_MIN_MS,
        duration: 2000,
        subtitle: "Woa! We can actually go inside this building!"
    },
    [TERRITORIES_NAMES.TECH_CENTER]: {
        path: "/dev/audio/sci-fi-stuff.wav",
        playInterval: TEN_MIN_MS,
        duration: 2000,
        subtitle: "Woohoo! There is so many sci-fi stuff here!"
    },
    [TERRITORIES_NAMES.POST_OFFICE]: {
        path: "/dev/audio/dev-contact.wav",
        playInterval: TEN_MIN_MS,
        duration: 3000,
        subtitle: "Those seems like the developers contact information! Let's click them!"
    },
    [TERRITORIES_NAMES.BLOCKED_ROAD]: {
        path: "/dev/audio/block-way.wav",
        playInterval: THREE_MIN_MS,
        duration: 2000,
        subtitle: "We probably can't go this way. It's blocked!"
    },
    [TERRITORIES_NAMES.PARK_FOUNTAIN]: {
        path: "/dev/audio/empty-city.wav",
        playInterval: THREE_MIN_MS,
        duration: 1000,
        subtitle: "Why there's no one else in this city?"
    },
}

export default territoryAudios;