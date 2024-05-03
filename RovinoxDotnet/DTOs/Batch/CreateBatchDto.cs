using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Batch
{
    public class CreateBatchDto
    {
        [Required]
        public string Course { get; set; } = string.Empty;
        [Required]
        public decimal Cost { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public bool Enabled { get; set; } = true;
    }
}