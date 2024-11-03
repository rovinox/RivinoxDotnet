using RovinoxDotnet.DTOs.Replier;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface IReplierRepository
    {
       // Task<List<Replier>> GetAllAsync(int curriculumId);
        //Task<Replier> GetByIdAsync(int id);
        Task<Replier> AddAsync(CreateReplierDto replierDto);
       // Task UpdateAsync(Replier Replier);
       // Task<bool> SaveChangesAsync();
    }
}