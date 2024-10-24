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
            var userId = "cc0b19a6-90bc-4a39-959b-7826bdaeafc2";

            var result = await _notificationRepository.GetAllAsync(userId);
            List<NotificationDto> notifications = [];
            int notificationsWithNotSeenCount = 0;

            foreach (var notification in result)
            {
                notifications.Add(new NotificationDto
                {
                    Id = notification.Id,
                    SenderId = notification.SenderId,
                    ReceiverId = notification.ReceiverId,
                    Type = notification.Type,
                    Name = notification.Name,
                    Description = notification.Description,
                    Seen = notification.Seen,
                    Enabled = notification.Enabled,
                    PaymentId = (int)notification.PaymentId,
                    Sender = new AppUserDTO
                    {
                        FirstName = notification.Sender.FirstName,
                        LastName = notification.Sender.LastName,
                         Enabled = notification.Sender.Enabled,
                    }
                });
                if (!notification.Seen)
                {
                    notificationsWithNotSeenCount++;
                }
            }

            return Ok(new ResponseNotificationDto
            {
                Notifications = notifications,
                NotSeenCount = notificationsWithNotSeenCount
            });
        }
    }
}