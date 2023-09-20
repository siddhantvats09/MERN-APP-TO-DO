
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [title, settitle] = useState('');

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos');
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    await axios.post('http://localhost:5000/todos', { text,title });
    fetchTodos();
    setText('');
    settitle('');
  };

  const handleDeleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  return (
    <div>
    <h1>To-Do List</h1>
    <input
      type="text"
      placeholder="title"
      value={title}
      onChange={(e) => settitle(e.target.value)}
    />
    <input
      type="text"
      placeholder="Enter a new todo"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <button onClick={handleAddTodo}>Add Todo</button>
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {todo.title}
          {todo.text}
          <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default App
