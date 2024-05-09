using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Homework;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;
using System.Security.Claims;
using RovinoxDotnet.Mappers;
using Microsoft.EntityFrameworkCore;

namespace RovinoxDotnet.Repository
{
    public class HomeworkRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager) : IHomeworkRepository
    {
        private readonly ApplicationDBContext _dbContext = dbContext;
        private readonly UserManager<AppUser> _userManager = userManager;


        public async Task<HomeWork> CreateAsync(CreateHomeworkDto homeworkModel, string userId)
        {
            var formattedHomework = homeworkModel.FormatHomeCreateData();
            formattedHomework.UserId = userId;
            await _dbContext.HomeWorks.AddAsync(formattedHomework);
            await _dbContext.SaveChangesAsync();
            return formattedHomework;
        }

        public async Task<HomeWork> GetHomeWorkByCurriculumId(int curriculumId, string userId)
        {
            //var homework = await _dbContext.HomeWorks.Select(h => h.CurriculumId == curriculumId && h.UserId == userId);
            var homework =  await _dbContext.HomeWorks.Include(h=>h.Curriculum).FirstOrDefaultAsync(c=>c.CurriculumId == curriculumId && c.UserId == userId);
            return homework;
        }
    }
}