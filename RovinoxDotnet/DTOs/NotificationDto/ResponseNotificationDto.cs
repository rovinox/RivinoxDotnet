using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.DTOs.NotificationDto
{
    public class ResponseNotificationDto
    {
        public  List<NotificationDto> Notifications { get; set; }
         public int NotSeenCount { get; set; }
    }
}