using CrossChat.DataAccess;
using CrossChat.Dto;
using CrossChat.Entities;
using CrossChat.Extensions.EntityExtensions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Hubs
{
    public class MessageHub: Hub
    {
        private readonly CrossChatDbContext _context;
        public MessageHub(CrossChatDbContext context)
        {
            _context = context;
        }
        public async Task NewMessage(MessageCreateDto msg)
        {
            var mesaj = new Message();
            try
            {
                mesaj.CreateMessage(msg);
                _context.Messages.Add(mesaj);
                await _context.SaveChangesAsync();
                mesaj = await _context.Messages.Include(x => x.Sender).FirstOrDefaultAsync(x => x.Id == mesaj.Id);

            }
            catch (Exception ex)
            {

                
            }
           
            if (Clients != null)
                await Clients.All.SendAsync("MessageReceived", mesaj);
           
        }
    }
}
