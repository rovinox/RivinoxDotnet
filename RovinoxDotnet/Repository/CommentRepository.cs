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

        public async Task<Comment> CreateAsync(CerateCommentDto commentModel)
        {
            var formattedComment = commentModel.FormatCommentCreateData();
            await _dbContext.Comments.AddAsync(formattedComment);
            await _dbContext.SaveChangesAsync();
            return formattedComment;
        }

        public async Task<List<Comment>> GetComments(int curriculumId)
        {

            // var comments = from comment in _dbContext.Comments where comment.ParentId == null select new Comment{
            //     Children = (List<Comment>)(from children in comment.Children where children.ParentId == comment.Id select new Comment{

            //     })
            // };

            return await _dbContext.Comments.Include(p => p.CreatedBy).Include(p => p.Children).Include(p => p.Parent).Include(p => p.ReplyingTo).Where(p => p.CurriculumId == curriculumId && p.Enabled).OrderBy(o => o.CreatedOn).ToListAsync();
        }

        public async Task<Comment> RemoveScoreByOne(int commentId)
        {
            if (await _dbContext.Comments.FindAsync(commentId) is Comment found)
            {
               found.Score--;

                await _dbContext.SaveChangesAsync();
                return found;
            }
            else
            {
                return null;
            }
        }
        public async Task<Comment> AddScoreByOne(int commentId)
        {
           if (await _dbContext.Comments.FindAsync(commentId) is Comment found)
            {
               found.Score++;

                await _dbContext.SaveChangesAsync();
                return found;
            }
            else
            {
                return null;
            }
        }
        public async Task<Comment> UpdateContent(UpdateDto updateDto)
        {
           if (await _dbContext.Comments.FindAsync(updateDto.Id) is Comment found)
            {
               found.Content = updateDto.Content;
               found.UpdatedOn = DateTime.Now;

                await _dbContext.SaveChangesAsync();
                return found;
            }
            else
            {
                return null;
            }
        }
        public async Task<Comment> DisableComment(int commentId)
        {
           if (await _dbContext.Comments.FindAsync(commentId) is Comment found)
            {
               found.Enabled = false;
               

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