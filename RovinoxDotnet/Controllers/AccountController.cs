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
    public class AccountController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IBatchRepository batchRepository, IEnrollmentRepository enrollmentRepository, ApplicationDBContext dbContext, IAuthenticatedUserService authenticatedUserService) : ControllerBase
    {
        private readonly IAuthenticatedUserService _authenticatedUserService = authenticatedUserService;
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
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
            // var roles = await _userManager.GetRolesAsync(user);
            var defaultRole = Roles.Admin;

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Email not found and/or password incorrect");
            return Ok(
                new NewUserDto
                {
                    // Roles = Convert.ToString(roles[0]),
                    Roles = defaultRole,
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
                            {
                                FirstName = appUser.FirstName,
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
        [HttpGet("signed/user")]
        // [Authorize]
        public async Task<IActionResult> GetUserAsync()
        {
            var userId = _authenticatedUserService.UserId;
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            var appData = new AppUserDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Enabled = true,
                Balance = user.Balance,
                Id = user.Id
            };
            return Ok(
                      appData
                  );
        }
        [HttpGet("search/users")]
        // [Authorize]
        public IActionResult GetSearchedUserAsync([FromQuery] string searchTerm)
        {

            var users = _userManager.Users
     .Where(x =>
         (x.FirstName.ToLower().Contains(searchTerm.ToLower()) ||
         x.LastName.ToLower().Contains(searchTerm.ToLower()) ||
         x.Email.ToLower().Contains(searchTerm.ToLower())) &&
         x.Enabled)
     .Select(user => new AppUserDTO
     {
         FirstName = user.FirstName,
         LastName = user.LastName,
         Email = user.Email,
         Id = user.Id
     })
     .ToList();

            return Ok(
                     users
                  );

        }


        [HttpGet("roles")]
        // [Authorize(Roles =Roles.Admin )]
        public IActionResult GetAllRoles()
        {
            var roles = _roleManager.Roles.ToArray();
            return Ok(roles);

        }
        [HttpPost("update/user")]
        // [Authorize(Roles =Roles.Admin )]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UpdateUserDto updateUserDto)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);

            }
            try
            {

                var userId = updateUserDto.UserId;
                var role = updateUserDto.Role;
                var roleId = updateUserDto.RoleId;
                var enabled = updateUserDto.Enabled;
                var batchId = (int)updateUserDto.BatchId;
                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);


                if (batchId != 0)
                {
                    Batch batch = await _batchRepository.GetByIdAsync(batchId);

                    var existingEnrollment = _enrollmentRepository.CheckIfAlreadyEnrolled(userId, batchId);
                    if (existingEnrollment.Result == null)
                    {
                        var enrollmentDto = new CreateEnrollmentDto
                        {
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Course = batch.Course,
                            UserId = user.Id,
                            BatchId = batchId
                        };
                        var enrollment = await _enrollmentRepository.CreateAsync(enrollmentDto);
                        if (enrollment != null)
                        {
                            await _enrollmentRepository.UpdateBalance(userId, batchId);

                        }

                    }

                }


            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

            return Ok(new { message = "successfully updated" });

        }

        [HttpGet("users")]
        // [Authorize(Roles =Roles.Admin )]
        public IActionResult GetAllUsers()
        {

            var AllUsers = from cols in _userManager.Users
                           from e in _dbContext.Enrollments
                           from b in _dbContext.Batches
                           from ur in _dbContext.UserRoles
                           from r in _dbContext.Roles
                           where cols.Id == e.UserId && b.Id == e.BatchId && cols.Id == ur.UserId && r.Id == ur.RoleId
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
        [HttpGet("users/batchId/{BatchId:int}")]
        // [Authorize(Roles =Roles.Admin )]
        public IActionResult GetAllUsersByBatchId([FromRoute] int BatchId)
        {

            var AllUsers = from cols in _userManager.Users
                           from e in _dbContext.Enrollments
                           from b in _dbContext.Batches
                           from ur in _dbContext.UserRoles
                           from r in _dbContext.Roles
                           where cols.Id == e.UserId && b.Id == e.BatchId && e.BatchId == BatchId && cols.Id == ur.UserId && r.Id == ur.RoleId
                           select new
                           {
                               FirstName = cols.FirstName,
                               LastName = cols.LastName,
                               Balance = cols.Balance,
                               Enabled = cols.Enabled,
                               Id = cols.Id,
                               Email = cols.Email,
                               PhoneNumber = cols.PhoneNumber,
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