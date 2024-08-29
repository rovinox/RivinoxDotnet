using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Enrollment;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Interfaces
{
    public interface IEnrollmentRepository
    {
        public Task<Enrollment> CreateAsync(CreateEnrollmentDto enrollmentModel);     
        public Task<bool> UpdateBalance( string userId, int batchId);     
        public Task<Enrollment>? CheckIfAlreadyEnrolled( string userId, int batchId);     
    }
}