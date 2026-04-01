import { useState, useEffect } from "react";
import "./Counter.css";

/*
  Used useEffect here to track when clickCount changes.
  Every update logs to console and fires an alert. 
  Skipped the initial mount so the user doesn't get 
  an alert before they even click anything.
*/

function Counter() {
  const [clickCount, setClickCount] = useState(0);

  /* runs whenever clickCount changes — ignored count = 0 */
  useEffect(() => {
    if (clickCount > 0) {
      console.log(`[Counter] click count changed to: ${clickCount}`);
      alert(`Nice! Total clicks: ${clickCount}`);
    }
  }, [clickCount]);

  const handleIncrement = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className="counter-wrapper">
      <div className="counter-display">
        <span className="counter-number">{clickCount}</span>
        <span className="counter-label">
          {clickCount === 1 ? "click" : "clicks"}
        </span>
      </div>
      <p className="counter-text">You clicked {clickCount} times</p>
      <button className="btn counter-btn" onClick={handleIncrement}>
        Click Me
      </button>
    </div>
  );
}

export default Counter;
