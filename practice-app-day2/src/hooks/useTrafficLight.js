import { useState } from "react";

/*
  Pulled the traffic light cycling into its own hook.
  The component just calls nextLight() and doesn't 
  need to know how the rotation works.
*/

const lightSequence = ["red", "yellow", "green"];

function useTrafficLight(startLight = "red") {
  const [currentLight, setCurrentLight] = useState(startLight);

  /* moves to the next color, loops back to red after green */
  const nextLight = () => {
    setCurrentLight((prev) => {
      const currentIdx = lightSequence.indexOf(prev);
      const nextIdx = (currentIdx + 1) % lightSequence.length;
      return lightSequence[nextIdx];
    });
  };

  return { currentLight, nextLight };
}

export default useTrafficLight;
