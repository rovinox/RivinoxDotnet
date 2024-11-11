

using RovinoxDotnet.DTOs.Vote;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public static class VoteMapper
    {
         public static Vote FormatVoteData(this CreateVoteDto voteDto){
            return new Vote {
                Downvoted = voteDto.Downvoted,
                Upvoted = voteDto.Upvoted,
                CurriculumId = voteDto.CurriculumId,
                VotedById = voteDto.VotedById
            };
         }
    }
}