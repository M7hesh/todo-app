import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTodos();
    setRefresh(false);
  }, [refresh]);

  const handleTodoDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setRefresh(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todoObj) => (
            <tr key={todoObj.todo_id}>
              <td>{todoObj.description}</td>
              <td>
                <EditTodo todo={todoObj} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleTodoDelete(todoObj.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
