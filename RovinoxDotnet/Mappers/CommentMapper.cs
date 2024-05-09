using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Comment;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public static class CommentMapper
    {
        public static Comment FormatCommentCreateData(this CerateCommentDto cerateCommentDto){
            return new Comment{
                Content = cerateCommentDto.Content,
                HomeWorkId = cerateCommentDto.HomeWorkId,
            };
        }
    }
}