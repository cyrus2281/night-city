import { RigidBody } from "@react-three/rapier";
import BrokenDownCity from "./BrokenDownCity";

function City() {
  const onPointerHandlers = {
    onSuzanne: (e: any) => {
      console.log("Suzanne clicked", e);
    }
  }

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      friction={0.5}
      restitution={0.2}
      position={[0, -0.5, 0]}
      scale={[50, 50, 50]}
    >
      <group dispose={null} scale={0.01} >
          <BrokenDownCity onPointerHandlers={onPointerHandlers}/>
      </group>
    </RigidBody>
  );
}

export default City;
