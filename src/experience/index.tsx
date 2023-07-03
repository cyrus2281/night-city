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

function getWorldRouter({ worldPath = "/world" }: { worldPath?: string }) {
  return (
    <Route path={worldPath} Component={World}>
      <Route path="credit" element={<Credit worldPath={worldPath} />} />
      <Route path="resume" element={<Resume worldPath={worldPath} />} />
      <Route path="contact" element={<Contact worldPath={worldPath} />} />
      <Route path="*" element={<Navigate to={worldPath} replace={true} />} />
    </Route>
  );
}

export { getWorldRouter, World };
export default getWorldRouter;
