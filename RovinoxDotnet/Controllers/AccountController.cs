using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.DTOs.Account;
using RovinoxDotnet.DTOs.Enrollment;
using RovinoxDotnet.Interfaces;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IBatchRepository batchRepository, IEnrollmentRepository enrollmentRepository) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly ITokenService _tokenService = tokenService;
        private readonly SignInManager<AppUser> _signInManager = signInManager;
        private readonly IBatchRepository _batchRepository = batchRepository;
        private readonly IEnrollmentRepository _enrollmentRepository = enrollmentRepository;

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
                    var user = await _userManager.FindByEmailAsync(registerDto.Email);
                    var defaultRole = "User";


                    var enrollmentDto = new CreateEnrollmentDto
                    {
                        FirstName = registerDto.FirstName,
                        LastName = registerDto.LastName,
                        Course = batch.Course,
                        UserId = user.Id,
                        BatchId = batch.Id
                    };
                    var enrollment = await _enrollmentRepository.CreateAsync(enrollmentDto);
                    var roleResult = await _userManager.AddToRoleAsync(appUser, defaultRole);
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                Roles = defaultRole,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser)
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

    }
}