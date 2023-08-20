import { useNavigate } from "react-router-dom";
import "./InterfaceButtons.scss";
import StatsView from "./StatsView";
import MuteButton from "./MuteButton";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import { openUrl } from "../../utils/utils";
import {
  EXTERNAL_LINKS,
  PAGES,
} from "../../utils/constants";

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
              onClick={() => openUrl(EXTERNAL_LINKS.LINKEDIN)}
            >
              <Icon>linkedin</Icon>
            </Button>
            <Button
              neon
              circle
              className="small-padding"
              onClick={() => openUrl(EXTERNAL_LINKS.GITHUB)}
            >
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
