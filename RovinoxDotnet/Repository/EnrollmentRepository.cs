using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Enrollment;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class EnrollmentRepository : IEnrollmentRepository
    {
         private readonly ApplicationDBContext _dbContext;
        private readonly UserManager<AppUser> _userManager;
            private readonly IBatchRepository _batchRepository;
        public EnrollmentRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager, IBatchRepository batchRepository)
        {
             _dbContext = dbContext;
             _userManager = userManager;
             _batchRepository = batchRepository;
        }

        public async Task<Enrollment> CreateAsync(CreateEnrollmentDto enrollmentModel)
        {
            var formattedEnrollment = enrollmentModel.FormatEnrollmentCreateData();
            await _dbContext.Enrollments.AddAsync(formattedEnrollment);
            await _dbContext.SaveChangesAsync();
            return formattedEnrollment;
        }

        public async Task<bool> UpdateBalance(string userId, int batchId)
        {
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
        var batch = await _batchRepository.GetByIdAsync(batchId);
            decimal newBalance = user.Balance + batch.Cost;
            user.Balance = newBalance;
           var result = await _userManager.UpdateAsync(user);
           
            if(result.Succeeded){
                 return true;
            } else {
                return false;
            }
        }
        public async Task<Enrollment> CheckIfAlreadyEnrolled(string userId, int batchId)
        {
        var result = await _dbContext.Enrollments.FirstOrDefaultAsync(x => x.UserId == userId && x.BatchId == batchId);
            if(result == null ){
                 return null;
            } else {
                return result;
            }
        }
    }
}