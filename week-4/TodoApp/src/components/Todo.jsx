import React from "react";

function Todo({ title, description }) {
  console.log("hesdd");
  return (
    <div>
      <div>
        <h1>title</h1>
        <p>{title}</p>
      </div>

      <div>
        <h1>description</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Todo;
