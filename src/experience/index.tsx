import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import Interface from "./interface";
import { Navigate, Outlet, Route } from "react-router-dom";
import Credit from "../pages/Credit";
import Resume from "../pages/Resume";
import Contact from "../pages/Contact";

function World() {
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
      <Outlet />
    </>
  );
}

function getWorldRouter({ worldPath = "/world" }: { worldPath: string }) {
  return (
    <Route path={worldPath} Component={World}>
      <Route path="credit" Component={Credit} />
      <Route path="resume" Component={Resume} />
      <Route path="contact" Component={Contact} />
      <Route path="*" element={<Navigate to={worldPath} replace={true} />} />
    </Route>
  );
}

export { getWorldRouter, World };
export default getWorldRouter;
