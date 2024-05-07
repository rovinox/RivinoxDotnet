using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.Batch;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;


namespace RovinoxDotnet.Controllers
{
    [Route("api/batch")]
    [ApiController]
   
    public class BatchController : ControllerBase

    {
        private readonly IBatchRepository _batchRepository;
        public BatchController(IBatchRepository batchRepository)
        {
             _batchRepository = batchRepository;
        }
        [HttpGet]        
        public async Task<IActionResult> GetAll(){
             if (!ModelState.IsValid) {
                return BadRequest(ModelState);
             }
             var batches = await _batchRepository.GetAllAsync();
              return Ok(batches);
        }
          [HttpPost]    
          // [Authorize]   
           public async Task<IActionResult> Create([FromBody] CreateBatchDto batchDto){
             if (!ModelState.IsValid) {
                return BadRequest(ModelState);
             }
          var batches = await  _batchRepository.CreateAsync(batchDto);
            return Ok(batches);
            // return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }
    }
}