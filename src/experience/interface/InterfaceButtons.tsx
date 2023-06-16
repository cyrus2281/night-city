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
          <button className="btn btn-light shadow-2">LinkedIn</button>
          <button className="btn btn-light shadow-2">Github</button>
          <button className="btn btn-light shadow-2">Mail</button>
        </div>
      </div>
    </div>
  );
}

export default InterfaceButtons;
