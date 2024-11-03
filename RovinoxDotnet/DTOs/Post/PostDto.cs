using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Account;
using RovinoxDotnet.DTOs.Replier;

namespace RovinoxDotnet.DTOs.Post
{
    public class PostDto
    {
         public int Id { get; set; }
        public int Score { get; set; }
        public string Content { get; set; } 
        public DateTime CreatedOn { get; set; } 
        public int CurriculumId { get; set; }
        public string PostedById { get; set; }
        public AppUserDTO PostedBy { get; set; }
        public List<ReplierDto> Repliers { get; set; } 
        public bool Enabled { get; set; }
    }
}