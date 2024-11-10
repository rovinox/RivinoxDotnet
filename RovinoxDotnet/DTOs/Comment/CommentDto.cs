using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Account;

namespace RovinoxDotnet.DTOs.Comment
{
    public class CommentDto
    {
         public string Content { get; set; }  
        public int CurriculumId { get; set; }
        public int Id { get; set; }
        public string? CreatedById { get; set; }
        public string? ReplyingToId { get; set; }
        public int? ParentId { get; set; }
        public int Score { get; set; }
       public DateTime CreatedOn { get; set; }
        public CommentDto Parent { get; set; }
       public List<CommentDto> Children { get; set; }
          public AppUserDTO ReplyingTo { get; set; }
          public AppUserDTO CreatedBy { get; set; }
           public bool Enabled { get; set; }
    }
}