using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
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
    public class EnrollmentRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager, IBatchRepository batchRepository, IHttpContextAccessor httpContextAccessor, IAuthenticatedUserService authenticatedUserService) : IEnrollmentRepository
    {
         private readonly ApplicationDBContext _dbContext = dbContext;
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly IBatchRepository _batchRepository = batchRepository;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IAuthenticatedUserService _authenticatedUserService = authenticatedUserService;

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
    

        public async Task<List<Enrollment>> GetAllAsync()

        {
               //   var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);

        //     var userEmail =  _userManager.FindFirstValue(ClaimTypes.Email); // will give the user's Email
        //     var user = _httpContextAccessor.HttpContext?.User;
        //    var userId =   _httpContextAccessor.HttpContext.User.FindFirstValue("userId");
        //    var email =   _httpContextAccessor.HttpContext.User.FindFirstValue("Email");
          // var user =  await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

           //var result = await _dbContext.Enrollments.Include( a =>a.UserId).ToArrayAsync();
         //  string userId =  "759eb736-715c-44ba-92aa-1656c35e8dd2";
         var userId  = _authenticatedUserService.UserId;
         //TODO need to only return data for login users
           
            return await _dbContext.Enrollments.Where(x => x.UserId == userId).ToListAsync();
         
               // return result;
           // var  user =  await _userManager.GetUserAsync(HttpContext.User.FindFirstValue("userId"));
            
        }
    }
}