using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RovinoxDotnet.Models
{
    [Table("Notifications")]
    public class Notification
    {
        public int Id { get; set; }
        public string? Type { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? SenderId { get; set; }
        public virtual AppUser? Sender { get; set; }
        public string? ReceiverId { get; set; }
        public virtual AppUser? Receiver { get; set; }
        public bool Seen { get; set; } = false;
        public bool Enabled { get; set; } = true;
        public bool Completed { get; set; } = false;
        public DateTime CompletedOn { get; set; } = DateTime.Now;
        [ForeignKey("Payments")]
        public int? PaymentId { get; set; }
        public Payment? Payment { get; set; }
    }
}