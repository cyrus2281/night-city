import { useControls } from "leva";
import useLocation from "../stores/useLocation";
import { useEffect } from "react";

function TerritoryInterface() {
  const territoryName = useLocation((state) => state.territoryName);
  const location = useLocation((state) => state.location);

  const [, set] = useControls("Location", () => ({
    Territory: {
      value: territoryName,
      editable: false,
    },
    Position: {
      value: {x:0, y:0, z:0},
      editable: false,
    }
  }));

  useEffect(() => {
    const simpleLocation = {
        x: location.x,
        y: location.y,
        z: location.z,
      };
    set({
        Position: simpleLocation,
        Territory: territoryName,
      });
  }, [location, territoryName, set])

  return <></>;
}

export default TerritoryInterface;
