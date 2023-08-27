import { Environment } from "@react-three/drei";
import { ASSETS } from "../utils/constants";
import {
  sRGBEncoding,
  TextureLoader,
  EquirectangularReflectionMapping,
} from "three";

export const loadMap = () => {
  const textureLoader = new TextureLoader();
  const environmentMap = textureLoader.load(ASSETS.ENV_MAP);
  environmentMap.mapping = EquirectangularReflectionMapping;
  environmentMap.encoding = sRGBEncoding;
  window.map = environmentMap;
};

function Lights() {

  return (
    <>
      <Environment map={window.map} background resolution={256} blur={0.05} />
      <ambientLight intensity={0.09} />
    </>
  );
}

export default Lights;
