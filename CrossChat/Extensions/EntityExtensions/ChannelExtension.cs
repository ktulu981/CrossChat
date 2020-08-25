using CrossChat.Dto;
using CrossChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Extensions.EntityExtensions
{
    public static class ChannelExtension
    {
        public static Channel CreateChannel(this Channel u, ChannelCreateDto model)
        {
            u.Id = Guid.NewGuid().ToString();
          
            u.Name = model.Name;
           

            return u;
        }
    }
}
