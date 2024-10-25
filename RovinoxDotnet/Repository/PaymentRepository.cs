using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Payment;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class PaymentRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager) : IPaymentRepository
    {
        private readonly ApplicationDBContext _dbContext = dbContext;
        private readonly UserManager<AppUser> _userManager = userManager;

        public Task<Payment> GetByIdAsync(int PaymentId)
        {
            return _dbContext.Payments.FirstOrDefaultAsync(x => x.Id == PaymentId);
        }

        public async Task<Payment> ProcessCashPaymentAsync(CreatePaymentDto paymentDto)

        {
            var formattedPaymentData = paymentDto.FormatPaymentData();
            await _dbContext.Payments.AddAsync(formattedPaymentData);
            await _dbContext.SaveChangesAsync();
            return formattedPaymentData;
        }

        public async Task<bool>  UpdateUserAfterPaymentAsync(string userId, decimal amount)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            decimal newAmount = user.Balance - amount;
            user.Balance = newAmount;
            var result = await _userManager.UpdateAsync(user);
             if (result.Succeeded){
                return true;
             } else {
                return false;
             }
        }

        
    }
}