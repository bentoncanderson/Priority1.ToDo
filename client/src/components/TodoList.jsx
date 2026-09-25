import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { createTodo, updateTodo, deleteTodo } from '../api';
import { useState } from 'react';

export default function TodoList({ list, todos, onRename, onDelete }) {
  if (todos.length === 0) {
    return <p className="muted">No todos in {list.title} yet. Add one above.</p>;
  }

    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(list.title);
    const [error, setError] = useState(null);
    const todoListId = list.id

    function saveEdit() {
      const trimmed = draft.trim();
      if (trimmed && trimmed !== list.title) {
        onRename(list, trimmed);
      } else {
        setDraft(list.title);
      }
      setEditing(false);
    }

    async function handleAddTodo(title) {
      try {
        const created = await createTodo({ title, todoListId });
        setTodos((prev) => [...prev, created]);
      } catch (e) {
        setError(e.message);
      }
    }

      async function handleToggle(todo) {
        try {
          const updated = await updateTodo(todo.id, {
            title: todo.title,
            isComplete: !todo.isComplete,
          });
          setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        } catch (e) {
          setError(e.message);
        }
      }
    
      async function handleRenameTodo(todo, title) {
        try {
          const updated = await updateTodo(todo.id, {
            title,
            isComplete: todo.isComplete,
          });
          setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        } catch (e) {
          setError(e.message);
        }
      }

      async function handleDeleteTodo(todo) {
        try {
          await deleteTodo(todo.id);
          setTodos((prev) => prev.filter((t) => t.id !== todo.id));
        } catch (e) {
          setError(e.message);
        }
      }

  return (
    <>
      <ul className="todo-list">
        {editing ? (
          <input
            className="edit-title"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') {
                setDraft(todo.title);
                setEditing(false);
              }
            }}
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            title="Double-click to edit"
          >
            {list.title}
          </span>
        )}

        {!editing && (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
        <button onClick={() => onDelete(list)}>Delete</button>
        
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onRename={handleRenameTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>

      <AddTodoForm onAdd={handleAddTodo} />
    </>
  );
}
