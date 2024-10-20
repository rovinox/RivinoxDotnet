using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Account
{
    public class UpdateUserDto
    {
                public int? BatchId { get; set; }
                [Required]
                public string UserId { get; set; }  = string.Empty;
                public string? RoleId { get; set; } 
                public string? Role { get; set; } = string.Empty;
                public bool? Enabled { get; set; }
    }
}