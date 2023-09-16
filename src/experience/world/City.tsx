import { Float, useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { ReactNode, useEffect } from "react";
import {
  ASSETS,
  EXTERNAL_LINKS,
  MAX_CLICKABLE_DISTANCE,
  PAGES,
} from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { ThreeEvent } from "@react-three/fiber";
import { openUrl } from "../utils/utils";
import { AnimationBlendMode, NormalBlending } from "three";

const traverseChildren = (
  children: any[],
  clickableBlocks: any[],
  list: any[],
  onPointerHandlers: { [name: string]: (e: any) => void }
) => {
  children.forEach((child: any) => {
    if (child.type === "Mesh") {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.envMapIntensity = 3;
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
    } else {
      if (child.type === "Group") {
        const children = child.children;
        child.children = [];
        traverseChildren(
          children,
          clickableBlocks,
          child.children,
          onPointerHandlers
        );
      }
    }
    list.push(child);
  });
};

const performAction = (
  cb: () => void,
  distance: number = MAX_CLICKABLE_DISTANCE
) => {
  return (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.distance < distance) {
      cb();
    }
  };
};

function City() {
  const navigate = useNavigate();
  const { scene, animations } = useGLTF(ASSETS.MODELS.CITY);

  // on Pointer Handlers
  const onPointerHandlers: { [name: string]: (e: any) => void } = {
    Mailbox: performAction(() => navigate(PAGES.CONTACT)),
    Mailbox_1: performAction(() => navigate(PAGES.CONTACT)),
    Mailbox_2: performAction(() => navigate(PAGES.CONTACT)),
    coffee: performAction(() => openUrl(EXTERNAL_LINKS.COFFEE)),
    githubFrame: performAction(() => openUrl(EXTERNAL_LINKS.GITHUB)),
    githubFrame_1: performAction(() => openUrl(EXTERNAL_LINKS.GITHUB)),
    linkedinFrame: performAction(() => openUrl(EXTERNAL_LINKS.LINKEDIN)),
    linkedinFrame_1: performAction(() => openUrl(EXTERNAL_LINKS.LINKEDIN)),
    blockEvents: (e: Event) => e.stopPropagation(),
  };
  // Parsing City
  const cityScene = scene.clone();
  const clickableBlocks: ReactNode[] = [];
  const children = cityScene.children;
  cityScene.children = [];
  traverseChildren(
    children,
    clickableBlocks,
    cityScene.children,
    onPointerHandlers
  );

  const cityAnimations = useAnimations(animations, cityScene);
  useEffect(() => {
    cityAnimations.clips.forEach((clip) => {
      const action = cityAnimations.mixer.clipAction(clip);
      action.reset().play();
    });
    return () => {
      cityAnimations.clips.forEach((clip) => {
        const action = cityAnimations.mixer.clipAction(clip);
        action.reset().stop();
      });
    };
  }, [animations]);

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

useGLTF.preload(ASSETS.MODELS.CITY);
export default City;
