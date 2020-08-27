using CrossChat.DataAccess;
using CrossChat.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Hubs
{
    public class ChannelHub: Hub
    {

        private readonly CrossChatDbContext _context;
        public ChannelHub(CrossChatDbContext context)
        {
            _context = context;
        }
        public async Task NewMessage(ChannelUser msg)
        {
            ChannelUser mesaj = new ChannelUser();
            msg.Id = Guid.NewGuid().ToString();
            try
            {

                var user = await _context.ChannelUsers.Where(x => x.UserId == msg.UserId && x.ChannelId == msg.ChannelId).FirstOrDefaultAsync();
                if (user == null)
                {
                    _context.ChannelUsers.Add(msg);
                    await _context.SaveChangesAsync();
                    mesaj = await _context.ChannelUsers.Include(x=>x.Channel).Include(x => x.User).FirstOrDefaultAsync(x => x.Id == msg.Id);
                }
               
               

            }
            catch (Exception ex)
            {


            }

            if (Clients != null)
                await Clients.All.SendAsync("MessageReceived", mesaj);

        }
    }
}
