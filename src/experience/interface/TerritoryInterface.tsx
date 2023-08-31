import { useControls } from "leva";
import useLocation from "../stores/useLocation";
import { useEffect, useState } from "react";
import useGlobal from "../stores/useGlobal";
import { Vector3 } from "three";
import { TERRITORIES_NAMES } from "../utils/enums";
import { TERRITORY_AUDIOS } from "../utils/guyAudios";
import useSound from "../stores/useSound";

function TerritoryInterfaceDebug({
  territoriesName,
}: {
  territoriesName: string[];
}) {
  const location = useLocation((state) => state.location);

  const [{ rectPos, rectShape, circlePos, circleShape }, set] = useControls(
    "Location",
    () => ({
      Territories: {
        value: territoriesName.join(", "),
        editable: false,
      },
      Position: {
        value: { x: 0, y: 0, z: 0 },
        editable: false,
      },
      rectPos: {
        value: { x: 10, y: 30, z: 10 },
        step: 0.3,
        editable: true,
      },
      rectShape: {
        value: { width: 3, height: 0.1, depth: 3 },
        step: 0.3,
        min: 0.1,
        editable: true,
      },
      circlePos: {
        value: { x: -10, y: 30, z: -10 },
        step: 0.3,
        editable: true,
      },
      circleShape: {
        value: { radius: 3, depth: 0.1 },
        step: 0.3,
        min: 0.1,
        editable: true,
      },
    })
  );

  useEffect(() => {
    const simpleLocation = {
      x: location.x,
      y: location.y,
      z: location.z,
    };
    set({
      Position: simpleLocation,
      Territories: territoriesName.join(", "),
    });
  }, [location, territoriesName, set]);

  return (
    <>
      <mesh position={new Vector3(rectPos.x, rectPos.y, rectPos.z)}>
        <boxGeometry
          args={[rectShape.width, rectShape.height, rectShape.depth]}
        />
      </mesh>
      <mesh
        position={new Vector3(circlePos.x, circlePos.y, circlePos.z)}
        scale={[1, circleShape.depth, 1]}
      >
        <sphereGeometry args={[circleShape.radius, 16]} />
      </mesh>
    </>
  );
}

type VisitedTerritoriesInterface = {
  [key in TERRITORIES_NAMES]?: {
    lastVisited: number;
  };
};

function TerritoryInterface() {
  const isDev = useGlobal((state) => state.isDev);
  const playSound = useSound((state) => state.playSound);
  const territoriesName = useLocation((state) => state.territoriesName);
  const [visitedTerritories] = useState<VisitedTerritoriesInterface>({});

  useEffect(() => {
    for (const territoryName of territoriesName) {
      // Check for sound to play
      const audio = TERRITORY_AUDIOS[territoryName];
      if (audio) {
        const visitedTerritory = visitedTerritories[territoryName];
        if (
          !visitedTerritory ||
          (audio.playInterval &&
            visitedTerritory.lastVisited + audio.playInterval < Date.now())
        ) {
          playSound(audio);
        }
      }
      // Update last visited
      let now = Date.now();
      visitedTerritories[territoryName] = {
        lastVisited: now,
      };
    }
  }, [territoriesName]);

  return (
    <>
      {isDev && <TerritoryInterfaceDebug territoriesName={territoriesName} />}
    </>
  );
}

export default TerritoryInterface;
