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
        public string StartTime { get; set; }  = string.Empty;
        public string EndTime { get; set; }  = string.Empty;  
        public string[]? DaysOfTheWeek { get; set; }    
    }
}