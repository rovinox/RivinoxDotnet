using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Payment;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public static class PaymentMapper
    {
        public static Payment FormatPaymentData(this CreatePaymentDto paymentDto){
            return new Payment {
                UserId = paymentDto.UserId,
                ApproverId = paymentDto.ApproverId,
                TransactionId = paymentDto.TransactionId,
                PaymentType = paymentDto.PaymentType,
                CashReceiverId = paymentDto.CashReceiverId,
                Amount = paymentDto.Amount
            };

        }
    }
}