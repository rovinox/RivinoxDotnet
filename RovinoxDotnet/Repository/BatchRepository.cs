using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Batch;
using RovinoxDotnet.Mappers;
using Microsoft.AspNetCore.Identity;


namespace RovinoxDotnet.Repository
{
    public class BatchRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager) : IBatchRepository
    {
        private readonly ApplicationDBContext _dbContext = dbContext;
        private readonly UserManager<AppUser> _userManager = userManager;

        public async Task<Batch> CreateAsync(CreateBatchDto batchModel)
        {

            var formattedBatch = batchModel.FormatBatchCreateData();
            await _dbContext.Batches.AddAsync(formattedBatch);
            await _dbContext.SaveChangesAsync();
            return formattedBatch;
        }


        public async Task<List<Batch>> GetAllAsync()
        {
            return await _dbContext.Batches.Select(x => x).ToListAsync();
            // return await _dbContext.Batches.ToListAsync();
        }
       

        public Task<Batch?> GetByIdAsync(int id)
        {
          return _dbContext.Batches.FirstOrDefaultAsync(x=>x.Id == id);
        }
    }
}