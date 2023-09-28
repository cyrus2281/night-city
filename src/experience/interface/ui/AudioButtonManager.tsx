import "./AudioButtonManager.scss";
import AudioButton from "../../../components/AudioButton";
import useSound from "../../stores/useSound";

function AudioButtonManager() {
  const playSound = useSound((state) => state.playSound);
  const failedSounds = useSound((state) => state.failedSounds);
  const removeFailedSound = useSound((state) => state.removeFailedSound);

  return (
    <div className="audio-btn-manager">
      {failedSounds.map((failedSound, index) => (
        <AudioButton
          key={"failed-audio-btn-" + index}
          onAction={() => playSound(failedSound)}
          onRemove={() => removeFailedSound(failedSound)}
        />
      ))}
    </div>
  );
}

export default AudioButtonManager;
