using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.NotificationDto;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public  static class NotificationMapper
    {
        public static Notification FormatNotificationData(this CreateNotificationDto notificationDto){
            return new Notification {
                SenderId = notificationDto.SenderId,
                ReceiverId = notificationDto.ReceiverId,
                Type = notificationDto.Type,
                Name = notificationDto.Name,
                Description = notificationDto.Description,
                PaymentId = notificationDto.PaymentId,
                Seen = false,
                Completed = false,
                CreatedOn = DateTime.Now
            };

        }
    }
}