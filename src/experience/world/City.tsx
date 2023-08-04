import { Float, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { ReactNode } from "react";
import { MODELS } from "../utils/constants";

const onPointerHandlers: { [name: string]: (e: any) => void } = {
  Suzanne: (e: Event) => {
    e.stopPropagation();
    console.log("Suzanne clicked", e);
  },
  blockEvents: (e: Event) => e.stopPropagation(),
};

function City() {
  const { scene } = useGLTF(MODELS.CITY);
  const cityScene = scene.clone();
  const children = cityScene.children;
  cityScene.children = [];

  const clickableBlocks: ReactNode[] = [];
  children.forEach((child: any) => {
    if (child.type === "Mesh") {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.envMapIntensity = 5;
      if (onPointerHandlers[child.name]) {
        if (child.name.includes("floating")) {
          clickableBlocks.push(
            <Float
              floatingRange={[-0.05, 0.05]}
              rotationIntensity={0.3}
              key={child.name}
            >
              <mesh
                key={child.name}
                name={child.name}
                castShadow
                receiveShadow
                geometry={child.geometry}
                material={child.material}
                onPointerDown={onPointerHandlers[child.name]}
              />
            </Float>
          );
        } else {
          clickableBlocks.push(
            <mesh
              key={child.name}
              name={child.name}
              castShadow
              receiveShadow
              geometry={child.geometry}
              material={child.material}
              onPointerDown={onPointerHandlers[child.name]}
            />
          );
        }
        return;
      }
    }
    cityScene.children.push(child);
  });

  return (
    <>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        friction={0.5}
        restitution={0.2}
        position={[0, -0.5, 0]}
        scale={[50, 50, 50]}
      >
        <group onPointerDown={onPointerHandlers.blockEvents}>
          <primitive object={cityScene} scale={0.01} />
        </group>
        <group scale={0.01}>{clickableBlocks}</group>
      </RigidBody>
    </>
  );
}

useGLTF.preload(MODELS.CITY);
export default City;
