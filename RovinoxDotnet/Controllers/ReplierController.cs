using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.Replier;
using RovinoxDotnet.Interfaces;

namespace RovinoxDotnet.Controllers
{
      [ApiController]
    [Route("api/replier")]
       //[Authorize]   
    public class ReplierController(IReplierRepository replierRepository, IAuthenticatedUserService authenticatedUserService) :ControllerBase
    {
        private readonly IReplierRepository _replierRepository = replierRepository;
        private readonly IAuthenticatedUserService _authenticatedUserService = authenticatedUserService;
        [HttpPost]      
           public async Task<IActionResult> Create([FromBody] CreateReplierDto replierDto){
             if (!ModelState.IsValid) {
                return BadRequest(ModelState);
             }
             if(replierDto.CreatedById == null) {
                   var userId = _authenticatedUserService.UserId;
                   replierDto.CreatedById = userId;
             }
          var post =  await _replierRepository.AddAsync(replierDto);
            return Ok(post);
           }
    }
}