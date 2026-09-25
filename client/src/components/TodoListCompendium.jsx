import TodoList from './TodoList';

export default function TodoListCompendium({ lists, todos, onToggle, onRename, onDelete }) {
  if (lists.length === 0) {
    return <p className="muted">No todo lists yet. Add one above.</p>;
  }

  return (
    <ul className="todo-list-compendium">
      {lists.map((list) => (
        <TodoList
          key={list.id}
          list={list}
          todos={todos.filter((todo) => todo.todoListId === list.id)}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
