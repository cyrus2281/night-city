import React from "react";
import { Leva } from "leva";
import { useControls } from "leva";
import { KeyboardControls } from "@react-three/drei";
import useGlobal from "../stores/useGlobal";

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
      <Leva hidden={!useGlobal.getState().showLeva} collapsed={true} />
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
    </>
  );
}

export default Interface;
