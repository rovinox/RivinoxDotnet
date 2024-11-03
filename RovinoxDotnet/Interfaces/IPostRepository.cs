using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Post;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface IPostRepository
    {
        Task<List<Post>> GetAllAsync(int curriculumId);
        //Task<Post> GetByIdAsync(int id);
        Task<Post> AddAsync(CreatePostDto postDto);
       // Task UpdateAsync(Post post);
       // Task<bool> SaveChangesAsync();
    }
}