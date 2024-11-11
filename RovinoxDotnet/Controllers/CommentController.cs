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
    [Authorize]
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
            CommentDto.CreatedById = userId;

            var comment = await _commentRepository.CreateAsync(CommentDto);
            return Ok(comment);
            //return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }
        private static CommentDto MapCommentToDto(Comment comment)
{
    return new CommentDto
    {
        Id = comment.Id,
        Content = comment.Content,
        Score = comment.Score,
        CreatedOn = comment.CreatedOn,
        CurriculumId = comment.CurriculumId,
        CreatedById = comment.CreatedById,
        Enabled = comment.Enabled,
        ParentId = comment.ParentId,
        ReplyingToId = comment.ReplyingToId,
        ReplyingTo = comment.ReplyingTo == null ? null : new AppUserDTO
        {
            FirstName = comment.ReplyingTo.FirstName,
            LastName = comment.ReplyingTo.LastName,
            Image = comment.ReplyingTo.Image,
            Enabled = comment.ReplyingTo.Enabled,
            Id = comment.ReplyingTo.Id,
            FullName = $"{comment.ReplyingTo.FirstName} {comment.ReplyingTo.LastName}",
        },
        CreatedBy = comment.CreatedBy == null ? null : new AppUserDTO
        {
            FirstName = comment.CreatedBy.FirstName,
            LastName = comment.CreatedBy.LastName,
            Image = comment.CreatedBy.Image,
            Enabled = comment.CreatedBy.Enabled,
            Id = comment.CreatedBy.Id,
            FullName = $"{comment.CreatedBy.FirstName} {comment.CreatedBy.LastName}",
        },
        // Recursively map child comments
        Children = comment.Children?.Select(child => MapCommentToDto(child)).ToList()
    };
}
        [HttpPut]
        public async Task<IActionResult> UpdateContent([FromBody] UpdateDto updateDto)
        {

                 var comments = await _commentRepository.UpdateContent(updateDto);
                  return Ok(comments);

        }
        [HttpDelete("delete/commentId/{commentId:int}")]
        public async Task<IActionResult> DisableComment([FromRoute] int commentId )
        {

                 var comments = await _commentRepository.DisableComment(commentId);
                  return Ok(comments);

        }
        [HttpGet("curriculumId/{curriculumId:int}")]
        public async Task<IActionResult> GetAll([FromRoute] int curriculumId)
        {



            var comments = await _commentRepository.GetComments(curriculumId);

    // Filter to only top-level comments and map each comment recursively
    var dtoList = comments
        .Where(comment => comment.ParentId == null)
        .Select(comment => MapCommentToDto(comment))
        .ToList();

    return Ok(dtoList);

        }

    }
}