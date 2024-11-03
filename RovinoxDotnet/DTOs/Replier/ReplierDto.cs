using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Account;

namespace RovinoxDotnet.DTOs.Replier
{
    public class ReplierDto
    {
         public int Id { get; set; }
        public int Score { get; set; }
        public string Content { get; set; } 
        public DateTime CreatedOn { get; set; }
        public int PostId { get; set; }
        public string CreatedById { get; set; }
        public AppUserDTO CreatedBy { get; set; }
        public string ReplyingToId { get; set; }
        public AppUserDTO ReplyingTo { get; set; }
        public bool Enabled { get; set; } 
    }
}