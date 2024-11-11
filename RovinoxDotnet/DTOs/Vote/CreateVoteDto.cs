using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Vote
{
    public class CreateVoteDto
    {
        
        public int[]? Upvoted { get; set; }
        public int[]? Downvoted { get; set; }
        [Required] 
         public int CurriculumId { get; set; }
        [Required] 
         public string VoteType { get; set; }
         [Required] 
         public int CommentId { get; set; }
         public string? VotedById { get; set; }
    }
}