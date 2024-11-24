using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.common;
using RovinoxDotnet.DTOs.NotificationDto;
using RovinoxDotnet.DTOs.Payment;
using RovinoxDotnet.Interfaces;

namespace RovinoxDotnet.Controllers
{
    [ApiController]
    [Route("api/payment")]
    public class PaymentController(IPaymentRepository _paymentRepository, IAuthenticatedUserService _authenticatedUserService, INotificationRepository _notificationRepository) : ControllerBase
    {

        [HttpPost("process")]
        public async Task<IActionResult> Create([FromBody] CreatePaymentDto paymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var userId = _authenticatedUserService.UserId;
                paymentDto.UserId = userId;
                if (!string.IsNullOrWhiteSpace(paymentDto.CashReceiverId))
                {
                    var payment = await _paymentRepository.ProcessCashPaymentAsync(paymentDto);
                    var notificationDto = new CreateNotificationDto
                    {   Type = PaymentNotificationType.CashPayment,
                        SenderId = payment.UserId,
                        ReceiverId = payment.CashReceiverId,
                        Name = PaymentNotificationType.CashPayment,
                        Description = PaymentNotificationType.CashPaymentDescription,
                        PaymentId = payment.Id
                    };
                    var notification = await _notificationRepository.CreateAsync(notificationDto);

                    return Ok(new { Payment = payment, Notification = notification });
                }
                else
                {
                    //handle Card payment
                    return Ok(new { message = "Cash payment has been updated successfully" });
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

        }
         [HttpGet("paymentHistory")]
        public async Task<IActionResult> GetPaymentHistory(){
              var userId = _authenticatedUserService.UserId;
                var payment = await _paymentRepository.GetPaymentHistoryByIdAsync(userId);
                return Ok(payment);

        }

    }
}