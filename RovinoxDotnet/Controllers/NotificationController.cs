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
                if (updateNotificationByPaymentIdDto.Type.Equals(NotificationType.ApprovedPayment))
                {


                    var updatedNT = await _notificationRepository.MarkCompleted(notificationId);
                    var payment = await _paymentRepository.GetByIdAsync(updateNotificationByPaymentIdDto.PaymentId);


                    if (updatedNT != null)
                    {


                        var isBalanceUpdated = await _paymentRepository.UpdateUserAfterPaymentAsync(updatedNT.SenderId, payment.Amount);
                        if (isBalanceUpdated)
                        {

                            var notificationDto = new CreateNotificationDto
                            {
                                Type = NotificationType.ApprovedPayment,
                                SenderId = updatedNT.ReceiverId,
                                ReceiverId = updatedNT.SenderId,
                                Name = NotificationType.ApprovedPaymentName,
                                Description = NotificationType.ApprovedPaymentDescription,
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
            var userId = _authenticatedUserService.UserId;
            //var userId = "cc0b19a6-90bc-4a39-959b-7826bdaeafc2";
        //   if (String.IsNullOrEmpty(userId)) {
        //     return StatusCode(401);
        //     }

            var result = await _notificationRepository.GetAllAsync(userId);
            List<NotificationDto> notifications = [];
            int notificationsWithNotSeenCount = 0;

            foreach (var  notification in result)
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
                    PaymentId = notification.PaymentId,
                    Sender = new AppUserDTO {
                    FirstName =  notification.Sender.FirstName,
                    LastName = notification.Sender.LastName,
                    Image = notification.Sender.Image
                    },
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