using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public int Score { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        [ForeignKey("Curriculums")]
        public int CurriculumId { get; set; }
        public Curriculum Curriculum { get; set; }
        public string CreatedById { get; set; }
        public AppUser CreatedBy { get; set; }
        public bool Enabled { get; set; } = true;
         public string? ReplyingToId { get; set; }
        public AppUser ReplyingTo { get; set; }
        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public Comment Parent { get; set; }

        public List<Comment> Children { get; set; } 
        public Notification? Notification { get; set; }

    }
}