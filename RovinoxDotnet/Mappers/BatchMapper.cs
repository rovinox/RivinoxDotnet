using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Batch;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public static class BatchMapper
    {
        public static Batch FormatBatchCreateData(this CreateBatchDto batchDto)
        {
            return new Batch
            {
                Course = batchDto.Course,
                Cost = batchDto.Cost,
                StartDate = batchDto.StartDate,
                EndDate = batchDto.EndDate,
            };
        }
    }
}