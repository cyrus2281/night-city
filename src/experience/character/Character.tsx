import { useRef, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import * as THREE from "three";
import Model from "./Model";

/* 
 Credits to 
 SimonDev (https://www.youtube.com/@simondev758) for character and camera movement
 Louis3797/r3f-world-with-character (Github) for R3F adoption
*/

export function Character() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const bodyRef = useRef<RapierRigidBody>();

  const currentPosition = new THREE.Vector3();
  const currentLookAt = new THREE.Vector3();
  const decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
  const acceleration = new THREE.Vector3(1, 0.125, 10.0);
  const velocity = new THREE.Vector3(0, 0, 0);

  const jump = () => {
    if (!bodyRef.current) return;
    const origin = bodyRef.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 1, true);

    if (hit && hit.toi < 0.15) {
      bodyRef.current.applyImpulse({ x: 0, y: 50, z: 0 }, true);
    }
  };

  function updateCameraTarget(
    camera: THREE.Camera,
    model: RapierRigidBody,
    delta: number
  ) {
    const bodyPosition = model.translation() as THREE.Vector3;
    const bodyRotation = model.rotation() as THREE.Quaternion;

    const idealOffset = new THREE.Vector3(-1, 2, -3);
    idealOffset.applyQuaternion(bodyRotation);
    idealOffset.add(bodyPosition);

    const idealLookat = new THREE.Vector3(0, 1, 5);
    idealLookat.applyQuaternion(bodyRotation);
    idealLookat.add(bodyPosition);

    const t = 1.0 - Math.pow(0.001, delta);

    currentPosition.lerp(idealOffset, t);
    currentLookAt.lerp(idealLookat, t);

    camera.position.copy(currentPosition);
  }

  const modelState = (
    camera: THREE.Camera,
    model: RapierRigidBody,
    delta: number
  ) => {
    const newVelocity = velocity;
    const frameDecceleration = new THREE.Vector3(
      newVelocity.x * decceleration.x,
      newVelocity.y * decceleration.y,
      newVelocity.z * decceleration.z
    );
    frameDecceleration.multiplyScalar(delta);
    frameDecceleration.z =
      Math.sign(frameDecceleration.z) *
      Math.min(Math.abs(frameDecceleration.z), Math.abs(newVelocity.z));

    newVelocity.add(frameDecceleration);
    const bodyQuaternion = model.rotation();
    const bodyPosition = model.translation();
    const controlObject = {
      quaternion: new THREE.Quaternion(
        bodyQuaternion.x,
        bodyQuaternion.y,
        bodyQuaternion.z,
        bodyQuaternion.w
      ),
      position: new THREE.Vector3(
        bodyPosition.x,
        bodyPosition.y,
        bodyPosition.z
      ),
    };
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const { forward, backward, left, right, sprint } = getKeys();

    const acc = acceleration.clone();
    if (sprint) {
      acc.multiplyScalar(2.0);
    }

    if (forward) {
      newVelocity.z += acc.z * delta;
    }
    if (backward) {
      newVelocity.z -= acc.z * delta;
    }
    if (left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * delta * acceleration.y);
      _R.multiply(_Q);
      if (!backward && !forward) newVelocity.z += acc.z * delta;
    }
    if (right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * acceleration.y);
      _R.multiply(_Q);
      if (!backward && !forward) newVelocity.z += acc.z * delta;
    }

    controlObject.quaternion.copy(_R);

    const frontways = new THREE.Vector3(0, 0, 1);
    frontways.applyQuaternion(controlObject.quaternion);
    frontways.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(newVelocity.x * delta);
    frontways.multiplyScalar(newVelocity.z * delta);

    controlObject.position.add(frontways);
    controlObject.position.add(sideways);

    model.setTranslation(controlObject.position, true);
    model.setRotation(_R, true);

    updateCameraTarget(camera, model, delta);
  };

  useFrame((state, delta) => {
    if (!bodyRef.current) return;
    const camera = state.camera;

    modelState(camera, bodyRef.current, delta);
    const bodyPosition = bodyRef.current.translation() as THREE.Vector3;
    const bodyRotation = bodyRef.current.rotation() as THREE.Quaternion;

    const idealLookat = new THREE.Vector3(0, 1, 5);
    idealLookat.applyQuaternion(bodyRotation);
    idealLookat.add(bodyPosition);

    state.camera.lookAt(idealLookat);

    state.camera.updateProjectionMatrix();
  });

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump();
      }
    );
    return () => {
      unsubscribeJump();
    };
  }, []);

  return (
    <>
      <RigidBody
        ref={bodyRef as React.Ref<RapierRigidBody>}
        colliders="hull"
        position={[0, 0.01, 0]}
        linearDamping={0.5}
        angularDamping={0.5}
        friction={0.8}
        restitution={0.2}
        mass={1}
      >
        <Model />
      </RigidBody>
    </>
  );
}

export default Character;
