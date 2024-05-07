using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Enrollment
{
    public class EnrollmentDto
    {
         public string? FirstName { get; set;}
        public string? LastName { get; set;}
        public string? Course { get; set;}
        public string? UserId { get; set;}
        public int? BatchId { get; set;}
    }
}