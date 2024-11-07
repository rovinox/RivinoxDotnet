using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Post;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class PostRepository(ApplicationDBContext dbContext) : IPostRepository
        {
             private readonly ApplicationDBContext _dbContext = dbContext;
        public async Task<Post> AddAsync(CreatePostDto postDto)
        {
            var formattedData = postDto.FormatPostData();
            
            await _dbContext.Posts.AddAsync(formattedData);
            await _dbContext.SaveChangesAsync();
            return formattedData;
        }

        public async Task<List<Post>> GetAllAsync(int curriculumId)
        {
            return await _dbContext.Posts
                .Include(p => p.PostedBy)
                .Include(p => p.Repliers).Where(p => p.CurriculumId == curriculumId)
                .ToListAsync();
        }

    }
}