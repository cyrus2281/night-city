import "./Loading.scss";

function Loading({
  status = 0,
  onClick,
}: {
  status: number;
  onClick: (e: any) => void;
}) {
  const ready = status === 100;
  const top = 150 - status + "%";
  const innerProps = !ready
    ? {}
    : {
        onPointerDown: onClick,
        className: "loading-center clickable",
      };
  return (
    <div className="loading">
      <div className="loading-outer">
        <div
          className={"loading-center"}
          data-percent={ready ? "Ready" : status.toFixed(0) + "%"}
          {...innerProps}
        >
          <div className="loading-inner" style={{ top }}></div>
          <div className="loading-inner two" style={{ top }}></div>
          <div className="loading-inner three" style={{ top }}></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
