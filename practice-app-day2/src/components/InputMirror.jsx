import { useState, useRef, useEffect } from "react";
import "./InputMirror.css";

/*
  Combined useState and useRef here. useState handles 
  the live text value, useRef grabs the input element 
  so we can auto-focus on mount and also let the user 
  click a button to re-focus. Character count was easy 
  since we already had the value in state.
*/

function InputMirror() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  /* auto-focused the input when the component first loaded */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTyping = (e) => {
    setInputValue(e.target.value);
  };

  /* snaps focus back to the input field on click */
  const handleFocusClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="mirror-container">
      <input
        ref={inputRef}
        type="text"
        className="input-field"
        placeholder="Start typing something..."
        value={inputValue}
        onChange={handleTyping}
      />

      <div className="mirror-output">
        <span className="mirror-label">Live preview:</span>
        <p className="mirror-text">
          {inputValue || "Your text will appear here..."}
        </p>
      </div>

      <div className="mirror-footer">
        <span className="char-count">
          {inputValue.length} character{inputValue.length !== 1 ? "s" : ""}
        </span>
        <button className="btn focus-btn" onClick={handleFocusClick}>
          Focus Input
        </button>
      </div>
    </div>
  );
}

export default InputMirror;
