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
        public List<Enrollment>? Enrollments { get; set; } 
        public List<Notification>? Receivers { get; set; } 
        public List<Notification>? Senders { get; set; } 
        public List<Payment>? Users { get; set; } 
        public List<Payment>? Approvers { get; set; } 
        public List<Payment>? CashReceivers { get; set; } 
        public decimal Balance { get; set; } 
        public bool Enabled { get; set; }
    }
}