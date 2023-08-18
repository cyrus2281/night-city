import { useEffect, useState } from "react";
import "./StatsView.scss";

function StatsView() {
  const [audio, setAudio] = useState(0);
  const [places, setPlaces] = useState(0);
  const [audioWiggle, setAudioWiggle] = useState(false);
  const [placesWiggle, setPlacesWiggle] = useState(false);

  // TODO: set audio and places count

  useEffect(() => {
    setAudioWiggle(true);
    setTimeout(() => {
      setAudioWiggle(false);
    }, 1000);
  }, [audio]);

  useEffect(() => {
    setPlacesWiggle(true);
    setTimeout(() => {
      setPlacesWiggle(false);
    }, 700);
  }, [places]);

  return (
    <div className="stats-wrapper">
      <div className="stats" title="Discovered Audios">
        <span className="material-icons-outlined">music_note</span>
        <span className={"stats-label " + (audioWiggle ? "wiggle" : "")}>
          {audio}/15
        </span>
      </div>
      <div className="stats"  title="Discovered Places">
        <span className="material-icons-outlined">map</span>
        <span className={"stats-label " + (placesWiggle ? "wiggle" : "")}>
          {places}/15
        </span>
      </div>
    </div>
  );
}

export default StatsView;
