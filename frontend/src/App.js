import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://todo-backend-farah.azurewebsites.net';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = () => axios.get(`${API}/api/todos`).then(r => setTodos(r.data));

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post(`${API}/api/todos`, { title });
    setTitle('');
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.patch(`${API}/api/todos/${todo.id}`, { done: !todo.done });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>Todo App — Azure TP</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Nouvelle tâche..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo}>Ajouter</button>
      </div>
      <ul style={{ marginTop: 20, padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo)} />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none', flex: 1 }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
  }

  export default App;