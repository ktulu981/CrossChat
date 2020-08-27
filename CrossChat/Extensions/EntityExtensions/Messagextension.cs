using CrossChat.Dto;
using CrossChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Extensions.EntityExtensions
{
    public static class Messagextension
    {
        public static Message CreateMessage(this Message u, MessageCreateDto model)
        {
            u.Id = Guid.NewGuid().ToString();

            u.Content = model.Content;
            u.SenderId = model.SenderId;
            u.ChannelId = model.ChannelId;


            return u;
        }
    }
}
