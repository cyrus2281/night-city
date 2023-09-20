import { RigidBody } from "@react-three/rapier";
import { Circle, Text, useTexture } from "@react-three/drei";

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
        {/* Floor*/}
        <mesh>
          <boxGeometry args={[1, 1, 1, 32, 32]} />
          <meshStandardMaterial color="#111111" envMapIntensity={10} />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        friction={0}
        restitution={0.2}
        position={[-15.3, 2.8, 2]}
        scale={[6, 0.05, 10]}
      >
        {/* Postoffice Rooftop */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial transparent opacity={0} envMapIntensity={10} />
        </mesh>
      </RigidBody>
      <group>
        {/* Unfinished Road */}
        <RigidBody
          type="fixed"
          friction={0}
          restitution={0.2}
          position={[24.5, 4, 5]}
          scale={[0.1, 10, 12]}
        >
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              transparent
              opacity={0.1}
              color={"red"}
              envMapIntensity={10}
            />
          </mesh>
        </RigidBody>
        <mesh position={[24.5, 3, 5]} rotation={[0, -Math.PI / 2, 0]}>
          <circleGeometry args={[1, 32]} />
          <meshStandardMaterial color={"red"} envMapIntensity={10} />
        </mesh>
        <mesh
          position={[24.49, 3, 5]}
          scale={[0.8, 0.8, 0.8]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <circleGeometry args={[1, 32]} />
          <meshStandardMaterial color={"white"} envMapIntensity={10} />
        </mesh>
        <mesh
          position={[24.5, 3, 5]}
          scale={[1.6, 0.2, 0.05]}
          rotation={[0, -Math.PI / 2, Math.PI / 4]}
        >
          <boxGeometry args={[1,1,1]} />
          <meshStandardMaterial color={"red"} envMapIntensity={10} />
        </mesh>
      </group>
    </>
  );
}

export default Ground;
