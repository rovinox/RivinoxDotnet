using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Batch
{
    public class BatchDto
    {
        public int Id { get; set; }
        public string Course { get; set; } = string.Empty;
        public decimal Cost { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string[]? DaysOfTheWeek { get; set; }
        public bool Enabled { get; set; }
    }
}