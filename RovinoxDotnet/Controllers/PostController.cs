using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RovinoxDotnet.DTOs.Account;
using RovinoxDotnet.DTOs.Post;
using RovinoxDotnet.DTOs.Replier;
using RovinoxDotnet.Interfaces;

namespace RovinoxDotnet.Controllers
{
   [ApiController]
   [Route("api/post")]
   //[Authorize]   
   public class PostController(IPostRepository postRepository, IAuthenticatedUserService authenticatedUserService) : ControllerBase
   {
      private readonly IPostRepository _postRepository = postRepository;
      private readonly IAuthenticatedUserService _authenticatedUserService = authenticatedUserService;


      [HttpGet("curriculumId/{curriculumId:int}")]
      public async Task<IActionResult> GetAll([FromRoute] int curriculumId)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }
         var posts = await _postRepository.GetAllAsync(curriculumId);

         List<PostDto> newPostDto = [];

         foreach (var items in posts)
         {
            List<ReplierDto> NewRepliers = [];

            foreach (var items2 in items.Repliers)
            {
               NewRepliers.Add(new ReplierDto
               {
                  Id = items2.Id,
                  Content = items2.Content,
                  CreatedById = items2.CreatedById,
                  CreatedBy = new AppUserDTO
                  {
                     FirstName = items2.CreatedBy.FirstName,
                     LastName = items2.CreatedBy.LastName,
                     Image = items2.CreatedBy.Image,
                     Enabled = items.Enabled,
                  },
                  CreatedOn = items2.CreatedOn,
                  Enabled = items2.Enabled,
                  PostId = items2.PostId,
                  Score = items2.Score,
                  ReplyingToId = items2.ReplyingToId,
                  ReplyingTo = new AppUserDTO
                  {
                     FirstName = items2.ReplyingTo.FirstName,
                     LastName = items2.ReplyingTo.LastName,
                     Image = items2.ReplyingTo.Image,
                     Enabled = items.Enabled,
                  },
               });
            }
            newPostDto.Add(new PostDto
            {
               Id = items.Id,
               Score = items.Score,
               CreatedOn = items.CreatedOn,
               CurriculumId = items.CurriculumId, 
               PostedById = items.PostedById,
               Enabled = items.Enabled,
               PostedBy = new AppUserDTO
               {
                  FirstName = items.PostedBy.FirstName,
                  LastName = items.PostedBy.LastName,
                  Image = items.PostedBy.Image,
                  Enabled = items.Enabled,
               },
               Repliers = NewRepliers
            });
         }
         return Ok(newPostDto);
      }
      [HttpPost]
      public async Task<IActionResult> Create([FromBody] CreatePostDto postDto)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }
         if (postDto.PostedById == null)
         {
            var userId = _authenticatedUserService.UserId;
            postDto.PostedById = userId;
         }
         var post = await _postRepository.AddAsync(postDto);
         return Ok(post);
         // return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
      }
   }
}