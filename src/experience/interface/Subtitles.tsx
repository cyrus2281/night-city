import React, { useEffect } from "react";

import { Subtitle } from "../utils/interfaces";
import useSound from "../stores/useSound";

const CSS_ANIMATION_DURATION = 500;

function Subtitles() {
  const subtitleQueue = useSound((state) => state.subtitleQueue);
  if (subtitleQueue.length === 0) return null;
  return (
    <div className="subtitle-container">
      {subtitleQueue.map((subtitle) => (
        <Subtitle key={subtitle.id} subtitle={subtitle} />
      ))}
    </div>
  );
}

function Subtitle({ subtitle }: { subtitle: Subtitle }) {
  const [showSubtitle, setShowSubtitle] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSubtitle(false);
      setTimeout(() => {
        subtitle.remove();
      }, CSS_ANIMATION_DURATION);
    }, subtitle.duration + 750);
  }, []);

  return (
    <div
      className={`subtitle ${
        showSubtitle ? "show-subtitle" : "hide-subtitle"
      } subtitle-theme-${subtitle.theme}`}
    >
      {subtitle.message}
    </div>
  );
}

export default Subtitles;
