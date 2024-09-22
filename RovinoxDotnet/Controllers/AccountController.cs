using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.common;
using RovinoxDotnet.Data;
using RovinoxDotnet.DTOs.Account;
using RovinoxDotnet.DTOs.Enrollment;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IBatchRepository batchRepository, IEnrollmentRepository enrollmentRepository, ApplicationDBContext dbContext) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly ITokenService _tokenService = tokenService;
        private readonly SignInManager<AppUser> _signInManager = signInManager;
        private readonly IBatchRepository _batchRepository = batchRepository;
        private readonly IEnrollmentRepository _enrollmentRepository = enrollmentRepository;
        private readonly ApplicationDBContext _dbContext = dbContext;

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Invalid Email!");

            // var userData = await _userManager.FindByIdAsync(user.Id);
            var roles = await _userManager.GetRolesAsync(user);

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Email not found and/or password incorrect");
            return Ok(
                new NewUserDto
                {
                    Roles = Convert.ToString(roles[0]),
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user),
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Enabled = user.Enabled
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {

                    return BadRequest(ModelState);
                }
                Batch batch = await _batchRepository.GetByIdAsync(registerDto.BatchId);
                var appUser = new AppUser
                {
                    UserName = registerDto.Email,
                    Email = registerDto.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    PhoneNumber = registerDto.PhoneNumber,
                    Balance = batch.Cost,
                    Enabled = true
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                  //  var user = await _userManager.FindByEmailAsync(registerDto.Email);
                    var defaultRole = Roles.Admin;


                    var enrollmentDto = new CreateEnrollmentDto
                    {
                        FirstName = appUser.FirstName,
                        LastName = appUser.LastName,
                        Course = batch.Course,
                        UserId = appUser.Id,
                        BatchId = batch.Id
                    };
                    var enrollment = await _enrollmentRepository.CreateAsync(enrollmentDto);
                    var roleResult = await _userManager.AddToRoleAsync(appUser, defaultRole);
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {    FirstName = appUser.FirstName,
                                 LastName = appUser.LastName,
                                Roles = defaultRole,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser),
                                 Enabled = true
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
        [HttpGet("users")]
        // [Authorize(Roles =Roles.Admin )]
        public IActionResult GetAll()
        {

            var AllUsers = from cols in _userManager.Users
                           from e in _dbContext.Enrollments
                           from b in _dbContext.Batches
                           from ur in _dbContext.UserRoles
                           from r in _dbContext.Roles
                           where cols.Id == e.UserId && b.Id == e.BatchId && cols.Id  == ur.UserId && r.Id == ur.RoleId
                           select new
                           {
                               FirstName = cols.FirstName,
                               LastName = cols.LastName,
                               Balance = cols.Balance,
                               Enabled = cols.Enabled,
                               Id = cols.Id,
                               Email = cols.Email,
                               PhoneNumber = cols.PhoneNumber,
                               Course = e.Course,
                               BatchId = b.Id,
                               StartDate = b.StartDate,
                               EndDate = b.EndDate,
                               Role = r.Name,
                               RoleId = r.Id
                           };

            return Ok(AllUsers);


        }

    }

}