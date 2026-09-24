using Microsoft.AspNetCore.Mvc;
using Priority1.ToDo.Api.Models;
using Priority1.ToDo.Api.Models.Requests;
using Priority1.ToDo.Core.Domain;
using Priority1.ToDo.Core.Services.Interfaces;

namespace Priority1.ToDo.Api.Controllers;

[ApiController]
[Route("todolists")]
public class TodoListsController : ControllerBase
{
    private readonly ITodoService<TodoList> _todoListService;

    public TodoListsController(ITodoService<TodoList> todoService)
    {
        _todoListService = todoService;
    }

    [HttpGet]
    public async Task<ActionResult<List<TodoListItem>>> GetAll(CancellationToken ct)
    {
        var todoLists = await _todoListService.GetAllAsync(ct);
        return Ok(todoLists.Select(TodoListItem.From));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TodoListItem>> GetById(int id, CancellationToken ct)
    {
        var todoList = await _todoListService.GetByIdAsync(id, ct);
        return todoList is null ? NotFound() : Ok(TodoListItem.From(todoList));
    }

    [HttpPost]
    public async Task<ActionResult<TodoListItem>> Create([FromBody] CreateTodoListRequest request, CancellationToken ct)
    {
        var created = await _todoListService.CreateAsync(request.ToModel(), ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, TodoListItem.From(created));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<TodoListItem>> Update(int id, [FromBody] UpdateTodoListRequest request, CancellationToken ct)
    {
        var updated = await _todoListService.UpdateAsync(request.ToModel(id), ct);
        return updated is null ? NotFound() : Ok(TodoListItem.From(updated));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var deleted = await _todoListService.DeleteAsync(id, ct);
        return deleted ? NoContent() : NotFound();
    }
}
