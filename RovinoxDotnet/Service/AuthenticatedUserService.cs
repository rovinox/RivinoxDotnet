using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using RovinoxDotnet.Interfaces;

namespace RovinoxDotnet.Service
{
    public class AuthenticatedUserService(IHttpContextAccessor httpContextAccessor) : IAuthenticatedUserService
    {
        public string UserId { get; set; } = httpContextAccessor.HttpContext.User.FindFirstValue("userId");

    }
}