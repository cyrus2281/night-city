import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { ASSETS } from "../utils/constants";
import { useGLTF } from "@react-three/drei";

const minmax = {
  x: { min: -22, max: 9, middle: -6 },
  y: { min: 3, max: 10 },
  z: { min: -12, max: 9, middle: -1 },
};
const step = 0.002;

let prev = { x: minmax.x.min, y: minmax.y.max, z: minmax.z.min };

let xCoord = 4.8;
let yCoord = 2;
let zCoord = 3;

let hDirection = false;
let passedMiddle = true;

const getCoordinates = () => {
  const prevX = Math.floor(prev.x);
  const prevZ = Math.floor(prev.z);
  const prevY = Math.floor(prev.y);

  if (hDirection) {
    if (prevX === 3 && prevZ === minmax.z.max && prevY > minmax.y.min) {
      // Come down by bridge
      yCoord += step * 2;
    } else if (prevX === 3 && prevZ === minmax.z.min && prevY < minmax.y.max) {
      // Go up by Tech Center roof
      yCoord += step * 2;
    } else if (prevZ > 7 && prevX > -17 && prevX < -13) {
      // Slow down by post office roof
      xCoord += step / 5;
    } else {
      xCoord += step;
    }
    // Passed the middle point (good to turn)
    if (prevX === minmax.x.middle && !passedMiddle) {
      passedMiddle = true;
    }
  } else {
    zCoord += step;
    // Passed the middle point (good to turn)
    if (prevZ === minmax.z.middle && !passedMiddle) {
      passedMiddle = true;
    }
  }
  // Change direction (turn)
  if (
    ((hDirection && (prevX === minmax.x.min || prevX === minmax.x.max)) ||
      (!hDirection && (prevZ === minmax.z.max || prevZ === minmax.z.min))) &&
    passedMiddle
  ) {
    hDirection = !hDirection;
    passedMiddle = false;
  }

  prev = {
    x: Math.sin(xCoord) * 15.5 - 6,
    y: Math.sin(yCoord) * 3.5 + 7,
    z: Math.cos(zCoord) * 10.6 - 1.2,
  };
  return prev;
};

const cabin = {
  opacity: 1,
  thickness: 0.2,
  height: 0.7,
  length: 2.5,
  width: 1.5,
  depth: 0.5,
  mass: 20,
  color: "white",
};

function Drone() {
  const bodyRef = useRef<RapierRigidBody>();
  const drone = useGLTF(ASSETS.MODELS.DRONE);

  useFrame((state) => {
    if (!bodyRef.current) return;
    bodyRef.current.setTranslation(getCoordinates(), false);
  });

  return (
    <>
      <RigidBody
        ref={bodyRef as React.Ref<RapierRigidBody>}
        colliders={"hull"}
        type="fixed"
        position={[10, 100, 10]}
        linearDamping={0}
        angularDamping={0}
        friction={0.5}
        restitution={0}
        mass={cabin.mass}
      >
        <group position={[0, 0, 0.5]}>
          <group name="cabin">
            <mesh rotation={[0, 0, 0]} position={[-0.25, 0, 0]}>
              <boxGeometry args={[cabin.length, 0.4, cabin.width]} />
              <meshStandardMaterial
                color={cabin.color}
                opacity={cabin.opacity}
                transparent
              />
            </mesh>
            <mesh
              rotation={[0, 0, -Math.PI / 2]}
              position={[0.65, cabin.depth, 0]}
            >
              <boxGeometry
                args={[cabin.height, cabin.thickness, cabin.width]}
              />
              <meshStandardMaterial
                color={cabin.color}
                opacity={cabin.opacity}
                transparent
              />
            </mesh>
            <mesh
              rotation={[0, 0, Math.PI / 2]}
              position={[-1.65, cabin.depth, 0]}
            >
              <boxGeometry
                args={[cabin.height, cabin.thickness, cabin.width]}
              />
              <meshStandardMaterial
                color={cabin.color}
                opacity={cabin.opacity}
                transparent
              />
            </mesh>
            <mesh
              rotation={[Math.PI / 2, 0, 0]}
              position={[-0.5, cabin.depth, 0.85]}
            >
              <boxGeometry
                args={[cabin.length, cabin.thickness, cabin.height]}
              />
              <meshStandardMaterial
                color={cabin.color}
                opacity={cabin.opacity}
                transparent
              />
            </mesh>
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[-0.5, cabin.depth, -0.85]}
            >
              <boxGeometry
                args={[cabin.length, cabin.thickness, cabin.height]}
              />
              <meshStandardMaterial
                color={cabin.color}
                opacity={cabin.opacity}
                transparent
              />
            </mesh>
          </group>
          <primitive
            name="drone"
            object={drone.scene}
            scale={[9.5, 4, 9.5]}
            rotation={[0, Math.PI / 2, 0]}
            position={[-0.47, -0.05, 0]}
          />
        </group>
      </RigidBody>
    </>
  );
}

useGLTF.preload(ASSETS.MODELS.DRONE);

export default Drone;
