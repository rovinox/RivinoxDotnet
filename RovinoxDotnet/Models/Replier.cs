using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
      [Table("Repliers")]
    public class Replier
    {
        
        public int Id { get; set; }
        public int Score { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
         [ForeignKey("Posts")]
        public int PostId { get; set; }
        public Post Post { get; set; }
        public string CreatedById { get; set; }
        public AppUser CreatedBy { get; set; }
        public string ReplyingToId { get; set; }
        public AppUser ReplyingTo { get; set; }
        public bool Enabled { get; set; } = true;
    }
}