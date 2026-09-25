import { useEffect, useState } from 'react';
import { getTodoLists, getTodos, createTodoList, updateTodoList, deleteTodoList } from './api';
import AddTodoListForm from './components/AddTodoListForm';
import TodoListCompendium from './components/TodoListCompendium';

export default function App() {
  const [lists, setTodoLists] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all todo lists and todos once on mount.
  useEffect(() => {
    Promise.all([getTodoLists(), getTodos()])
      .then(([listsData, todosData]) => {
        setTodoLists(listsData);
        setTodos(todosData);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAddTodoList(title) {
    try {
      const created = await createTodoList({ title });
      setTodoLists((prev) => [...prev, created]);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleRenameTodoList(todoList, title) {
    try {
      const updated = await updateTodoList(todoList.id, {
        title
      });
      setTodoLists((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDeleteTodoList(todoList) {
    try {
      await deleteTodoList(todoList.id);
      setTodoLists((prev) => prev.filter((t) => t.id !== todoList.Id));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="app">
      <h1>Priority1 ToDo Lists</h1>

      {error && <div className="error">{error}</div>}

      <AddTodoListForm onAdd={handleAddTodoList} />

      {loading ? (
        <p className="muted">Loading…</p>
      ) : (
        <TodoListCompendium
          lists={lists}
          todos={todos}
          onRename={handleRenameTodoList}
          onDelete={handleDeleteTodoList}
        />
      )}
    </div>
  );
}
