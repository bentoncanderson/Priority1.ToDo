using Priority1.ToDo.Core.Domain;

namespace Priority1.ToDo.Core.Services.Interfaces;

public interface ITodoService<T>
{
    Task<List<T>> GetAllAsync(CancellationToken ct = default);

    Task<T?> GetByIdAsync(int id, CancellationToken ct = default);

    Task<T> CreateAsync(T itemToCreate, CancellationToken ct = default);

    Task<T?> UpdateAsync(T itemToUpdate, CancellationToken ct = default);

    Task<bool> DeleteAsync(int id, CancellationToken ct = default);
}
