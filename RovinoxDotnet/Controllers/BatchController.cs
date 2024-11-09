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
   
    public class BatchController(IBatchRepository batchRepository) : ControllerBase

    {
        private readonly IBatchRepository _batchRepository = batchRepository;

        [HttpGet]        
        public async Task<IActionResult> GetAll(){
             if (!ModelState.IsValid) {
                return BadRequest(ModelState);
             }
             var batches = await _batchRepository.GetAllAsync();
              return Ok(batches);
        }
        [HttpGet("batchId/{batchId:int}")]        
        public async Task<IActionResult> GetAll([FromRoute] int batchId){
             if (!ModelState.IsValid) {
                return BadRequest(ModelState);
             }
             var batch = await _batchRepository.GetByIdAsync(batchId);
              return Ok(batch);
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