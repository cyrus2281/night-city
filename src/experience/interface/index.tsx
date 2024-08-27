import React, { useEffect, useRef } from "react";
import { Leva } from "leva";
import { useControls } from "leva";
import { KeyboardControls } from "@react-three/drei";
import JoystickController, { MOUSE_CLICK_BUTTONS, JoystickOnMove } from "joystick-controller";
import useGlobal from "../stores/useGlobal";
import Subtitles from "./Subtitles";
import InterfaceButtons from "./ui/InterfaceButtons";
import TitleBar from "./ui/TitleBar";

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
        maxRange: 100,
        level: 6,
        radius: 60,
        joystickRadius: 40,
        opacity: 0.5,
        dynamicPosition: true,
        dynamicPositionTarget: (wrapperRef.current as unknown) as HTMLElement,
        hideContextMenu: true,
        mouseClickButton: MOUSE_CLICK_BUTTONS.LEFT,
      },
      (output: JoystickOnMove) => {
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
          forward: leveledY > 2,
          backward: leveledY < -2,
        };
      }
    );
    const jump = () => window.jump();
    window.addEventListener("contextmenu", jump);
    return () => {
      window.joystick.destroy();
      window.joystick = null;
      window.removeEventListener("contextmenu", jump);
    };
  }, [wrapperRef.current]);

  return (
    <>
      <Leva
        hidden={!useGlobal.getState().showLeva}
        titleBar={{
          position: {
            x: -10,
            y: 50,
          },
        }}
      />
      <TitleBar></TitleBar>
      <InterfaceButtons />
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
        <div className="canvas-wrapper" ref={wrapperRef as any}>
          {children}
        </div>
      </KeyboardControls>
      <Subtitles />
    </>
  );
}

export default Interface;
