using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Dto
{
    public class MessageCreateDto
    {
        public string Content { get; set; }

        public string SenderId { get; set; }

      

        public string ChannelId { get; set; }

        
    }
}
