using CrossChat.DataAccess;
using CrossChat.Entities;
using Microsoft.AspNetCore.SignalR;
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
        public async Task NewMessage(Message msg)
        {
            _context.Messages.Add(msg);
            await _context.SaveChangesAsync();

            if (Clients != null)
                await Clients.All.SendAsync("ReceiveMessage", msg);
           
        }
    }
}
