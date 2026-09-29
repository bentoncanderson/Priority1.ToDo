namespace Priority1.ToDo.Core.Domain;

using System.ComponentModel.DataAnnotations;

public class TodoList : EntityBase
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
}
