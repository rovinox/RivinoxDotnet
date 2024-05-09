using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Homework;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public static class HomeworkMapper
    {
        public static HomeWork FormatHomeCreateData(this CreateHomeworkDto homeworkDto)
        {
            return new HomeWork
            {
                Link = homeworkDto.Link,
                CurriculumId = homeworkDto.CurriculumId
            };
        }
    }
}