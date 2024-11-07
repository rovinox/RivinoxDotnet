using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
      [Table("Votes")]
    public class Vote
    {

        public int Id { get; set; }
        public int[] PostUpvoted { get; set; }
        public int[] PostDownvoted { get; set; }
        public int[] ReplayUpvoted { get; set; }
        public int[] ReplayDownvoted { get; set; }
        [ForeignKey("Curriculums")]
         public int CurriculumId { get; set; }
        public Curriculum Curriculum { get; set; }
         public string VotedById { get; set; }
        public AppUser VotedBy { get; set; }
    }
}