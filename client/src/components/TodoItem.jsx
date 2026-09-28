import { useState } from 'react';

function todayString() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function TodoItem({ todo, onToggle, onRename, onDueDateUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  const dueDate = todo.dueDate ? todo.dueDate.slice(0, 10) : '';
  const isOverdue = dueDate !== '' && !todo.isComplete && dueDate < todayString();

  function saveEdit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.title) {
      onRename(todo, trimmed);
    } else {
      setDraft(todo.title);
    }
    setEditing(false);
  }

  return (
    <li className={`todo-item ${isOverdue ? 'overdue' : ''}`}>
      <input
        type="checkbox"
        checked={todo.isComplete}
        onChange={() => onToggle(todo)}
        title="Mark complete / incomplete"
      />

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
          className={`title ${todo.isComplete ? 'complete' : ''}`}
          onDoubleClick={() => setEditing(true)}
          title="Double-click to edit"
        >
          {todo.title}
        </span>
      )}

      <input
        type="date"
        className="due-date"
        value={dueDate}
        onChange={(e) => onDueDateUpdate(todo, e.target.value || null)}
        title="Due date"
      />
      {isOverdue && <span className="overdue-badge">Overdue</span>}

      <div className="todo-list-actions">
          {!editing && (
            <button className="btn-small" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
          <button className="btn-small btn-danger" onClick={() => onDelete(todo)}>
            Delete
          </button>
        </div>
    </li>
  );
}
