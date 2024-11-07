using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Vote;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface IVoteRepository
    {
       // Task<IEnumerable<Vote>> GetAllAsync();
        Task<Vote> GetByCurriculumIdAsync(int curriculumId, string userId);
        Task<Vote> AddAsync(CreateVoteDto voteDto);
       Task<Vote> UpdateAsync(UpdateVoteDto updateVoteDto);
       // Task<bool> SaveChangesAsync();
    }
}
