using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
     [Table("Posts")]
    public class Post
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
         [ForeignKey("Curriculums")]
        public int CurriculumId { get; set; }
        public Curriculum Curriculum { get; set; }
        public string PostedById { get; set; }
        public AppUser PostedBy { get; set; }
        public List<Replier> Repliers { get; set; } 
        public bool Enabled { get; set; } = true;
    }
}