import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

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

function Drone() {
  const bodyRef = useRef<RapierRigidBody>();

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
        friction={1}
        restitution={0}
        mass={10}
      >
        <mesh rotation={[0, 0, 0]} position={[-0.5, 0, 0]}>
          <boxGeometry args={[3, 0.3, 2]} />
          <meshStandardMaterial color="white" opacity={0.2} transparent />
        </mesh>
        <mesh rotation={[0, 0, -1.5]} position={[1.15, 0.4, 0]}>
          <boxGeometry args={[0.8, 0.3, 2]} />
          <meshStandardMaterial color="white" opacity={0.2} transparent />
        </mesh>
        <mesh rotation={[0, 0, 1.5]} position={[-2.15, 0.4, 0]}>
          <boxGeometry args={[0.8, 0.3, 2]} />
          <meshStandardMaterial color="white" opacity={0.2} transparent />
        </mesh>
        <mesh rotation={[1.5, 0, 0]} position={[-0.5, 0.4, 1.15]}>
          <boxGeometry args={[3, 0.3, 0.8]} />
          <meshStandardMaterial color="white" opacity={0.2} transparent />
        </mesh>
        <mesh rotation={[-1.5, 0, 0]} position={[-0.5, 0.4, -1.15]}>
          <boxGeometry args={[3, 0.3, 0.8]} />
          <meshStandardMaterial color="white" opacity={0.2} transparent />
        </mesh>
      </RigidBody>
    </>
  );
}

export default Drone;
