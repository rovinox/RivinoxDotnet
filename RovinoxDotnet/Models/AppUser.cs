using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace RovinoxDotnet.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public List<Enrollment>? Enrollment { get; set; } 
        public decimal Balance { get; set; } 
        public bool Enabled { get; set; }
    }
}