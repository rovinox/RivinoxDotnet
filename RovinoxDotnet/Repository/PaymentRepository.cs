using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Payment;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class PaymentRepository(ApplicationDBContext dbContext) : IPaymentRepository
    {
        private readonly ApplicationDBContext _dbContext = dbContext;
        public async Task<Payment> ProcessCashPaymentAsync(CreatePaymentDto paymentDto)

        {
            var formattedPaymentData = paymentDto.FormatPaymentData();
            await _dbContext.Payments.AddAsync(formattedPaymentData);
            await _dbContext.SaveChangesAsync();
            return formattedPaymentData;
        }


    }
}