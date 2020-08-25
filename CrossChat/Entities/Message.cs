using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Entities
{
    public class Message:BaseEntity
    {

        public string Content { get; set; }

        public string SenderId { get; set; }

        public User Sender { get; set; }

        public string ChannelId { get; set; }

        public Channel Channel { get; set; }
    }
}
