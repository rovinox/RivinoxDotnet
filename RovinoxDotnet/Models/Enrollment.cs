using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
    public class Enrollment
    {
        public int Id { get; set; }
        public string? FirstName { get; set;}
        public string? LastName { get; set;}
        public string? Course { get; set;}
        public string? UserId { get; set;}
        public AppUser? Users { get; set;}        
        [ForeignKey("Batches")]
        public int? BatchId { get; set;}
        public Batch? Batches { get; set;}



    }
}