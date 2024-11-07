using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Post;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public static class PostMapper
    {
       public static Post FormatPostData(this CreatePostDto postDto){
            return new Post {
                Content = postDto.Content,
                CurriculumId = postDto.CurriculumId,
                PostedById = postDto.PostedById
                
            };

        }
    }
}