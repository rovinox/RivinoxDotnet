using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.Homework;
using RovinoxDotnet.Extensions;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Controllers
{
    [Route("api/homework")]
    [ApiController]
    [Authorize]
    public class HomeWorkController(UserManager<AppUser> userManager, IHomeworkRepository homeworkRepository) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly IHomeworkRepository _homeworkRepository = homeworkRepository;
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateHomeworkDto homeworkDto)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }
            var appUser = await GetUserAllInfo();
            var homework = await _homeworkRepository.CreateAsync(homeworkDto, appUser.Id);
            return Ok(homework);
            //return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }
        [HttpGet("curriculum/{curriculumId:int}")]
        public async Task<IActionResult> GetHomeworkById([FromRoute] int curriculumId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var appUser = await GetUserAllInfo();
            var homework = await _homeworkRepository.GetHomeWorkByCurriculumId(curriculumId, appUser.Id);
            return Ok(homework);
        }

        private async Task<AppUser> GetUserAllInfo()
        {
            var userName = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(userName);
            return appUser;
        }

    }
}