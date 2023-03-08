import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import Interface from "./interface";

function Index() {
  return (
    <>
      <Interface>
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 2,
            far: 200,
            position: [-4, 3, 6],
          }}
        >
          <Experience />
        </Canvas>
      </Interface>
    </>
  );
}

export default Index;
