using Microsoft.EntityFrameworkCore;
using Priority1.ToDo.Core.Services.Interfaces;
using Priority1.ToDo.Core.Data;
using Priority1.ToDo.Core.Domain;

namespace Priority1.ToDo.Core.Services;

public class TodoListService : ITodoService<TodoList>
{
    private readonly AppDbContext _context;

    public TodoListService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TodoList>> GetAllAsync(CancellationToken ct = default)
    {
        return await _context.TodoLists.ToListAsync(ct);
    }

    public async Task<TodoList?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        return await _context.TodoLists.FirstOrDefaultAsync(t => t.Id == id, ct);
    }

    public async Task<TodoList> CreateAsync(TodoList itemToCreate, CancellationToken ct = default)
    {
        _context.TodoLists.Add(itemToCreate);
        await _context.SaveChangesAsync(ct);
        return itemToCreate;
    }

    public async Task<TodoList?> UpdateAsync(TodoList itemToUpdate, CancellationToken ct = default)
    {
        var todoList = await _context.TodoLists.FirstOrDefaultAsync(t => t.Id == itemToUpdate.Id, ct);
        if (todoList is null)
        {
            return null;
        }

        todoList.Title = itemToUpdate.Title;

        await _context.SaveChangesAsync(ct);
        return todoList;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken ct = default)
    {
        var todoList = await _context.TodoLists.FirstOrDefaultAsync(t => t.Id == id, ct);
        if (todoList is null)
        {
            return false;
        }

        var todosInList = await _context.Todos.Where(t => t.TodoListId == todoList.Id).ToListAsync();
        _context.Todos.RemoveRange(todosInList);

        _context.TodoLists.Remove(todoList);
        await _context.SaveChangesAsync(ct);
        return true;
    }
}
