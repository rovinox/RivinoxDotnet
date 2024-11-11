using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Vote
{
    public class UpdateVoteDto
    {
        [Required]
        public int Id { get; set; }
        [Required] 
         public int CommentId { get; set; }
        [Required]
        public string VoteType { get; set; }
        public int[]? Upvoted { get; set; }
        public int[]? Downvoted { get; set; }

    }
}