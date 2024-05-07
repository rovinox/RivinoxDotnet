using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
    [Table("Batches")]
    public class Batch
    {
        public int Id { get; set; }
        public string Course { get; set; } = string.Empty;
        public decimal Cost { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public bool Enabled { get; set; } = true;
        public List<Enrollment>? Enrollment { get; set; } 
        public List<Curriculum>? Curriculum { get; set; } 
    }

}