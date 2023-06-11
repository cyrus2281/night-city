import React, { useEffect, useRef } from "react";
import { Leva } from "leva";
import { useControls } from "leva";
import { KeyboardControls } from "@react-three/drei";
import JoystickController, { MOUSE_CLICK_BUTTONS } from "joystick-controller";
import useGlobal from "../stores/useGlobal";
import Subtitles from "./Subtitles";
import { JoystickOutput } from "../utils/interfaces";
import styled from "styled-components";

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 99;
`;

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

  const wrapperRef = useRef();

  useEffect(() => {
    if (window.joystick) return;
    window.joystick = new JoystickController(
      {
        maxRange: 90,
        level: 6,
        radius: 60,
        joystickRadius: 40,
        opacity: 0.5,
        dynamicPosition: true,
        dynamicPositionTarget: wrapperRef.current,
        hideContextMenu: true,
        mouseClickButton: MOUSE_CLICK_BUTTONS.LEFT,
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
    return () => {
      window.joystick.destroy();
      window.joystick = null;
    };
  }, [wrapperRef.current]);

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
        <CanvasWrapper ref={wrapperRef as any}>{children}</CanvasWrapper>
      </KeyboardControls>
      <Subtitles />
    </>
  );
}

export default Interface;
