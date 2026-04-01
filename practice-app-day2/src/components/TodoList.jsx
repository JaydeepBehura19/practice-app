import { useState } from "react";
import "./TodoList.css";

/*
  Set up two lists side by side — one with id as key and 
  one with index. Inserting at the top makes the difference 
  obvious when items shift. Also added an alert on each add 
  since we needed meaningful alert usage somewhere.
*/

const initialTasks = [
  { id: 101, task: "Review React docs" },
  { id: 102, task: "Build a mini project" },
  { id: 103, task: "Push code to GitHub" },
];

let nextId = 104;

function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);

  /* inserts at the start so the key difference is visible */
  const addNewTask = () => {
    const newItem = {
      id: nextId++,
      task: `New task #${nextId - 104}`,
    };
    setTasks((prev) => [newItem, ...prev]);
    alert(`Added "${newItem.task}" — watch how the two lists handle it differently`);
  };

  return (
    <div className="todo-container">
      <button className="btn todo-add-btn" onClick={addNewTask}>
        + Add Task to Top
      </button>

      <div className="todo-columns">
        {/* correct — using the stable id as key */}
        <div className="todo-col">
          <h4 className="col-label correct-label">Correct (id as key)</h4>
          <ul className="todo-items">
            {tasks.map((item) => (
              <li key={item.id} className="todo-item">
                <span className="todo-id">#{item.id}</span>
                {item.task}
              </li>
            ))}
          </ul>
        </div>

        {/* wrong — using index as key, just to show the difference */}
        <div className="todo-col">
          <h4 className="col-label wrong-label">Incorrect (index as key)</h4>
          <ul className="todo-items">
            {tasks.map((item, index) => (
              <li key={index} className="todo-item">
                <span className="todo-id">#{item.id}</span>
                {item.task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
