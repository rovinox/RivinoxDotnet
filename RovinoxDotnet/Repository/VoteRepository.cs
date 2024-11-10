using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Vote;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class VoteRepository(ApplicationDBContext dbContext) : IVoteRepository
    {
        private readonly ApplicationDBContext _dbContext = dbContext;

       
        public async Task<Vote> AddAsync(CreateVoteDto voteDto)
        {
              var formattedBatch = voteDto.FormatVoteData();
            await _dbContext.Votes.AddAsync(formattedBatch);
            await _dbContext.SaveChangesAsync();
            return formattedBatch;
        }

        public async Task<Vote> GetByCurriculumIdAsync(int curriculumId, string userId)
        {
            return await _dbContext.Votes.FirstOrDefaultAsync(e => e.CurriculumId == curriculumId && e.VotedById == userId);
        }

        public async Task<Vote> UpdateAsync(UpdateVoteDto updateVoteDto)
        {
             if (await _dbContext.Votes.FindAsync(updateVoteDto.Id) is Vote found)
            {
                if (updateVoteDto.Upvoted != null ){
                    found.Upvoted = updateVoteDto.Upvoted;
                }
                if (updateVoteDto.Downvoted != null ){
                    found.Downvoted = updateVoteDto.Downvoted;
                }

                await _dbContext.SaveChangesAsync();
                return found;
            }
            else
            {
                return null;
            }
        }

        
    }
}