using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Batch;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface IBatchRepository
    {
        Task<List<Batch>> GetAllAsync();

        Task<Batch?> GetByIdAsync(int id);
        Task<Batch> CreateAsync(CreateBatchDto batchModel);
        // Task<Comment?> UpdateAsync(int id, Comment commentDto); 
        // Task<Comment?> DeleteAsync(int id); 
    }
}