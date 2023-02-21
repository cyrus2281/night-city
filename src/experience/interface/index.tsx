import React from "react";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";

function Interface({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Leva />
      <KeyboardControls map={[]}>{children}</KeyboardControls>
    </>
  );
}

export default Interface;
