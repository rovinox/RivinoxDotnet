using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Replier;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class ReplierRepository(ApplicationDBContext dbContext) : IReplierRepository
    {
         private readonly ApplicationDBContext _dbContext = dbContext;
        public async Task<Replier> AddAsync(CreateReplierDto replierDto)
        {
             var formattedData = replierDto.FormatReplierData();
            
            await _dbContext.Repliers.AddAsync(formattedData);
            await _dbContext.SaveChangesAsync();
            return formattedData;
        }
    }
}