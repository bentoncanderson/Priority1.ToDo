import { useState } from 'react';
import TodoList from './TodoList';

function sortTodos(todos, sortBy, sortDir) {
  if (sortBy === 'none') return todos;
  const dir = sortDir === 'asc' ? 1 : -1;

  return [...todos].sort((a, b) => {
    const av = a[sortBy];
    const bv = b[sortBy];

    // Todos with no date always go last, in either direction.
    if (!av && !bv) return 0;
    if (!av) return 1;
    if (!bv) return -1;

    return (new Date(av) - new Date(bv)) * dir;
  });
}

export default function TodoListCompendium({
  lists,
  todos,
  onRenameList,
  onDeleteList,
  onAddTodo,
  onToggleTodo,
  onRenameTodo,
  onDueDateUpdate,
  onDeleteTodo,
}) {

  const [sortBy, setSortBy] = useState('none');
  const [sortDir, setSortDir] = useState('asc');

  if (lists.length === 0) {
    return <p className="muted">No todo lists yet. Add one above.</p>;
  }

  return (
    <>
      <div className="sort-controls">
        <label>
          Sort todos by{' '}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">Default</option>
            <option value="dueDate">Due date</option>
            <option value="createDate">Created date</option>
          </select>
        </label>

        {sortBy !== 'none' && (
          <button
            className="btn-small"
            onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
            title="Toggle sort direction"
          >
            {sortDir === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        )}
      </div>

      <ul className="todo-list-compendium">
        {lists.map((list) => (
          <TodoList
            key={list.id}
            list={list}
            todos={sortTodos(
              todos.filter((todo) => todo.todoListId === list.id),
              sortBy,
              sortDir
            )}
            onRename={onRenameList}
            onDelete={onDeleteList}
            onAddTodo={onAddTodo}
            onToggleTodo={onToggleTodo}
            onRenameTodo={onRenameTodo}
            onDueDateUpdate={onDueDateUpdate}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ul>
    </>
  );
}