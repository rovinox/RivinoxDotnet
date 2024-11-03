using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RovinoxDotnet.DTOs.Replier;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
     public static class ReplierMapper
    {
       public static Replier FormatReplierData(this CreateReplierDto ReplierDto){
            return new Replier {
                Content = ReplierDto.Content,
                PostId = ReplierDto.PostId,
                CreatedById = ReplierDto.CreatedById,
                ReplyingToId = ReplierDto.ReplyingToId,
                
            };

        }
    }
}