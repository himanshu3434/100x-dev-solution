import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { Todo } from "./components/index";
import Todo from "./components/Todo";
function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const tval = document.getElementById("title").value;
    const dval = document.getElementById("description").value;

    const newtodo = {
      title: tval,
      description: dval,
    };
    const newarray = [...todos, newtodo];
    setTodos(newarray);
    console.log(todos);
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  };

  return (
    <>
      <div>
        <div>
          <input type="text" id="title" placeholder="title" />
        </div>
        <div>
          <input type="text" id="description" placeholder="description" />
        </div>
        <div>
          <button onClick={addTodo}>Create</button>
        </div>
      </div>

      {todos.map((todo, index) => {
        console.log("here");
        return (
          <Todo key={index} title={todo.title} description={todo.description} />
        );
      })}
    </>
  );
}

export default App;
