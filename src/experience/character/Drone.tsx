import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { ASSETS } from "../utils/constants";
import { useGLTF } from "@react-three/drei";

let xCoord = 13.3;
let yCoord = 8;
let zCoord = 10;
let hDirection = true;
let prev = { x: 0, y: 0, z: 0 };
const step = 0.002;

const getCoordinates = () => {
  const prevX = Math.floor(prev.x);
  const prevZ = Math.floor(prev.z);
  const prevY = Math.floor(prev.y);

  if (hDirection) {
    if (prevX === 3 && prevZ === 9 && prevY > 3) {
      // Come down by bridge
      yCoord += step * 2;
    } else if (prevX === 3 && prevZ === -12 && prevY < 10) {
      // Go up by Tech Center roof
      yCoord += step * 2;
    } else if (prevZ > 7 && prevX > -17 && prevX < -13) {
      // Slow down by post office roof
      xCoord += step / 5;
    } else {
      xCoord += step;
    }
    if (prevX === -22 || prevX === 9) {
      hDirection = false;
    }
  } else {
    zCoord += step;
    if (prevZ === -12 || prevZ === 9) {
      hDirection = true;
    }
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
