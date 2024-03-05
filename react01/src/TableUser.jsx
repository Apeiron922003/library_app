import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, [todos]);
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>STT</th>
          <th>User</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={todo.id}>
            <td>{index}</td>
            <td>{todo.userId}</td>
            <td>{todo.title}</td>
            <td>
              <input type="checkbox" defaultChecked={todo.completed} disabled />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
