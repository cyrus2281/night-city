import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import "./InterfaceButtons.scss";
import Icon from "../../../components/Icon";
import MuteButton from "./MuteButton";
import { PAGES, openGithub, openLinkedIn } from "../../utils/constants";
import StatsView from "./StatsView";

function InterfaceButtons() {
  const navigate = useNavigate();

  return (
    <div className="interface-buttons">
      <div className="interface-buttons-top">
        <div className="interface-buttons-top-row">
          <Button
            theme="dark"
            neon
            onClick={() => {
              navigate(PAGES.RESUME, { replace: true });
            }}
          >
            Resume
          </Button>
          <div className="interface-buttons-top-group">
            <Button
              neon
              circle
              className="small-padding"
              onClick={openLinkedIn}
            >
              <Icon>linkedin</Icon>
            </Button>
            <Button neon circle className="small-padding" onClick={openGithub}>
              <Icon>github</Icon>
            </Button>
            <Button
              neon
              circle
              onClick={() => {
                navigate(PAGES.CONTACT, { replace: true });
              }}
            >
              <Icon>email</Icon>
            </Button>
            <Button
              neon
              circle
              onClick={() => {
                navigate(PAGES.CREDITS, { replace: true });
              }}
            >
              <Icon>info</Icon>
            </Button>
            <MuteButton />
          </div>
        </div>
        <div className="interface-buttons-top-row">
          <StatsView />
        </div>
      </div>
      <div className="interface-buttons-bottom">
        <Button
          circle
          uppercase
          theme="dark"
          neon
          resizable
          onClick={() => window.jump && window.jump()}
          onTouchStart={() => window.jump && window.jump()}
        >
          jump
        </Button>
      </div>
    </div>
  );
}

export default InterfaceButtons;
