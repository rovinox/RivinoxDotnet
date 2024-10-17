using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Curriculum;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Mappers;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Repository
{
    public class CurriculumRepository : ICurriculumRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public CurriculumRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Curriculum> CreateAsync(CreateCurriculumDto curriculumDtoModel)
        {
            var formattedCurriculum = curriculumDtoModel.FormatCurriculumCreateData();
            await _dbContext.Curriculums.AddAsync(formattedCurriculum);
            await _dbContext.SaveChangesAsync();
            return formattedCurriculum;
        }



        public async Task<List<Curriculum>> CreateFromExcelByBatchIdAsync(int batchId, List<CreateCurriculumDto> ListOfCurriculum)
        {
            foreach (var curriculum in ListOfCurriculum)
            {
                var formattedCurriculum = curriculum.FormatCurriculumCreateData();
                await _dbContext.Curriculums.AddAsync(formattedCurriculum);

            }
            var data = await _dbContext.SaveChangesAsync();
            return await _dbContext.Curriculums.Where(x => x.BatchId == batchId).OrderBy(o => o.Order).ToListAsync();

        }

        public async Task<List<Curriculum>> GetAllByBatchIdAsync(int BatchId)

        {
            return await _dbContext.Curriculums.Where(x => x.BatchId == BatchId).OrderBy(o => o.Order).ToListAsync();

        }
    }
}