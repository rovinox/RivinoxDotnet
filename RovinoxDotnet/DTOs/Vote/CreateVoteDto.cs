using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Vote
{
    public class CreateVoteDto
    {
        
        public int[]? PostUpvoted { get; set; }
        public int[]? PostDownvoted { get; set; }
        public int[]? ReplayUpvoted { get; set; }
        public int[]? ReplayDownvoted { get; set; }
        [Required] 
         public int CurriculumId { get; set; }
         public string? VotedById { get; set; }
    }
}