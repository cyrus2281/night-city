import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import useSound from "../../stores/useSound";

const MUTE_KEY = "volume_off";
const UNMUTE_KEY = "volume_up";

function MuteButton() {
  const isMute = useSound((state) => state.isMute);
  const toggleMute = useSound((state) => state.toggleMute);

  return (
    <Button neon circle onClick={toggleMute}>
      <Icon>{isMute ? MUTE_KEY : UNMUTE_KEY}</Icon>
    </Button>
  );
}

export default MuteButton;
