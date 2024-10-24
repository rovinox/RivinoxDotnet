using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.NotificationDto
{
    public class CreateNotificationDto
    {

        public int? PaymentId { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description  { get; set; }

    }
}