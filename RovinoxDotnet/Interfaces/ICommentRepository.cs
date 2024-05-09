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
           Task<Comment> CreateAsync(CerateCommentDto commentModel, string userId, string createdBy);     
           Task <List<Comment>?> GetComments(int HomeWorkId);     
    }
}