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
    public class BatchRepository : IBatchRepository
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly UserManager<AppUser> _userManager;
        public BatchRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;

        }

        public async Task<List<Batch>> AssassinOrNewBatchAsync(string userId, int batchId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            int[] batchIds = [batchId];
            for (int i = 0; i < user.Batches.Length; i++)
            {
                _ = batchIds.Append(user.Batches[i]);
            }
            user.Batches = batchIds;
            await _userManager.UpdateAsync(user);


            return await _dbContext.Batches.Select(x => x).ToListAsync();
        }
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
    }
}