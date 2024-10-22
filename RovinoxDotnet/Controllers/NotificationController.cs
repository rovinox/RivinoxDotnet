using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.NotificationDto;
using RovinoxDotnet.Interfaces;

namespace RovinoxDotnet.Controllers
{
    [ApiController]
    [Route("api/notification")]
    public class NotificationController(INotificationRepository _notificationRepository, IAuthenticatedUserService _authenticatedUserService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateNotificationDto notificationDto)
        {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
             }
             
            var result  = await _notificationRepository.CreateAsync(notificationDto);
             return Ok(result);
        }
        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetAllAsync()
        {
             var userId = _authenticatedUserService.UserId;
             
            var result  = await _notificationRepository.GetAllAsync(userId);
            int notificationsWithNotSeenCount = 0;
            foreach (var notification in result){
                if (!notification.Seen){
                    notificationsWithNotSeenCount++;
                }
            }

             return Ok(new ResponseNotificationDto {
                Notifications = result,
                NotSeenCount = notificationsWithNotSeenCount
             });
        }
    }
}