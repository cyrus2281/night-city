import { TERRITORIES_NAMES } from "./enums";

type TerritoryAudio = {[key in TERRITORIES_NAMES]?: {
    path: string;
    playInterval: number; // 0 for once
    defaultVolume?: number;
    subtitle?: string;
}};

// minutes in milliseconds
const PLAY_ONCE = 0;
const THREE_MIN_MS = 3 * 60 * 1000;
const FIVE_MIN_MS = 5 * 60 * 1000;
const TEN_MIN_MS = 10 * 60 * 1000;

export const territoryAudios: TerritoryAudio = {
    [TERRITORIES_NAMES.BAR]: {
        path: "/dev/audio/floating-chair.wav",
        playInterval: FIVE_MIN_MS,
    },
    [TERRITORIES_NAMES.TV_BRIDGE]: {
        path: "/dev/audio/death-by-fall.wav",
        playInterval: FIVE_MIN_MS,
    },
    [TERRITORIES_NAMES.TV_BRIDGE]: {
        path: "/dev/audio/death-by-fall.wav",
        playInterval: FIVE_MIN_MS,
    },
    [TERRITORIES_NAMES.DEAD_END_ALLEY]: {
        path: "/dev/audio/duct-pipes.wav",
        playInterval: FIVE_MIN_MS,
    },
    [TERRITORIES_NAMES.STORE]: {
        path: "/dev/audio/building-with-interior.wav",
        playInterval: TEN_MIN_MS,
    },
    [TERRITORIES_NAMES.TECH_CENTER]: {
        path: "/dev/audio/sci-fi-stuff.wav",
        playInterval: TEN_MIN_MS,
    },
    [TERRITORIES_NAMES.POST_OFFICE]: {
        path: "/dev/audio/dev-contact.wav",
        playInterval: TEN_MIN_MS,
    },
    [TERRITORIES_NAMES.BLOCKED_ROAD]: {
        path: "/dev/audio/block-way.wav",
        playInterval: THREE_MIN_MS,
    },
    [TERRITORIES_NAMES.PARK_FOUNTAIN]: {
        path: "/dev/audio/empty-city.wav",
        playInterval: THREE_MIN_MS,
    },
}

export default territoryAudios;