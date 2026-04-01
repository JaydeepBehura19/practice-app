import "./HoverBox.css";

/*
  Kept event logic outside this component — it just 
  receives bgColor and callbacks. The color flips between 
  red and indigo depending on mouse position.
*/

function HoverBox({ bgColor, onEnter, onLeave }) {
  return (
    <div
      className="hover-box"
      style={{ backgroundColor: bgColor }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="hover-box-label">Hover over me!</span>
      <span className="hover-box-hint">
        {bgColor === "#ef4444" ? "Mouse is inside" : "Mouse is outside"}
      </span>
    </div>
  );
}

export default HoverBox;
