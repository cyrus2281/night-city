import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { ASSETS } from "../utils/constants";
import { useAnimations, useGLTF } from "@react-three/drei";
import { ROBOT_ANIMATIONS } from "../utils/enums";
import { Vector3 } from "three";

const walkToRoom = (
  position: { current: unknown },
  bodyRef: { current: RapierRigidBody | undefined },
  setAnimation: (name: ROBOT_ANIMATIONS) => void
) => {
  setAnimation(ROBOT_ANIMATIONS.WALK);
  gsap.to(position.current as Vector3, {
    x: 17,
    z: 17,
    duration: 5,
    ease: "none",
    onUpdateParams: [position.current],
    onUpdate: (position) => {
      bodyRef.current?.setTranslation(position, false);
    },
    onComplete: () => {
      setAnimation(ROBOT_ANIMATIONS.IDLE);
    },
  });
};

function Robot() {
  const positionRef = useRef({
    x: -7,
    y: -0.5,
    z: 9,
    rx: 0,
    ry: Math.PI / 4,
    rz: 0,
  });
  const bodyRef = useRef<RapierRigidBody>();
  const robot = useGLTF(ASSETS.MODELS.ROBOT);
  const [currentAnimation, setCurrentAnimation] = useState(
    ROBOT_ANIMATIONS.IDLE
  );
  const animations = useAnimations(robot.animations, robot.scene);

  useEffect(() => {
    const action = animations.actions[currentAnimation];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [currentAnimation]);

  window.robotFn = () => {
    if (bodyRef.current) walkToRoom(positionRef, bodyRef, setCurrentAnimation);
  };

  return (
    <>
      <RigidBody
        ref={bodyRef as React.Ref<RapierRigidBody>}
        colliders={"hull"}
        type="fixed"
        position={[
            positionRef.current.x,
            positionRef.current.y,
            positionRef.current.z,
            // 17,
            // -0.5,
            // 17,
        ]}
        rotation={[
            positionRef.current.rx,
            positionRef.current.ry,
            positionRef.current.rz,
            // 0,
            // 0,
            // 0,
        ]}
        linearDamping={0}
        angularDamping={0}
        friction={0.5}
        restitution={0}
        mass={1}
      >
        <primitive
          name="robot"
          object={robot.scene}
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, 0, 0]}
          position={[0, 0, 0]}
        />
      </RigidBody>
    </>
  );
}

useGLTF.preload(ASSETS.MODELS.ROBOT);

export default Robot;
