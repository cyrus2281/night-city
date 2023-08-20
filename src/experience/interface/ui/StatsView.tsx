import { useEffect, useState } from "react";
import useLocation from "../../stores/useLocation";
import "./StatsView.scss";
import { TERRITORIES_NAMES } from "../../utils/enums";
import { ASSETS, LOCAL_STORAGE_KEYS } from "../../utils/constants";
import useSound from "../../stores/useSound";
import { GUY_AUDIOS, TERRITORY_AUDIOS } from "../../utils/guyAudios";
import useGlobal from "../../stores/useGlobal";

const totalTerritories = Object.values(TERRITORIES_NAMES);
const totalAudios = Object.values(TERRITORY_AUDIOS).map((audio) =>
  audio.path.replace(ASSETS.GUY_AUDIO, "")
);

function StatsView() {
  const playSound = useSound((state) => state.playSound);
  const activeSounds = useSound((state) => state.activeSounds);
  const territoriesName = useLocation((state) => state.territoriesName);
  const setIsTrueFan = useGlobal((state) => state.setIsTrueFan);
  const [audios, setAudios] = useState(0);
  const [places, setPlaces] = useState(0);
  const [audioWiggle, setAudioWiggle] = useState(false);
  const [placesWiggle, setPlacesWiggle] = useState(false);

  useEffect(() => {
    // Update places count
    const visitedPlaces = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.VISITED_PLACES) || "[]"
    ).filter((place: TERRITORIES_NAMES) => totalTerritories.includes(place));
    visitedPlaces.push(...territoriesName);
    const uniquePlaces = [...new Set(visitedPlaces)];
    setPlaces(uniquePlaces.length);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.VISITED_PLACES,
      JSON.stringify(uniquePlaces)
    );
  }, [territoriesName]);

  useEffect(() => {
    // Update audios count
    const discoveredAudios = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.DISCOVERED_AUDIOS) || "[]"
    ).filter((audio: TERRITORIES_NAMES) => totalAudios.includes(audio));
    discoveredAudios.push(
      ...activeSounds
        .filter((audio) =>
          totalAudios.includes(audio.name.replace(ASSETS.GUY_AUDIO, ""))
        )
        .map((audio) => audio.name.replace(ASSETS.GUY_AUDIO, ""))
    );
    const uniqueAudios = [...new Set(discoveredAudios)];
    setAudios(uniqueAudios.length);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.DISCOVERED_AUDIOS,
      JSON.stringify(uniqueAudios)
    );
  }, [activeSounds]);

  useEffect(() => {
    // Check if is true fan
    if (audios === totalAudios.length && places === totalTerritories.length) {
      const hasAnnounced =
        localStorage.getItem(LOCAL_STORAGE_KEYS.FINISHED) ?? "0";
      if (!+hasAnnounced) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.FINISHED, "1");
        setTimeout(() => playSound(GUY_AUDIOS.TRUE_FAN), 4000);
      }
      setIsTrueFan(true);
    }
  }, [audios, places]);

  useEffect(() => {
    // Wiggle audio on change
    setAudioWiggle(true);
    setTimeout(() => {
      setAudioWiggle(false);
    }, 1000);
  }, [audios]);

  useEffect(() => {
    // Wiggle places on change
    setPlacesWiggle(true);
    setTimeout(() => {
      setPlacesWiggle(false);
    }, 700);
  }, [places]);

  const isFan =
    audios === totalAudios.length && places === totalTerritories.length;

  return (
    <div className={"stats-wrapper " + (isFan ? "fan" : "")}>
      <div className="stats" title="Discovered Audios">
        <span className="material-icons-outlined">music_note</span>
        <span className={"stats-label " + (audioWiggle ? "wiggle" : "")}>
          {audios}/{totalAudios.length}
        </span>
      </div>
      <div className="stats" title="Discovered Places">
        <span className="material-icons-outlined">map</span>
        <span className={"stats-label " + (placesWiggle ? "wiggle" : "")}>
          {places}/{totalTerritories.length}
        </span>
      </div>
    </div>
  );
}

export default StatsView;
