using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Comment
{
    public class UpdateDto
    {

        public string? Content { get; set; }
        [Required]
        public int Id { get; set; }
    }
}