using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
     [Table("Curriculums")]
    public class Curriculum
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Title { get; set; } = string.Empty;
        [ForeignKey("Batches")]
        public int BatchId { get; set; }
        public Batch? Batch { get; set; }

    }
}