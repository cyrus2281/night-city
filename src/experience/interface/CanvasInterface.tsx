import { Perf } from "r3f-perf";
import { Debug } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import useGlobal from "../stores/useGlobal";
import TerritoryInterface from "./TerritoryInterface";

function CanvasInterface() {
  const isDev = useGlobal((state) => state.isDev);

  return (
    <>
      {isDev && (
        <>
          <Perf position="top-left" />
          <Debug />
          <TerritoryInterface />
        </>
      )}
      <OrbitControls />
    </>
  );
}

export default CanvasInterface;
