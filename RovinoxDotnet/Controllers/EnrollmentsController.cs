using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.Enrollment;
using RovinoxDotnet.Interfaces;

namespace RovinoxDotnet.Controllers
{
    [Route("api/enrollment")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly IEnrollmentRepository _enrollmentRepository;
        public EnrollmentsController(IEnrollmentRepository enrollmentRepository)
        {
            _enrollmentRepository = enrollmentRepository;
        }

        [HttpPost("create")]
        //[Authorize]
        public async Task<IActionResult> Create([FromBody] CreateEnrollmentDto enrollmentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string userId = enrollmentDto.UserId;
            int batchId = enrollmentDto.BatchId;
                //  var enrollment = await _enrollmentRepository.CreateAsync(enrollmentDto);
                // await _enrollmentRepository.UpdateBalance(userId, batchId);
                // return Ok(enrollment);
           var existingEnrollment = _enrollmentRepository.CheckIfAlreadyEnrolled(userId, batchId);
            if (existingEnrollment == null)
            {
                var enrollment = await _enrollmentRepository.CreateAsync(enrollmentDto);
                await _enrollmentRepository.UpdateBalance(userId, batchId);
                return Ok(enrollment);
            }
            else
            {
                return BadRequest("Enrollment already exists for user to this Batch");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
             if (!ModelState.IsValid) {
                return BadRequest(ModelState);
             }
             
              var enrollments = await _enrollmentRepository.GetAllAsync();
              return Ok(enrollments);
        }
        
    }
}