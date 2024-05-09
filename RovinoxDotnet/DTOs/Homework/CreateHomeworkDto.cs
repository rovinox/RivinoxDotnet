using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Homework
{
    public class CreateHomeworkDto
    {
        [Required]
        public string Link { get; set; } = string.Empty;
        [Required]
        public int CurriculumId { get; set; }
    }
}