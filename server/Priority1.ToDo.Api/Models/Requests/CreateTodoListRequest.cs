using System.ComponentModel.DataAnnotations;
using Priority1.ToDo.Core.Domain;

namespace Priority1.ToDo.Api.Models.Requests;

public class CreateTodoListRequest
{
    [Required]
    public string Title { get; set; } = string.Empty;

    public TodoList ToModel()
    {
        return new TodoList
        {
            Title = Title
        };
    }
}
