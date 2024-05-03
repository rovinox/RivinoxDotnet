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


namespace RovinoxDotnet.Repository
{
    public class BatchRepository : IBatchRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public BatchRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        // public async Task<Batch> CreateAsync(Batch batchModel)
        // {
        //     await _dbContext.Batches.AddAsync(batchModel);
        //    await _dbContext.SaveChangesAsync();
        //    return batchModel;
        // }

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