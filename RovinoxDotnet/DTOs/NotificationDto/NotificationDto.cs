using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Account;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.DTOs.NotificationDto
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public int PaymentId { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description  { get; set; }
        public string SenderFirstName { get; set; }
        public string SenderLastName { get; set; }
        public bool Seen { get; set; }

        
    }
}