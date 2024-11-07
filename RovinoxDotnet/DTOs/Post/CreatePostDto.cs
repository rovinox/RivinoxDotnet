using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Post
{
    public class CreatePostDto
    {
        public string Content { get; set; }
        public int CurriculumId { get; set; }
        public string? PostedById { get; set; }
    }
}