import { Text3D } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { ASSETS } from "../utils/constants";

const word = "CYRUS";
const colors = ["#6b0b0b", "#64085c", "#010457", "#00068e", "#00598e"]

function WordBlocks() {
  return (
    <group position={[-14, 0.005, 18]} rotation={[0,Math.PI,0]}>
      {word.split("").map((letter, index) => {
        return (
          <RigidBody colliders="cuboid" key={index}>
            <Text3D
              font={ASSETS.TEXT_FONT}
              position={[(index ), 0, 0]}
            >
              {letter}
              <meshStandardMaterial color={colors[index]} />
            </Text3D>
          </RigidBody>
        );
      })}
    </group>
  );
}

export default WordBlocks;
