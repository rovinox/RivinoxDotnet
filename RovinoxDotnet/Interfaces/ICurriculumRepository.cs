using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Curriculum;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface ICurriculumRepository
    {
         // Task<List<Curriculum>> GetAllAsync();

        Task<List<Curriculum>> GetAllByBatchIdAsync(int id);
       // Task<List<Curriculum>> CreateFromExcelByBatchIdAsync(int batchId, IFormFile excelFile);
        Task<Curriculum> CreateAsync(CreateCurriculumDto curriculumDtoModel);
        // Task<Comment?> UpdateAsync(int id, Comment commentDto); 
        // Task<Comment?> DeleteAsync(int id); 
    }
}