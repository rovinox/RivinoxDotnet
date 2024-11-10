using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.Account;
using RovinoxDotnet.DTOs.Comment;
using RovinoxDotnet.Extensions;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Controllers
{
    [Route("api/comment")]
    [ApiController]
    // [Authorize]
    public class CommentController(ICommentRepository commentRepository, UserManager<AppUser> userManager, IAuthenticatedUserService authenticatedUserService) : ControllerBase

    {
        private readonly IAuthenticatedUserService _authenticatedUserService = authenticatedUserService;
        private readonly ICommentRepository _commentRepository = commentRepository;
        private readonly UserManager<AppUser> _userManager = userManager;
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CerateCommentDto CommentDto)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }
            var userId = _authenticatedUserService.UserId;
            CommentDto.CreatedById = "0ae34dfd-2af4-41d4-9d1b-8c115a253d95";

            var comment = await _commentRepository.CreateAsync(CommentDto);
            return Ok(comment);
            //return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }
        [HttpGet("curriculumId/{curriculumId:int}")]
        public async Task<IActionResult> GetAll([FromRoute] int curriculumId)
        {

            var comments = await _commentRepository.GetComments(curriculumId);
            var dtoList = comments.Select(comment => new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                Score = comment.Score,
                CreatedOn = comment.CreatedOn,
                CurriculumId = comment.CurriculumId,
                CreatedById = comment.CreatedById,
                Enabled = comment.Enabled,
                ReplyingTo = comment.ReplyingTo == null ? null : new AppUserDTO
                {
                    FirstName = comment.ReplyingTo.FirstName,
                    LastName = comment.ReplyingTo.LastName,
                    Image = comment.ReplyingTo.Image,
                    Enabled = comment.ReplyingTo.Enabled,
                    Id = comment.ReplyingTo.Id,
                    FullName = comment.ReplyingTo.FirstName + " " + comment.ReplyingTo.LastName,

                },
                CreatedBy = comment.CreatedBy == null ? null : new AppUserDTO
                {
                    FirstName = comment.CreatedBy.FirstName,
                    LastName = comment.CreatedBy.LastName,
                    Image = comment.CreatedBy.Image,
                    Enabled = comment.CreatedBy.Enabled,
                    Id = comment.CreatedBy.Id,
                    FullName = comment.CreatedBy.FirstName + " " + comment.CreatedBy.LastName,
                },
                Parent = comment.Parent == null ? null : new CommentDto
                {
                    Id = comment.Parent.Id,
                    Content = comment.Parent.Content,
                    Score = comment.Parent.Score,
                    CreatedOn = comment.Parent.CreatedOn,
                    CurriculumId = comment.Parent.CurriculumId,
                    CreatedById = comment.Parent.CreatedById,
                    Enabled = comment.Parent.Enabled
                },
                Children = comment.Children?.Select(child => new CommentDto
                {
                    Id = child.Id,
                    Content = child.Content,
                    Score = child.Score,
                    CreatedOn = child.CreatedOn,
                    CurriculumId = child.CurriculumId,
                    CreatedById = child.CreatedById,
                    Enabled = child.Enabled
                }).ToList()
            }).ToList();

            return Ok(dtoList);
        }

    }
}