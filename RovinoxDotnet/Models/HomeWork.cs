using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
     [Table("HomeWorks")]
   
    public class HomeWork
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string? Link { get; set;}
        public string? IsGraded { get; set;}
        public string? UserId { get; set;}
        public AppUser? User { get; set;} 
        [ForeignKey("Curriculums")]   
        public int CurriculumId { get; set;}
        public  Curriculum? Curriculum { get; set;}     
        public  List<Comment>? Comments { get; set;}     
    }
}