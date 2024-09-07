import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { ASSETS } from "../utils/constants";
import useLocation from "../stores/useLocation";
import { OTHER_TERRITORIES_NAMES, ROBOT_ANIMATIONS } from "../utils/enums";
import { Vector3 } from "three";
import ChatBubble from "./ChatBubble";

const positionsToRoom = [
  {
    x: -6,
    z: 12,
    ry: 1,
    rw: 0,
    d: 2,
  },
  {
    x: -6,
    z: 12,
    ry: 1,
    rw: 1,
    d: 0.5,
  },
  {
    x: 15.5,
    z: 12,
    ry: 1,
    rw: 1,
    d: 8,
  },
  {
    x: 15.5,
    z: 12,
    ry: 0,
    rw: 1,
    d: 0.5,
  },
  {
    x: 15.5,
    z: 15.5,
    ry: 0,
    rw: 1,
    d: 2,
  },
  {
    x: 15.5,
    z: 15.5,
    ry: 1,
    rw: 1,
    d: 0.5,
  },
  {
    x: 23,
    z: 15.5,
    ry: 1,
    rw: 1,
    d: 3,
  },
];

const moveRobotTo = (
  currentPosition: { current: unknown },
  bodyRef: { current: RapierRigidBody | undefined },
  toPosition: {
    x: number;
    z: number;
    ry: number;
    rw: number;
    d: number;
  }
) => {
  return new Promise((resolve) =>
    gsap.to(currentPosition.current as Vector3, {
      x: toPosition.x,
      z: toPosition.z,
      ry: toPosition.ry,
      rw: toPosition.rw,
      duration: toPosition.d,
      ease: "none",
      onUpdateParams: [currentPosition.current],
      onUpdate: (position) => {
        bodyRef.current?.setTranslation(position, false);
        bodyRef.current?.setRotation(
          {
            x: 0,
            y: position.ry,
            z: 0,
            w: position.rw,
          },
          false
        );
      },
      onComplete: () => {
        resolve(true);
      },
    })
  );
};

const walkToRoom = async (
  setAnimation: (name: ROBOT_ANIMATIONS) => void,
  position: { current: unknown },
  bodyRef: { current: RapierRigidBody | undefined }
) => {
  setAnimation(ROBOT_ANIMATIONS.WALK);
  for (const nextPosition of positionsToRoom) {
    await moveRobotTo(position, bodyRef, nextPosition);
  }
  const lastPosition = positionsToRoom[positionsToRoom.length - 1];
  setAnimation(ROBOT_ANIMATIONS.IDLE);
  bodyRef.current?.setRotation(
    {
      x: 0,
      y: lastPosition.ry,
      z: 0,
      w: lastPosition.rw,
    },
    false
  );
  setTimeout(() => {
    // Sometimes the rotation is not set correctly
    // Setting it again after a delay
    bodyRef.current?.setRotation(
      {
        x: 0,
        y: lastPosition.ry,
        z: 0,
        w: lastPosition.rw,
      },
      false
    );
  }, 50);
};

const playAnimation = (
  setAnimation: (name: ROBOT_ANIMATIONS) => void,
  animation: ROBOT_ANIMATIONS
) => {
  setAnimation(animation);
  setTimeout(() => {
    setAnimation(ROBOT_ANIMATIONS.IDLE);
  }, 1700);
};

function Robot() {
  const positionRef = useRef({
    x: -6,
    y: -0.5,
    z: 17,
    rx: 0,
    ry: (-Math.PI / 3) * 2,
    rz: 0,
    rw: 0,
  });
  const bodyRef = useRef<RapierRigidBody>();
  const robot = useGLTF(ASSETS.MODELS.ROBOT);
  const [currentAnimation, setCurrentAnimation] = useState(
    ROBOT_ANIMATIONS.IDLE
  );
  const animations = useAnimations(robot.animations, robot.scene);
  const territoriesName = useLocation((state) => state.territoriesName);

  const robotActions: { [key: string]: () => void | Promise<void> } = {
    SAY_NO: () => playAnimation(setCurrentAnimation, ROBOT_ANIMATIONS.NO),
    SAY_YES: () => playAnimation(setCurrentAnimation, ROBOT_ANIMATIONS.YES),
    THUMBS_UP: () =>
      playAnimation(setCurrentAnimation, ROBOT_ANIMATIONS.THUMBS_UP),
    WAVE: () => playAnimation(setCurrentAnimation, ROBOT_ANIMATIONS.WAVE),
    WALK_AWAY: () => walkToRoom(setCurrentAnimation, positionRef, bodyRef),
  };

  useEffect(() => {
    if (territoriesName.includes(OTHER_TERRITORIES_NAMES.ROBOT_SPOT)) {
      robotActions.WAVE();
    }
  }, [territoriesName]);

  useEffect(() => {
    const action = animations.actions[currentAnimation];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [currentAnimation]);

  const setRobotAction = (action: string) => {
    if (action in robotActions) {
      robotActions[action]();
    }
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
        ]}
        rotation={[
          positionRef.current.rx,
          positionRef.current.ry,
          positionRef.current.rz,
        ]}
        linearDamping={0}
        angularDamping={0}
        friction={0.5}
        restitution={0}
        mass={1}
      >
        <ChatBubble setAction={setRobotAction} />
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
