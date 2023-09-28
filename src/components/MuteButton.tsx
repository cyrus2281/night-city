import Button from "./Button";
import Icon from "./Icon";
import useSound from "../experience/stores/useSound";

const MUTE_KEY = "volume_off";
const UNMUTE_KEY = "volume_up";

function MuteButton() {
  const isMute = useSound((state) => state.isMute);
  const toggleMute = useSound((state) => state.toggleMute);

  return (
    <Button neon circle onClick={toggleMute} className="mute-button">
      <Icon>{isMute ? MUTE_KEY : UNMUTE_KEY}</Icon>
    </Button>
  );
}

export default MuteButton;
