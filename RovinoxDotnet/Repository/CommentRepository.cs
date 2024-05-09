using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Comment;
using RovinoxDotnet.DTOs.Homework;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class CommentRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager) : ICommentRepository
    {
            private readonly ApplicationDBContext _dbContext = dbContext;
        private readonly UserManager<AppUser> _userManager = userManager;
        

        public async Task<Comment> CreateAsync(CerateCommentDto commentModel, string userId, string createdBy)
        {
            var formattedComment = commentModel.FormatCommentCreateData();
            formattedComment.UserId = userId;
            formattedComment.CreatedBy = createdBy;
            await _dbContext.Comments.AddAsync(formattedComment);
            await _dbContext.SaveChangesAsync();
            return formattedComment;
        }

        public async Task<List<Comment>>? GetComments(int HomeWorkId)
        {
              return await _dbContext.Comments.Where(c => c.HomeWorkId == HomeWorkId).ToListAsync();
        }
    }
}