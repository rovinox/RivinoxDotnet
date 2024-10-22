using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.Account;
using RovinoxDotnet.DTOs.NotificationDto;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Controllers
{
    [ApiController]
    [Route("api/notification")]
    public class NotificationController(INotificationRepository _notificationRepository, IAuthenticatedUserService _authenticatedUserService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateNotificationDto notificationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _notificationRepository.CreateAsync(notificationDto);
            return Ok(result);
        }
        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetAllAsync()
        {
            // var userId = _authenticatedUserService.UserId;
            var userId = "25eb8ff1-ceb3-417d-a82f-5de587bc6e29";

            var result = await _notificationRepository.GetAllAsync(userId);
            List<Notification> Notifications = [];
            int notificationsWithNotSeenCount = 0;

            foreach (var notification in result)
            {
                Notifications.Add(new Notification
                {
                    Id = notification.Id,
                    SenderId = notification.SenderId,
                    ReceiverId = notification.ReceiverId,
                    Type = notification.Type,
                    Name = notification.Name,
                    Description = notification.Description,
                    Seen = notification.Seen,
                    Enabled = notification.Enabled,
                    PaymentId = notification.PaymentId,
                    Sender = new AppUser
                    {
                        FirstName = notification.Sender.FirstName,
                        LastName = notification.Sender.LastName
                    }
                });
                if (!notification.Seen)
                {
                    notificationsWithNotSeenCount++;
                }
            }

            return Ok(new ResponseNotificationDto
            {
                Notifications = Notifications,
                NotSeenCount = notificationsWithNotSeenCount
            });
        }
    }
}