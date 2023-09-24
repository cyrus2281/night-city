import { Float, useGLTF } from "@react-three/drei";
import { ASSETS } from "../utils/constants";
import { RigidBody } from "@react-three/rapier";
import useSound from "../stores/useSound";
import { GUY_AUDIOS } from "../utils/guyAudios";
import { useState } from "react";

let playedAudio = false;
function Unobtanium() {
  const [obtained, setObtained] = useState(false);
  const playSound = useSound((state) => state.playSound);
  const unobtanium = useGLTF(ASSETS.MODELS.UNOBTANIUM);

  return obtained ? null : (
    <Float floatingRange={[0.1, 0.05]} rotationIntensity={0.5}>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        onCollisionEnter={(e) => {
          !playedAudio && playSound(GUY_AUDIOS.OBTAINED_UNOBTANIUM);
          playedAudio = true;
          setObtained(true);
        }}
      >
        <primitive
          name="Unobtanium"
          object={unobtanium.scene}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
          position={[-15.5, 4, 2]}
        />
      </RigidBody>
    </Float>
  );
}

useGLTF.preload(ASSETS.MODELS.UNOBTANIUM);
export default Unobtanium;
