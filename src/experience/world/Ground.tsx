import { RigidBody } from "@react-three/rapier";

function Ground() {
  return (
    <>
      <RigidBody
        type="fixed"
        friction={0}
        restitution={0.2}
        position={[0, -1, 0]}
        scale={[50, 1, 50]}
      >
        <mesh>
          <boxGeometry args={[1, 1, 1, 32, 32]} />
          <meshStandardMaterial color="#111111" envMapIntensity={10} />
        </mesh>
      </RigidBody>
    </>
  );
}

export default Ground;
