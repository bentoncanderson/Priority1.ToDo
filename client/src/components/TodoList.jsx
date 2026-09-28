import { useState } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddForms/AddTodoForm';

export default function TodoList({list, todos, onRename, onDelete, onAddTodo, onToggleTodo, onRenameTodo, onDueDateUpdate, onDeleteTodo}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(list.title);

  function saveEdit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== list.title) {
      onRename(list, trimmed);
    } else {
      setDraft(list.title);
    }
    setEditing(false);
  }

  return (
    <li className="todo-list-card">
      <header className="todo-list-header">
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
                setDraft(list.title);
                setEditing(false);
              }
            }}
          />
        ) : (
          <h2
            className="todo-list-title"
            onDoubleClick={() => setEditing(true)}
            title="Double-click to edit"
          >
            {list.title}
          </h2>
        )}

        <div className="todo-list-actions">
          {!editing && (
            <button className="btn-small" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
          <button className="btn-small btn-danger" onClick={() => onDelete(list)}>
            Delete
          </button>
        </div>
      </header>

      {todos.length === 0 ? (
        <p className="muted">No todos yet. Add one below.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onRename={onRenameTodo}
              onDueDateUpdate={onDueDateUpdate}
              onDelete={onDeleteTodo}
            />
          ))}
        </ul>
      )}

      <AddTodoForm onAdd={(title) => onAddTodo(list.id, title)} />
    </li>
  );
}