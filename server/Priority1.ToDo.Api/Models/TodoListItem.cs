using Priority1.ToDo.Core.Domain;

namespace Priority1.ToDo.Api.Models;

public class TodoListItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime UpdateDate { get; set; }

    public static TodoListItem From(TodoList todo)
    {
        return new TodoListItem
        {
            Id = todo.Id,
            Title = todo.Title,
            CreateDate = todo.CreateDate,
            UpdateDate = todo.UpdateDate
        };
    }

    public TodoList ToModel()
    {
        return new TodoList
        {
            Id = Id,
            Title = Title,
            CreateDate = CreateDate,
            UpdateDate = UpdateDate
        };
    }
}
