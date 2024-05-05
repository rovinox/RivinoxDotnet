using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Curriculum
{
    public class CreateCurriculumDto
    {
        [Required]
        public int Order { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public int BatchId { get; set; }
    }
}