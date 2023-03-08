import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { MeshCollider } from "@react-three/rapier";
import * as THREE from "three";

import { MODELS } from "../utils/constants";

const length = 3;
const width = 2;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

const extrudeSettings = {
  steps: 1,
  depth: 5,
  bevelEnabled: true,
  bevelThickness: 3.5,
  bevelSize: 2.2,
  bevelOffset: 0,
  bevelSegments: 5,
};

const Model = ({ animationName }: { animationName: { current: string } }) => {
  const fox = useGLTF(MODELS.FOX);
  const [currentAnimation, setCurrentAnimation] = useState("Survey");
  const animations = useAnimations(fox.animations, fox.scene);

  useFrame(() => {
    if (currentAnimation !== animationName.current) {
      setCurrentAnimation(animationName.current);
    }
  });

  useEffect(() => {
    const action = animations.actions[currentAnimation];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [currentAnimation]);

  return (
    <>
      {/* <RoundCuboidCollider
          // Adding a flat box to prevent falling from sides
          position={[0, 0.35, 0]}
          args={[0.05, 0.15, 0.35, 0.25]}
        /> */}
      {/* <MeshCollider type="hull">
        <mesh position={[-0.08, 0.25, -0.3]} scale={[0.05, 0.1, 0.1]}>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </MeshCollider> */}
      <primitive object={fox.scene} scale={0.01} />
    </>
  );
};

export default Model;
