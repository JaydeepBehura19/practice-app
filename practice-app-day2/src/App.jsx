import { useState } from "react";
import "./App.css";

/* brought in all the components we built for this practice session */
import Button from "./components/Button";
import Toggle from "./components/Toggle";
import InputMirror from "./components/InputMirror";
import HoverBox from "./components/HoverBox";
import TrafficLight from "./components/TrafficLight";
import TodoList from "./components/TodoList";
import Counter from "./components/Counter";

/* kept hover handlers in events/ to stay organized */
import { handleMouseEnter, handleMouseLeave } from "./events/hoverHandlers";

/* used a custom hook for the traffic light cycle */
import useTrafficLight from "./hooks/useTrafficLight";

/*
  Main app file — laid out all the practice components 
  in a card grid. Nothing fancy, just wanted each section 
  to be clearly separated so it's easy to follow.
*/

function App() {
  /* tracks the hover box color — starts as indigo */
  const [hoverBg, setHoverBg] = useState("#6366f1");

  /* traffic light cycling handled by the custom hook */
  const { currentLight, nextLight } = useTrafficLight("red");

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>React Practice – Day 2</h1>
        <p>Trying out hooks, events, and a few component patterns</p>
      </header>

      <main className="dashboard-grid">
        {/* buttons section — reusable component with props */}
        <section className="feature-card" id="buttons-section">
          <span className="card-badge">Buttons</span>
          <h2>Reusable Buttons</h2>
          <p className="card-desc">
            Same component, different colors passed as props.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button label="Primary" color="#6366f1" />
            <Button label="Success" color="#10b981" />
            <Button label="Warning" color="#f59e0b" />
            <Button label="Danger" color="#ef4444" />
          </div>
        </section>

        {/* toggle — simple on/off with useState */}
        <section className="feature-card" id="toggle-section">
          <span className="card-badge">Toggle</span>
          <h2>Toggle Switch</h2>
          <p className="card-desc">
            Flips between ON and OFF using useState.
          </p>
          <Toggle />
        </section>

        {/* input mirror — useState for live text, useRef for focus */}
        <section className="feature-card" id="input-mirror-section">
          <span className="card-badge">Input</span>
          <h2>Input Mirror</h2>
          <p className="card-desc">
            Whatever you type shows up below. Also auto-focuses on load.
          </p>
          <InputMirror />
        </section>

        {/* hover box — mouse enter/leave changes color */}
        <section className="feature-card" id="hover-box-section">
          <span className="card-badge">Hover Box</span>
          <h2>Hover Color Change</h2>
          <p className="card-desc">
            Turns red when you hover, goes back when you leave.
          </p>
          <HoverBox
            bgColor={hoverBg}
            onEnter={() => handleMouseEnter(setHoverBg)}
            onLeave={() => handleMouseLeave(setHoverBg)}
          />
        </section>

        {/* traffic light — conditional rendering with switch */}
        <section className="feature-card" id="traffic-light-section">
          <span className="card-badge">Traffic Light</span>
          <h2>Traffic Signal</h2>
          <p className="card-desc">
            Cycles through red, yellow, green — uses a switch to set the label.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
            <TrafficLight currentLight={currentLight} />
            <button className="btn" style={{ background: "#6366f1", color: "#fff" }} onClick={nextLight}>
              Next Signal
            </button>
          </div>
        </section>

        {/* todo list — comparing correct vs wrong key usage */}
        <section className="feature-card" id="todo-list-section">
          <span className="card-badge">Todo List</span>
          <h2>Lists & Keys</h2>
          <p className="card-desc">
            Two lists side by side — one uses id as key, the other uses index. Try adding items.
          </p>
          <TodoList />
        </section>

        {/* counter — useEffect fires alert and logs on every click */}
        <section className="feature-card" id="counter-section">
          <span className="card-badge">Counter</span>
          <h2>Click Counter</h2>
          <p className="card-desc">
            Counts clicks and triggers an alert each time via useEffect.
          </p>
          <Counter />
        </section>
      </main>

      <footer className="dashboard-footer">
        React + Vite — Day 2 practice
      </footer>
    </div>
  );
}

export default App;
