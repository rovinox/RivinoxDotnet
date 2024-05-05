using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.DTOs.Curriculum
{
    public class CurriculumDto
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Title { get; set; } = string.Empty;
        public int BatchId { get; set; }
    }
}