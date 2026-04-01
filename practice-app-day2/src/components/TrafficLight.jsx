import "./TrafficLight.css";

/*
  Took the current light color as a prop and used a switch 
  to pick the right label. Also highlighted the active 
  circle so it looks like an actual signal.
*/

function TrafficLight({ currentLight }) {
  /* picked the message based on whichever light is on */
  let message;
  switch (currentLight) {
    case "red":
      message = "Stop";
      break;
    case "yellow":
      message = "Slow Down";
      break;
    case "green":
      message = "Go!";
      break;
    default:
      message = "No signal";
  }

  return (
    <div className="traffic-wrapper">
      <div className="traffic-pole">
        <div
          className={`light red-light ${currentLight === "red" ? "lit" : ""}`}
        />
        <div
          className={`light yellow-light ${currentLight === "yellow" ? "lit" : ""}`}
        />
        <div
          className={`light green-light ${currentLight === "green" ? "lit" : ""}`}
        />
      </div>
      <p className="traffic-msg">{message}</p>
    </div>
  );
}

export default TrafficLight;
