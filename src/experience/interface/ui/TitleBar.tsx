import { useEffect, useState } from "react";
import "./TitleBar.scss";
import useLocation from "../../stores/useLocation";

function TitleBar() {
  const territoriesName = useLocation((state) => state.territoriesName);
  const [text, setText] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (territoriesName.length) {
      setText(territoriesName.at(-1) as string);
    }
  }, [territoriesName]);

  useEffect(() => {
    if (text) {
      setIsHidden(false);
      setTimeout(() => {
        setIsHidden(true);
      }, 3000);
    }
  }, [text]);

  return (
    <div className={"title-wrapper " + (isHidden ? "hide" : "")}>
      <div className="title-text">{text}</div>
      <div className="title-bar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116.02 11.1">
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path d="M56.93,4.73A5.39,5.39,0,0,0,55.7,4a4.9,4.9,0,0,0-1.36-.32,4.78,4.78,0,0,0-2.68.55,5.17,5.17,0,0,0-1.1.82,3.37,3.37,0,0,0-.75,1.1,3.16,3.16,0,0,0,0,2.59,3,3,0,0,0,.8,1.07,2.5,2.5,0,0,0,.54.35,2.46,2.46,0,0,0,.62.17,2.74,2.74,0,0,0,.64,0,2.62,2.62,0,0,0,.62-.19A2.07,2.07,0,0,0,54,9.3a1.57,1.57,0,0,0,.08-1.22,1.39,1.39,0,0,0-.84-.88,1.1,1.1,0,0,0-1.14.32.73.73,0,0,0,0,1.06.15.15,0,0,1,0,.22.17.17,0,0,1-.21,0h0a.92.92,0,0,1-.45-.76,1.2,1.2,0,0,1,.27-.83,1.55,1.55,0,0,1,1.58-.53,2.05,2.05,0,0,1,1.19,2.85,2.84,2.84,0,0,1-2.85,1.51,3.28,3.28,0,0,1-.83-.22,3.42,3.42,0,0,1-.73-.45,3.94,3.94,0,0,1-1-1.31A4,4,0,0,1,50,4.48a5,5,0,0,1,1.31-1A5.29,5.29,0,0,1,54.43,3a5.05,5.05,0,0,1,2.84,1.36.25.25,0,0,1,0,.36.26.26,0,0,1-.35,0Z" />
              <path d="M4.85,4.53A1.09,1.09,0,1,1,3.76,3.44,1.09,1.09,0,0,1,4.85,4.53Z" />
              <path d="M53.05,8.24a.7.7,0,0,1-.7.7.7.7,0,0,1-.71-.7.71.71,0,0,1,.71-.71A.7.7,0,0,1,53.05,8.24Z" />
              <path d="M10.66,10.07h0C4.49,10.07,1.94,8.34.88,6.9A4.64,4.64,0,0,1,.8,1.57,3.68,3.68,0,0,1,5.92.66a3,3,0,0,1,.74,4.2,2.48,2.48,0,0,1-3.47.61.38.38,0,0,1-.09-.54.39.39,0,0,1,.54-.09A1.71,1.71,0,0,0,6,4.42,2.22,2.22,0,0,0,5.47,1.3,2.81,2.81,0,0,0,3.31.82,2.87,2.87,0,0,0,1.44,2a3.93,3.93,0,0,0,.07,4.43c1.91,2.62,9,5.81,35.09-2.31C48.13.54,53.35,1.31,55.7,2.59A3.31,3.31,0,0,1,57.47,4.4a.38.38,0,1,1-.74.21c0-.08-2-5.32-19.9.26C25.75,8.32,16.94,10.07,10.66,10.07Z" />
              <path d="M58.75,4.34A5,5,0,0,1,61.59,3a5.29,5.29,0,0,1,3.15.54,5.14,5.14,0,0,1,1.31,1,4,4,0,0,1,.83,4.62,4.07,4.07,0,0,1-1,1.31,3.42,3.42,0,0,1-.73.45,3.51,3.51,0,0,1-.83.22,2.86,2.86,0,0,1-2.86-1.51,2.06,2.06,0,0,1,1.2-2.85,1.55,1.55,0,0,1,1.58.53,1.2,1.2,0,0,1,.27.83.92.92,0,0,1-.45.76h0a.16.16,0,0,1-.21-.06.16.16,0,0,1,0-.21.71.71,0,0,0,0-1.06,1.08,1.08,0,0,0-1.13-.32,1.37,1.37,0,0,0-.84.88A1.52,1.52,0,0,0,62,9.3a2,2,0,0,0,.93.86,2.77,2.77,0,0,0,.62.19,2.83,2.83,0,0,0,.65,0,2.72,2.72,0,0,0,.62-.17,2.82,2.82,0,0,0,1.34-1.42,3.2,3.2,0,0,0,0-2.59,3.25,3.25,0,0,0-.76-1.1,4.71,4.71,0,0,0-1.1-.82,4.78,4.78,0,0,0-2.68-.55A5,5,0,0,0,60.31,4a5.55,5.55,0,0,0-1.22.71h0a.26.26,0,0,1-.33-.39Z" />
              <path d="M111.16,4.53a1.1,1.1,0,1,0,1.1-1.09A1.1,1.1,0,0,0,111.16,4.53Z" />
              <path d="M63,8.24a.7.7,0,0,0,.71.7.7.7,0,0,0,.7-.7.7.7,0,0,0-.7-.71A.71.71,0,0,0,63,8.24Z" />
              <path d="M105.35,10.07c-6.28,0-15.08-1.75-26.17-5.2-18-5.59-19.87-.31-19.89-.26a.39.39,0,0,1-.48.26.39.39,0,0,1-.27-.47,3.36,3.36,0,0,1,1.77-1.81c2.35-1.28,7.57-2,19.1,1.54,26.08,8.12,33.19,4.93,35.1,2.31A3.93,3.93,0,0,0,114.58,2,2.89,2.89,0,0,0,112.71.82a2.84,2.84,0,0,0-2.17.48,2.19,2.19,0,0,0-.92,1.44A2.27,2.27,0,0,0,110,4.42a1.73,1.73,0,0,0,2.39.42.39.39,0,0,1,.54.09.39.39,0,0,1-.1.54,2.46,2.46,0,0,1-3.46-.61,3,3,0,0,1-.5-2.25A3,3,0,0,1,110.1.66a3.67,3.67,0,0,1,5.11.91,4.65,4.65,0,0,1-.07,5.33c-1.06,1.44-3.61,3.17-9.77,3.17Z" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default TitleBar;
