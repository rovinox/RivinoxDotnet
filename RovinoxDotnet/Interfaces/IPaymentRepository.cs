using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Payment;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface IPaymentRepository
    {
        Task<Payment> ProcessCashPaymentAsync(CreatePaymentDto paymentDto);
    }
}