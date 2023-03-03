import React, { useState } from "react";

const InputTodo = () => {
  const [todo, setTodo] = useState("");
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { description: todo };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={formSubmitHandler}>
        <input
          type="text"
          className="form-control"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};

export default InputTodo;
