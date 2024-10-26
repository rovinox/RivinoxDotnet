using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Account
{
    public class AppUserDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public decimal Balance { get; set; }
        public bool Enabled { get; set; }
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

    }
}