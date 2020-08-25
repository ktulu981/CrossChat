using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Entities
{
    public class ChannelUser:BaseEntity
    {

        public string ChannelId { get; set; }

        public Channel Channel { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
    }
}
