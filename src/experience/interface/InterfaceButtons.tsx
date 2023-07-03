import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Dialog from "../../components/Dialog";
import "./InterfaceButtons.scss";
import Icon from "../../components/Icon";

function InterfaceButtons() {
  const navigate = useNavigate();

  return (
    <div className="interface-buttons">
      <div className="interface-buttons-top">
        <div className="interface-buttons-top-left">
          <Button theme="dark" neon>
            Resume
          </Button>
          <span className="status-label">7/10</span>
        </div>
        <div className="interface-buttons-top-right">
          <Button neon circle>LinkedIn</Button>
          <Button neon circle>Github</Button>
          <Button neon circle><Icon>email</Icon></Button>
          <Button
            neon
            circle
            onClick={() => {
              navigate("credit", { replace: true });
            }}
          >
            <Icon>info</Icon>
          </Button>
        </div>
      </div>
      <div className="interface-buttons-bottom">
        <div className="interface-buttons-bottom-left">
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
    </div>
  );
}

export default InterfaceButtons;
