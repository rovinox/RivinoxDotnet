using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.NotificationDto;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class NotificationRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager) : INotificationRepository
    {
        private readonly ApplicationDBContext _dbContext = dbContext;
        private readonly UserManager<AppUser> _userManager = userManager;
        public async Task<Notification> CreateAsync(CreateNotificationDto notificationDto)
        {
            var formattedNotificationData = notificationDto.FormatNotificationData();
            await _dbContext.Notifications.AddAsync(formattedNotificationData);
            await _dbContext.SaveChangesAsync();
            return formattedNotificationData;
        }

        public async Task<List<Notification>> GetAllAsync(string userId)
        {
            return await _dbContext.Notifications.Include(u => u.Sender).Include(u => u.Comment).Where(x => x.ReceiverId == userId).ToListAsync();
        }

        public Task<Notification> GetByIdAsync(int notificationId)
        {
            return _dbContext.Notifications.FirstOrDefaultAsync(x => x.Id == notificationId);
        }

        public async Task<Notification> MarkCompleted(int notificationId)
        {
            if (await _dbContext.Notifications.FindAsync(notificationId) is Notification found)
            {
                found.Completed = true;
                found.CompletedOn = DateTime.Now;
                await _dbContext.SaveChangesAsync();
                return found;
            }
            else
            {
                return null;
            }




        }
        public async Task<Notification> MarkAsSeenAsync(int notificationId)
        {
            if (await _dbContext.Notifications.FindAsync(notificationId) is Notification found)
            {
                found.Seen = true;
                
                await _dbContext.SaveChangesAsync();
                return found;
            }
            else
            {
                return null;
            }
        }
    }
}