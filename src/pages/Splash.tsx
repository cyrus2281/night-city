import { useEnvironment, useProgress } from "@react-three/drei";
import Button from "../components/Button";
import useGlobal from "../experience/stores/useGlobal";
import "./Splash.scss";
import { useEffect } from "react";
import { loadMap } from "../experience/lights/Lights";
import Loading from "../components/Loading";

function Splash() {
  const progress = useProgress((state) => state.progress);
  const setIsLoaded = useGlobal((state) => state.setIsLoaded);
  const setHasTouched = useGlobal((state) => state.setHasTouched);

  useEffect(() => {
    loadMap();
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsLoaded(true);
    }
  }, [progress]);

  const done = progress === 100;
  const goToNightCity = () => {
    setHasTouched(true);
  };

  return (
    <div className="splash">
      <Loading status={progress} onClick={goToNightCity} />
      <div>
        <Button
          neon
          onClick={goToNightCity}
          className={done ? "" : "invisible"}
          disabled={!done}
        >
          Go to Night City
        </Button>
      </div>
    </div>
  );
}

export default Splash;
