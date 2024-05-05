using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Curriculum;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public static class CurriculumMapper
    {
         public static Curriculum FormatCurriculumCreateData(this CreateCurriculumDto curriculumDto){
            return new Curriculum
            {
                Order = curriculumDto.Order,
                Title =curriculumDto.Title,
                BatchId = curriculumDto.BatchId
            };
         }
    }
}