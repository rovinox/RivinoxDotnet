using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.NotificationDto;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface INotificationRepository
    {
        Task<Notification> CreateAsync(CreateNotificationDto notificationDto);
    }
}