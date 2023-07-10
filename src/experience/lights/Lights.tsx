import { Environment } from "@react-three/drei";
import { sRGBEncoding } from "three";
import { MODELS } from "../utils/constants";

function Lights() {
  return (
    <>
      <Environment
        files={MODELS.ENV_MAP}
        background
        resolution={256}
        blur={0.05}
        encoding={sRGBEncoding}
      />
    </>
  );
}

export default Lights;
