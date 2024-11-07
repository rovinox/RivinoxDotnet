

using RovinoxDotnet.DTOs.Vote;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Mappers
{
    public static class VoteMapper
    {
         public static Vote FormatVoteData(this CreateVoteDto voteDto){
            return new Vote {
                PostDownvoted = voteDto.PostDownvoted,
                PostUpvoted = voteDto.PostUpvoted,
                ReplayDownvoted = voteDto.ReplayDownvoted,
                ReplayUpvoted = voteDto.ReplayUpvoted,
                CurriculumId = voteDto.CurriculumId,
                VotedById = voteDto.VotedById
            };
         }
    }
}