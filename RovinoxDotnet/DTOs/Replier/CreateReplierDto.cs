using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Replier
{
    public class CreateReplierDto
    {
        public string Content { get; set; } 
        public int PostId { get; set; }
        public string? CreatedById { get; set; }
        public string ReplyingToId { get; set; }
    }
}