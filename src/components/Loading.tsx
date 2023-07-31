import "./Loading.scss";

function Loading({
  status = 0,
  onClick,
}: {
  status: number;
  onClick: (e: any) => void;
}) {
  const ready = status === 100;
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
          data-percent={ready ? "Ready" : status + "%"}
          {...innerProps}
        >
          <div
            className="loading-inner"
            style={{ top: 150 - status + "%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
