import { useState } from "react";
import "./Button.css";

/*
  Made a reusable button that takes label and color as props.
  Used useState for the hover effect instead of CSS — wanted 
  the brightness to shift when the cursor enters.
*/

function Button({ label, color, onClick }) {
  /* tracked whether the mouse is over the button */
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: color || "#6366f1",
    filter: isHovered ? "brightness(1.15)" : "brightness(1)",
  };

  return (
    <button
      className="custom-btn"
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
}

export default Button;
