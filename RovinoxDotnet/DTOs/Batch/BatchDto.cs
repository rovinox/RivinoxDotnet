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
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public bool Enabled { get; set; } = true;
    }
}