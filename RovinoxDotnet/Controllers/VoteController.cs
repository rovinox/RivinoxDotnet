using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.Vote;
using RovinoxDotnet.Interfaces;

namespace RovinoxDotnet.Controllers
{
    [ApiController]
    [Route("api/vote")]
    public class VoteController(IVoteRepository _voteRepository, IAuthenticatedUserService authenticatedUserService) : ControllerBase
    {
        private readonly IAuthenticatedUserService _authenticatedUserService = authenticatedUserService;



        [HttpGet("curriculumId/{curriculumId:int}")]
        //[Authorize]
        public async Task<IActionResult> GetByCurriculumId([FromRoute] int curriculumId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = _authenticatedUserService.UserId;

            var result = await _voteRepository.GetByCurriculumIdAsync(curriculumId, userId);
            return Ok(result);
        }
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> CreateAsync([FromBody] CreateVoteDto createVoteDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _voteRepository.AddAsync(createVoteDto);
            return Ok(result);
        }
        [HttpPut]
        //[Authorize]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateVoteDto updateVoteDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _voteRepository.UpdateAsync(updateVoteDto);

            return Ok(result);
        }
    }
}