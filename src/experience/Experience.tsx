import { Physics, Debug } from "@react-three/rapier";
import Lights from "./lights/Lights";
import Effects from "./effects/Effects";
import Character from "./character/Character";
import World from "./world/World";
import CanvasInterface from "./interface/CanvasInterface";

function Experience() {
  return (
    <>
      <color args={["#252731"]} attach="background" />
      <Physics>
        <CanvasInterface />
        <Effects />
        <Lights />

        <Character />
        <World />
      </Physics>
    </>
  );
}

export default Experience;
