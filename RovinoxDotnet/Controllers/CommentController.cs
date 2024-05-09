using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.Comment;
using RovinoxDotnet.Extensions;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Controllers
{
     [Route("api/comment")]
    [ApiController]
    [Authorize]
    public class CommentController(ICommentRepository commentRepository, UserManager<AppUser> userManager) : ControllerBase

    {
         private readonly ICommentRepository _commentRepository = commentRepository;
               private readonly UserManager<AppUser> _userManager = userManager;
          [HttpPost]
                public async Task<IActionResult> Create([FromBody] CerateCommentDto CommentDto)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }
            var appUser = await GetUserAllInfo();
            string createdBy = $"{appUser.FirstName} {appUser.LastName}";

            var comment = await _commentRepository.CreateAsync(CommentDto, appUser.Id, createdBy);
            return Ok(comment);
            //return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }
        [HttpGet("homework/{HomeWorkId:int}")]
        public async Task<IActionResult> GetAll([FromRoute]  int HomeWorkId){
             var comments = await _commentRepository.GetComments(HomeWorkId);
             return Ok(comments);
        }
        private async Task<AppUser> GetUserAllInfo()
        {
            var userName = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(userName);
            return appUser;
        }
    }
}