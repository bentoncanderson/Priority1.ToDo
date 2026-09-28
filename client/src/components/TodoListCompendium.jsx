import TodoList from './TodoList';

export default function TodoListCompendium({lists, todos, onRenameList, onDeleteList, onAddTodo, onToggleTodo, onRenameTodo, onDeleteTodo}) {
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
          onRename={onRenameList}
          onDelete={onDeleteList}
          onAddTodo={onAddTodo}
          onToggleTodo={onToggleTodo}
          onRenameTodo={onRenameTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}