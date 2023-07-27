import { Vector3 } from "three";

export const CHARACTER_INITIAL_POSITION = new Vector3(-11, 0.01, 12);

export const POSITION_DISPLACEMENT_THRESHOLD = {
  x: 0.5,
  y: 0.1,
  z: 0.5,
};

export const ALTITUDE_DISPLACEMENT_THRESHOLD = 2;

export const MODELS = {
  FOX: "/dev/Fox/Fox.gltf",
  CITY: "/dev/night-city.glb",
  ENV_MAP: "/dev/envMap/night_city.hdr",
};

export const NIGHT_CITY_FONT = `
███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗     ██████╗██╗████████╗██╗   ██╗
████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝    ██╔════╝██║╚══██╔══╝╚██╗ ██╔╝
██╔██╗ ██║██║██║  ███╗███████║   ██║       ██║     ██║   ██║    ╚████╔╝ 
██║╚██╗██║██║██║   ██║██╔══██║   ██║       ██║     ██║   ██║     ╚██╔╝  
██║ ╚████║██║╚██████╔╝██║  ██║   ██║       ╚██████╗██║   ██║      ██║   
╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝        ╚═════╝╚═╝   ╚═╝      ╚═╝  

* Check ${window.location.origin}#debug for debug options
* Check ${window.location.origin}/about to learn more about Night City
* Check ${window.location.origin}/credits to learn more about the creators
* Check https://github.com/cyrus2281/night-city for the source code
`;

window.onload = () => {
  // console.clear();
  console.log(NIGHT_CITY_FONT);
};
