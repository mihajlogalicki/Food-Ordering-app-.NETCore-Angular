using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Identity;
using FoodOrdering.Model;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.CompilerServices;

namespace FoodOrdering.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInMangager;
        private readonly ApplicationSettings _appSettings;
        private readonly AuthenticationContext _context;

        public UserController(UserManager<ApplicationUser> userManager, 
                              SignInManager<ApplicationUser> signInMangager,
                              IOptions<ApplicationSettings> appSettings,
                              AuthenticationContext context)
        {
            _userManager = userManager;
            _signInMangager = signInMangager;
            _appSettings = appSettings.Value;
            _context = context;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/User/Register
        public async Task<Object> PostUser(User userModel)
        {
            //userModel.Role = "Admin";
            var user = new ApplicationUser()
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                FullName = userModel.FullName,
                PasswordHash = userModel.Password
            };

            try
            {
                var result = await _userManager.CreateAsync(user, userModel.Password);
               //await _userManager.AddToRoleAsync(user, userModel.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/User/Login
        public async Task<IActionResult> Login(User userModel)
        {
            var user = await _userManager.FindByNameAsync(userModel.UserName);
            var userPass = await _userManager.CheckPasswordAsync(user, userModel.Password); 

            if (user != null && userPass)
            {
                //var role = await _userManager.GetRolesAsync(user);
                //IdentityOptions _options = new IdentityOptions();

                var tokenDescription = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        //new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescription);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or Password is incorrect" });
            }
        }


        [HttpGet]
        [Route("UserList")]
        // GET: api/User/UserList
        public IQueryable<ApplicationUser> GetBankAccounts()
        {
            return  _userManager.Users;
        }

    }
}
