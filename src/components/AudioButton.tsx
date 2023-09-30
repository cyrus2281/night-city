import React, { useEffect } from "react";
import "./AudioButton.scss";
import Icon from "./Icon";

function AudioButton({
  radius = 40,
  stroke = 7,
  timeout = 5,
  onAction,
  onRemove,
}: {
  radius?: number;
  stroke?: number;
  timeout?: number;
  onAction: () => void;
  onRemove: () => void;
}) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = Math.ceil(normalizedRadius * 2 * Math.PI);
  const margin = radius - normalizedRadius;
  console.log(margin);

  useEffect(() => {
    setTimeout(() => {
      onRemove();
    }, timeout * 1000);
  }, []);

  return (
    <div
      className="audio-btn-wrapper"
      style={
        {
          "--audio-btn-circumference": circumference,
          "--audio-btn-duration": timeout + "s",
          "--audio-btn-margin": "-" + margin + "px",
        } as React.CSSProperties
      }
      onPointerDown={() => {
        onAction();
        onRemove();
      }}
    >
      <svg className="audio-btn-svg" height={radius * 2} width={radius * 2}>
        <circle
          className="audio-btn-ring"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <Icon size="large" className="audio-btn-icon">
        record_voice_over
      </Icon>
    </div>
  );
}

export default AudioButton;
