using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Comment
{
    public class CerateCommentDto
    {
        [Required]
        public string Content { get; set; } = string.Empty;
        [Required]
        public int HomeWorkId { get; set; }



    }
}