using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Account
{
    public class NewUserDto
    {
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string Roles { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public bool Enabled { get; set; }

    }
}