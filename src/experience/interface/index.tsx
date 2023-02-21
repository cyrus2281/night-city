import React from "react";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";

function Interface({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Leva />
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
          { name: "sprint", keys: ["ShiftLeft", "ShiftRight"] },
          { name: "jump", keys: ["Space"] },
          { name: "escape", keys: ["Escape"] },
        ]}
      >
        {children}
      </KeyboardControls>
    </>
  );
}

export default Interface;
