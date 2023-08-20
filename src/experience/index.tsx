import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import Interface from "./interface";
import { Navigate, Outlet, Route } from "react-router-dom";
import Credit from "../pages/Credit";
import Resume from "../pages/Resume";
import Contact from "../pages/Contact";
import useGlobal from "./stores/useGlobal";
import Splash from "../pages/Splash";
import { PAGES } from "./utils/constants";
import { getCameraFOV, printNightCityInfo } from "./utils/utils";

function World() {
  const hasTouched = useGlobal((state) => state.hasTouched);
  const isLoaded = useGlobal((state) => state.isLoaded);

  const isReady = hasTouched && isLoaded;
  if (!isReady) return <Splash />;

  return (
    <>
      <Interface>
        <Canvas
          shadows
          camera={{
            fov: getCameraFOV(),
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
  window.worldPath = worldPath;
  printNightCityInfo();
  return (
    <Route path={worldPath} Component={World}>
      <Route path={PAGES.CREDITS} element={<Credit worldPath={worldPath} />} />
      <Route path={PAGES.RESUME} element={<Resume worldPath={worldPath} />} />
      <Route path={PAGES.CONTACT} element={<Contact worldPath={worldPath} />} />
      <Route path="*" element={<Navigate to={worldPath} replace={true} />} />
    </Route>
  );
}

export { getWorldRouter, World };
export default getWorldRouter;
