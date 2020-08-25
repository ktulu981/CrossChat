using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CrossChat.Core.Services;
using CrossChat.Dto;
using CrossChat.Entities;
using CrossChat.Extensions.EntityExtensions;
using CrossChat.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CrossChat.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        public AuthController(IConfiguration config, IAuthService authService, IMapper mapper)
        {
            _configuration = config;
            _authService = authService;
            _mapper = mapper;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserToLoginDto model)
        {
            var user = await _authService.Login(model.Username, model.Password);

            try
            {
                var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);
                UserDto userDto = _mapper.Map<UserDto>(user);
                userDto.Token = HelperMethods.CreateJWT(key, userDto);


                return Ok(userDto);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserToCreateDto model)
        {
            var user = new User();
            var newuser = await _authService.Register(user.CreateUser(model), model.Password);
            UserDto userDto = _mapper.Map<UserDto>(newuser);
            return Ok(userDto);
        }



    }
}
