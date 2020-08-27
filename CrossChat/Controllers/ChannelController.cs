using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CrossChat.DataAccess;
using CrossChat.Dto;
using CrossChat.Entities;
using CrossChat.Extensions.EntityExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrossChat.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelController : ControllerBase
    {
        private readonly CrossChatDbContext _context;
        private readonly IMapper _mapper;
        public ChannelController(CrossChatDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _context.Channels.ToListAsync();

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var response = await _context.Channels.Include(x=>x.ChannelUsers).ThenInclude(y=>y.User).Include(x=>x.Messages).ThenInclude(y=>y.Sender).FirstOrDefaultAsync(x=>x.Id==id);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet("join/{id}")]
        public async Task<IActionResult> Join(string id)
        {
            if (User.FindFirst(ClaimTypes.NameIdentifier) == null)
            {
                return BadRequest();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            var user =await _context.ChannelUsers.Where(x => x.UserId == userId && x.ChannelId == id).FirstOrDefaultAsync();
            if (user != null)
                return BadRequest();
    
                var channelUser = new ChannelUser()
            {
                ChannelId = id,
                UserId = userId
            };

            _context.ChannelUsers.Add(channelUser);
            await _context.SaveChangesAsync();

            var channel = await _context.Channels.Include(x => x.ChannelUsers).ThenInclude(y => y.User).Include(x => x.Messages).ThenInclude(y => y.Sender).FirstOrDefaultAsync(x => x.Id == id);
            return Ok(channelUser);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ChannelCreateDto model)
        {
            if (User.FindFirst(ClaimTypes.NameIdentifier) == null)
            {
                return BadRequest();
            }
     

            var channel = new Channel();
            channel.CreateChannel(model);
            channel.CreatorId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _context.Channels.Add(channel);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                var response = new ResponseDto<ChannelDto>();
                response.Status = true;
                response.Message = "Channel successfully created";
                response.Data = _mapper.Map<ChannelDto>(channel);
                return Ok(response);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (User.FindFirst(ClaimTypes.NameIdentifier) == null)
            {
                return BadRequest();
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var channel = await _context.Channels.Where(x => x.Id == id && x.CreatorId == userId).FirstOrDefaultAsync();

            if (channel == null)
            {
                return BadRequest();
            }

            _context.Channels.Remove(channel);
          var result=  await _context.SaveChangesAsync();
            if (result > 0)
            {
                var response = new ResponseDto<ChannelDto>();
                response.Status = true;
                response.Message = "Channel successfully deleted";
                response.Data = _mapper.Map<ChannelDto>(channel);
                return Ok(response);
            }

            return BadRequest();
        }
    }
}
