using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Homework;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface IHomeworkRepository
    {
                public Task<HomeWork> CreateAsync(CreateHomeworkDto homeworkModel, string userId);
                public Task<HomeWork> GetHomeWorkByCurriculumId(int curriculumId, string userId);
    }
}