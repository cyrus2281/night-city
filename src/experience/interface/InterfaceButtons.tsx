import Button from "../../components/Button";
import "./InterfaceButtons.scss";

function InterfaceButtons() {
  return (
    <div className="interface-buttons">
      <div className="interface-buttons-top">
        <div className="interface-buttons-top-left">
          <button className="btn btn-dark shadow-1">Resume</button>
          <span className="status-label">7/10</span>
        </div>
        <div className="interface-buttons-top-right">
          <Button>LinkedIn</Button>
          <Button>Github</Button>
          <Button>Mail</Button>
        </div>
      </div>
      <div className="interface-buttons-bottom">
        <div className="interface-buttons-bottom-left">
          <Button
            circle
            uppercase
            theme="dark"
            onClick={() => window.jump && window.jump()}
          >
            jump
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterfaceButtons;
