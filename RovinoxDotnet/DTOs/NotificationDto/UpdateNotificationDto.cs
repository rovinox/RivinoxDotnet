using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.NotificationDto
{
    public class UpdateNotificationByPaymentIdDto
    {
            [Required]
        public int PaymentId { get; set; }
           [Required]
        public string Type { get; set; }

    }
}