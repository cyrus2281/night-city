import { Physics, Debug } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import Lights from "./lights/Lights";
import Effects from "./effects/Effects";
import Character from "./character/Character";
import World from "./world/World";

function Experience() {
  return (
    <>
      <color args={["#252731"]} attach="background" />
      <Physics>
        <Debug />
        <OrbitControls />

        <Effects />
        <Lights />

        <Character />
        <World />
      </Physics>
    </>
  );
}

export default Experience;
