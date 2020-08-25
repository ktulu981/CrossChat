using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Entities
{
    public class Channel:BaseEntity
    {

        public Channel()
        {
            Messages = new List<Message>();
            ChannelUsers = new List<ChannelUser>();
        }

        public string Name { get; set; }

        public string CreatorId { get; set; }

        public User Creator { get; set; }

        public ICollection<Message> Messages { get; set; }
        public ICollection<ChannelUser> ChannelUsers { get; set; }
    }
}
