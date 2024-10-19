using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string? Type { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public AppUser? Sender { get; set; }
        public string? SenderId { get; set; }
        public AppUser? Receiver { get; set; }
        public string? ReceiverId { get; set; }
        public bool Seen { get; set; }
        public bool Enabled { get; set; }
        public bool Completed { get; set; }
        public  DateTime CompletedOn { get; set; }
        public int PaymentId { get; set; }
        public Payment? Payment { get; set; }
    }
}