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
        public DateTime CreatedOn { get; set; } = DateTime.Now;
         [ForeignKey("HomeWorks")]
        public int HomeWorkId { get; set; }
        public HomeWork HomeWork { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public string CreatedBy { get; set; } = string.Empty; 
          
    }
}