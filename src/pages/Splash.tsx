import Button from "../components/Button";
import useGlobal from "../experience/stores/useGlobal";
import "./Splash.scss";

function Splash() {
  const loadStatus = useGlobal((state) => state.loadStatus);
  const setHasTouched = useGlobal((state) => state.setHasTouched);

  const goToNightCity = () => {
    setHasTouched(true);
  };

  return (
    <div className="splash">
      {/* <h1>Load Status {loadStatus}</h1> */}
      <Button neon onClick={goToNightCity}>
        Go to Night City
      </Button>
    </div>
  );
}

export default Splash;
