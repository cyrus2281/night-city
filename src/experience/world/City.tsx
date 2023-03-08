import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { MODELS } from "../utils/constants";

function City() {
  const city = useGLTF(MODELS.CITY);
  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      friction={0.5}
      restitution={0.2}
      position={[0, -0.5, 0]}
      scale={[50, 50, 50]}
    >
      <primitive object={city.scene} scale={0.01} />
    </RigidBody>
  );
}

export default City;
