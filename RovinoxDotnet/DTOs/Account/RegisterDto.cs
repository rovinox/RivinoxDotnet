using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Account
{
    public class RegisterDto
    {
        
       // public string? Username { get; set; } 
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string FirstName { get; set; }= string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        public string? UserName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        [Required]
        public int BatchId { get; set; }
    }
}