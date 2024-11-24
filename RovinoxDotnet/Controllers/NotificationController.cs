using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.common;
using RovinoxDotnet.DTOs.Account;
using RovinoxDotnet.DTOs.Comment;
using RovinoxDotnet.DTOs.NotificationDto;
using RovinoxDotnet.DTOs.Payment;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Controllers
{
    [ApiController]
    [Route("api/notification")]
    public class NotificationController(UserManager<AppUser> _userManager,INotificationRepository _notificationRepository, IAuthenticatedUserService _authenticatedUserService, IPaymentRepository _paymentRepository) : ControllerBase
    {
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> CreateAsync([FromBody] CreateNotificationDto notificationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _notificationRepository.CreateAsync(notificationDto);
            return Ok(result);
        }
        [HttpGet("notificationId/{notificationId:int}")]
        //[Authorize]
        public async Task<IActionResult> GetById([FromRoute] int notificationId, [FromQuery] bool markAsSeen )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(markAsSeen){
                  var notification = await _notificationRepository.MarkAsSeenAsync(notificationId);
                  var sender = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == notification.SenderId);
                 var payment = await _paymentRepository.GetByIdAsync((int)notification.PaymentId);

                    var limitSender = new  {
                        FirstName =  notification.Sender.FirstName,
                        LastName = notification.Sender.LastName,
                    };
                    var limitNt = new  {
                       Completed = notification.Completed,
                       CompletedOn = notification.CompletedOn,
                       CreatedOn = notification.CreatedOn,
                       Description = notification.Description,
                    Id = notification.Id,
                    SenderId = notification.SenderId,
                    ReceiverId = notification.ReceiverId,
                    Type = notification.Type,
                    Name = notification.Name,
                    Seen = notification.Seen,
                    };
                    var limitPay = new  {
                        Amount = payment.Amount,
                        Id = payment.Id,
                        PaymentType = payment.PaymentType,
                        ProcessDate = payment.ProcessDate
                    };
                    var result = new {
                        Payment = limitPay,
                        Notification = limitNt,
                        Sender = limitSender,
                        

                    };
      

                          return Ok(result);
            } else{
                   var notification = await _notificationRepository.GetByIdAsync(notificationId);
                     var sender = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == notification.SenderId);
                 var payment = await _paymentRepository.GetByIdAsync((int)notification.PaymentId);

                                        var limitSender = new  {
                        FirstName =  notification.Sender.FirstName,
                        LastName = notification.Sender.LastName,
                    };
                    var limitNt = new  {
                       Completed = notification.Completed,
                       CompletedOn = notification.CompletedOn,
                       CreatedOn = notification.CreatedOn,
                       Description = notification.Description,
                    Id = notification.Id,
                    SenderId = notification.SenderId,
                    ReceiverId = notification.ReceiverId,
                    Type = notification.Type,
                    Name = notification.Name,
                    Seen = notification.Seen,
                    };
                    var limitPay = new  {
                        Amount = payment.Amount,
                        Id = payment.Id,
                        PaymentType = payment.PaymentType,
                        ProcessDate = payment.ProcessDate
                    };
                    var result = new {
                        Payment = limitPay,
                        Notification = limitNt,
                        Sender = limitSender,
                        

                    };
      

                          return Ok(result);
        
            }

        
        }
        [HttpPost("payment/notificationId/{notificationId:int}")]
        //[Authorize]
        public async Task<IActionResult> UpdateAndCreateAsync([FromRoute] int notificationId, [FromBody] UpdateNotificationByPaymentIdDto updateNotificationByPaymentIdDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (updateNotificationByPaymentIdDto.Type.Equals(PaymentNotificationType.ApprovedPayment))
                {


                    var updatedNT = await _notificationRepository.MarkCompleted(notificationId);
                    var payment = await _paymentRepository.MarkAsCompleted(updateNotificationByPaymentIdDto.PaymentId);


                    if (updatedNT != null)
                    {


                        var isBalanceUpdated = await _paymentRepository.UpdateUserAfterPaymentAsync(updatedNT.SenderId, payment.Amount);
                        if (isBalanceUpdated)
                        {

                            var notificationDto = new CreateNotificationDto
                            {
                                Type = PaymentNotificationType.ApprovedPayment,
                                SenderId = updatedNT.ReceiverId,
                                ReceiverId = updatedNT.SenderId,
                                Name = PaymentNotificationType.ApprovedPaymentName,
                                Description = PaymentNotificationType.ApprovedPaymentDescription,
                                PaymentId = payment.Id,
                            };

                            var newNT = await _notificationRepository.CreateAsync(notificationDto);

                            return Ok(new {message= "Updated successfully"});
                        }
                        else
                        {
                            return NotFound();
                        }

                    }
                    else
                    {
                        return NotFound();
                    }

                }
                else
                {
                    return StatusCode(400, "Invalid payment type");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }


        }
        [HttpGet]
        [Authorize]
      public async Task<IActionResult> GetAllAsync()
{
    // Retrieve the authenticated user's ID
    var userId = _authenticatedUserService.UserId;

    // Check if the user ID is null or empty
    if (string.IsNullOrEmpty(userId))
    {
        return StatusCode(401, "Unauthorized access. User ID is required.");
    }

    // Fetch notifications from the repository
    var result = await _notificationRepository.GetAllAsync(userId);

    // Map notifications to DTOs and count unseen notifications
    var notifications = result.Select(notification => new NotificationDto
    {
        Id = notification.Id,
        SenderId = notification.SenderId,
        ReceiverId = notification.ReceiverId,
        Type = notification.Type,
        Name = notification.Name,
        Description = notification.Description,
        Seen = notification.Seen,
        PaymentId = notification?.PaymentId,
        CurriculumId = notification?.Comment?.CurriculumId != null 
            ? notification.Comment.CurriculumId : 0,// Handle nullable Comment
        Sender = notification.Sender != null 
            ? new AppUserDTO
            {
                FirstName = notification.Sender.FirstName,
                LastName = notification.Sender.LastName,
                Image = notification.Sender.Image
            }
            : null
    }).ToList();

    var notificationsWithNotSeenCount = notifications.Count(n => !n.Seen);

    // Return the result as an object
    return Ok(new
    {
        Notifications = notifications,
        NotSeenCount = notificationsWithNotSeenCount
    });
}

    }
}