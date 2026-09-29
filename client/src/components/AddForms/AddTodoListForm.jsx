import { useState } from 'react';

export default function AddTodoListForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What kind of todos do you want to create?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="primary">
        Add
      </button>
    </form>
  );
}
