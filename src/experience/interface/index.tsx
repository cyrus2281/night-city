import React from "react";
import { Leva } from "leva";
import { useControls } from "leva";
import { KeyboardControls } from "@react-three/drei";
import JoystickController from "joystick-controller";
import useGlobal from "../stores/useGlobal";
import Subtitles from "./Subtitles";
import { JoystickOutput } from "../utils/interfaces";

window.joystick = new JoystickController(
  {
    maxRange: 90,
    level: 6,
    radius: 60,
    joystickRadius: 40,
    opacity: 0.5,
    dynamicPosition: true,
  },
  (output: JoystickOutput) => {
    const { leveledX, leveledY } = output;
    if (leveledX === 0 && leveledY === 0) {
      window.joystickPositioning = null;
      return;
    }
    const sprint = Math.abs(leveledX) > 4 || Math.abs(leveledY) > 4;
    window.joystickPositioning = {
      sprint,
      right: leveledX > 2,
      left: leveledX < -2,
      forward: leveledY > 0,
      backward: leveledY < 0,
    };
  }
);

function Interface({ children }: { children: React.ReactNode }) {
  useControls("Global Settings", {
    "Dev Mode": {
      value: useGlobal.getState().isDev,
      onChange: (value) => {
        useGlobal.setState({ isDev: value });
      },
    },
    "View Lock": {
      value: useGlobal.getState().viewLock,
      onChange: (value) => {
        useGlobal.setState({ viewLock: value });
      },
    },
  });

  return (
    <>
      <Leva hidden={!useGlobal.getState().showLeva} />
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
          { name: "sprint", keys: ["ShiftLeft", "ShiftRight"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        {children}
      </KeyboardControls>
      <Subtitles />
    </>
  );
}

export default Interface;
