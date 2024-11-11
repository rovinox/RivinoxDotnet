using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Comment;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface ICommentRepository
    {
           Task<Comment> CreateAsync(CerateCommentDto commentModel);     
           Task<Comment> AddScoreByOne(int commentId);     
           Task<Comment> DisableComment(int commentId);     
           Task<Comment> UpdateContent(UpdateDto updateDto);     
           Task<Comment> RemoveScoreByOne(int commentId);     
           Task <List<Comment>?> GetComments(int HomeWorkId);     
    }
}