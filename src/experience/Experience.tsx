import { Physics, Debug } from "@react-three/rapier";
import Lights from "./lights/Lights";
import Effects from "./effects/Effects";
import Character from "./character/Character";
import World from "./world/World";
import CanvasInterface from "./interface/CanvasInterface";
import Drone from "./character/Drone";
import WordBlocks from "./character/WordBlocks";
import Unobtanium from "./character/Unobtanium";
import BackgroundMusic from "./effects/BackgroundMusic";

function Experience() {
  return (
    <>
      <color args={["#252731"]} attach="background" />
      <Physics>
        <CanvasInterface />
        <Effects />
        <BackgroundMusic />
        <Lights />

        <Character />
        <Drone />
        <Unobtanium />
        <WordBlocks />
        <World />
      </Physics>
    </>
  );
}

export default Experience;
