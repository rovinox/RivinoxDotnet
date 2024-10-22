using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.NotificationDto;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class NotificationRepository(ApplicationDBContext dbContext) : INotificationRepository
    {
         private readonly ApplicationDBContext _dbContext = dbContext;
        public async Task<Notification> CreateAsync(CreateNotificationDto notificationDto)
        {
           var formattedNotificationData = notificationDto.FormatNotificationData();
            await _dbContext.Notifications.AddAsync(formattedNotificationData);
            await _dbContext.SaveChangesAsync();
            return formattedNotificationData;
        }

        public async Task<List<Notification>> GetAllAsync(string userId)
        {
           return await _dbContext.Notifications.Where(x => x.ReceiverId == userId).ToListAsync(); 
        }
    }
}