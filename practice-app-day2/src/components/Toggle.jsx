import { useState } from "react";
import "./Toggle.css";

/*
  Built a toggle that flips between ON and OFF.
  Used useState to hold the active state and swapped 
  the label and pill color based on it.
*/

function Toggle() {
  /* defaulted to false — OFF felt like the right starting point */
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="toggle-wrapper">
      <div className="toggle-status">
        Status:{" "}
        <span className={isActive ? "status-on" : "status-off"}>
          {isActive ? "ON" : "OFF"}
        </span>
      </div>

      <button
        className={`toggle-pill ${isActive ? "active" : ""}`}
        onClick={handleToggle}
        aria-label="Toggle switch"
      >
        <span className="toggle-knob" />
      </button>
    </div>
  );
}

export default Toggle;
