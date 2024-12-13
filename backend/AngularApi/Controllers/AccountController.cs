using AngularApi.DTO;
using AngularApi.Services;
using Azure;
using Hotel_Backend.DTO;
using Hotel_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using Response = AngularApi.Services.Response;

namespace AngularApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : ControllerBase
    {

        /// <summary>
        ///    { "email": "mustafasharaby18@gmail.com", "password": "0133asdASD//"}      
        ///   { "email": "ramyy@gmail.com", "password": "0133asdASD*"}      
        ///   works
        /// </summary>
        private readonly UserManager<Guest> userManager;
        private readonly IConfiguration Configuration;
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;
        public AccountController(UserManager<Guest> _userManager, IConfiguration Configuration , IEmailService _emailService )
        {
            userManager = _userManager;
            this.Configuration = Configuration;
            this._emailService = _emailService;
           // this._signInManager = _signInManager;

        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDTO registerUser)
        {
            if (ModelState.IsValid)
            {
                Guest appUser = new Guest();
                appUser.UserName = registerUser.UserName;
                appUser.Email = registerUser.Email;
          
                IdentityResult result = await userManager.CreateAsync(appUser, registerUser.Password);
                if (result.Succeeded)
                {                   
                    return Ok(new { message = "Account created successfully" });
                }
                return BadRequest(result.Errors.FirstOrDefault().Description.ToString());

            }
            return BadRequest(ModelState);
        }

       
        [HttpPost("login")]
        public async Task<IActionResult> Login(LogInUserDTO logInUser)
        {
            if (ModelState.IsValid)
            {               
                var found = await userManager.FindByEmailAsync(logInUser.Email);
                if (found != null)
                {
                    Guest appUser = new Guest();
                    appUser.Email = logInUser.Email;

                 
                    var checkpass = await userManager.CheckPasswordAsync(found, logInUser.Password);
                    if (checkpass)
                    {
                                          
                        var claim = new List<Claim>
                        {
                            new Claim(ClaimTypes.NameIdentifier, found.Id), 
                            new Claim(ClaimTypes.Email, found.Email),
                            new Claim(ClaimTypes.Name, found.UserName),
                            new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) 
                        };
                        Console.WriteLine("UserId "+ found.Id);

                        var userId = found.Id;
                        Console.WriteLine("UserId: "+ userId);


                        var role = await userManager.GetRolesAsync(appUser);
                        foreach (var r in role)  
                        {
                            claim.Add(new Claim(ClaimTypes.Role, r));
                        }
                        var roles = await userManager.GetRolesAsync(found);
                        foreach (var roleee in roles)
                        {
                            claim.Add(new Claim(ClaimTypes.Role, roleee));
                        }

                        foreach (var c in claim)
                        {
                            Console.WriteLine($"Claim Type: {c}");
                        }


                       
                        SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Secret"]));
                        SigningCredentials signing = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                        // Create the token
                        JwtSecurityToken jwtSecurity = new JwtSecurityToken(
                            issuer: Configuration["Jwt:validissuer"],
                            audience: Configuration["Jwt:validaudience"],  
                            claims: claim,
                            expires: DateTime.Now.AddDays(1),
                            signingCredentials: signing
                            );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(jwtSecurity),
                            expiration = jwtSecurity.ValidTo
                        });
                    }
                }
                return Unauthorized();
            }
            return BadRequest(ModelState);
        }

        //[HttpPost("LoginWith2FA")]
        //public async Task<IActionResult> LoginWith2FA(LoginWith2FADTO model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest("Invalid data.");
        //    }

        //    var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
        //    if (user == null)
        //    {
        //        return Unauthorized("User not found.");
        //    }

        //    // Verify 2FA code
        //    var result = await _signInManager.TwoFactorSignInAsync(
        //        "Email", // Provider ("Email" or "Authenticator" for apps like Google Authenticator)
        //        model.TwoFactorCode,
        //        model.RememberMe,
        //        model.RememberMachine
        //    );

        //    if (result.Succeeded)
        //    {
        //        return Ok("Login successful.");
        //    }
        //    if (result.IsLockedOut)
        //    {
        //        return StatusCode(403, "Account locked out.");
        //    }

        //    return Unauthorized("Invalid 2FA code.");
        //}



        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO forgotPasswordDto)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(forgotPasswordDto.Email);
                if (user == null)
                {
                    return Ok(new { message = "If an account with that email exists, a reset link has been sent." });
                }
                var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);
                var encodedToken = WebUtility.UrlEncode(resetToken);

                var resetLink = Url.Action(
                    nameof(ResetPassword),
                    "Account",
                    new { token = encodedToken, email = user.Email },
                    Request.Scheme);

                // var resetLink = $"http://localhost:4200/auth/reset-password?token={resetToken}&email={user.Email}";


                var message = new Message(new[] { user.Email }, "Forgot Password Link", resetLink);

                try
                {
                    _emailService.SendEmail(message);
                    return Ok(new Response("Success", $"Password reset link sent to {user.Email}. Please check your email."));
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to send email: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response("Error", "Failed to send email, please try again later."));
                }
               
            }

            return BadRequest(ModelState);
        }

        [HttpGet("reset-password")]
        public IActionResult ResetPassword(string token, string email)
        {
            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(email))
            {
                return BadRequest(new { Status = "Error", Message = "Invalid password reset link." });
            }

            // Return success response for valid tokens
            //return Ok(new { Status = "Success", Message = "Password reset link is valid.", Token = token, Email = email }); 
            return Redirect($"http://localhost:4200/auth/reset-password?token={token}&email={email}");
        }


      

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO resetPasswordDto)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(resetPasswordDto.Email);
                if (user == null)
                {
                    return BadRequest(new { message = "Invalid request." });
                }

                var decodedToken = WebUtility.UrlDecode(resetPasswordDto.Token);
                var result = await userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.NewPassword);

                if (result.Succeeded)
                {
                    return Ok(new { message = "Password has been reset successfully." });
                }

                Console.WriteLine($"Errors: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                return BadRequest(result.Errors.FirstOrDefault()?.Description);
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        ///    { "email": "mustafasharaby18@gmail.com", "password": "0133asdASD//"}      
        ///   { "email": "ramyy@gmail.com", "password": "0133asdASD*"}      
        ///   works
        /// </summary>
        /// 


        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            var result = await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok("Password changed successfully");
        }

   
        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            user.UserName = model.UserName;
            user.Email = model.Email;
            user.Address = model.Address;
            user.PhoneNumber =model.PhoneNumber;
            user.PersonalImgUrl = model.PersonalImgUrl;
            user.CoverImgUrl = model.CoverImgUrl;

            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok("Profile updated successfully");
        }

        
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            var result = await userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded) return BadRequest("Email confirmation failed");

            return Ok("Email confirmed successfully");
        }

        
        [HttpPost("resend-email-confirmation")]
        public async Task<IActionResult> ResendEmailConfirmation([FromBody] ResendEmailConfirmationDto model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null) return NotFound("User not found");

            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { userId = user.Id, token }, Request.Scheme);

            // Assume a method for sending email exists
            //await SendEmailAsync(user.Email, "Confirm your email", confirmationLink);

            return Ok("Email confirmation link sent");
        }

        
        [HttpGet("user-details")]        
        public async Task<IActionResult> GetUserDetails()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await userManager.FindByIdAsync(userId);
            //var user = await _userService.GetCurrentUserAsync();
            if (user == null) return NotFound("User not found");

            return Ok(new
            {                
                user.Email,
                user.UserName,
                user.Address,
                user.PhoneNumber,                
                user.CoverImgUrl,
                user.PersonalImgUrl
            });
        }

        
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAccount()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            var result = await userManager.DeleteAsync(user);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok("Account deleted successfully");
        }



    }

}
