using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Enrollment;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public static class EnrollmentMapper
    {
        public static Enrollment FormatEnrollmentCreateData(this CreateEnrollmentDto enrollmentModel)
        {
            return new Enrollment
            {
                FirstName = enrollmentModel.FirstName,
                LastName = enrollmentModel.LastName,
                Course = enrollmentModel.Course,
                UserId = enrollmentModel.UserId,
                BatchId = enrollmentModel.BatchId
            };
        }
    }
}