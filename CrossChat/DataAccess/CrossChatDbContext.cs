using CrossChat.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.DataAccess
{
    public class CrossChatDbContext:DbContext
    {
        public CrossChatDbContext(DbContextOptions<CrossChatDbContext> options):base(options)
        {

        }


        public DbSet<User>  Users { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<ChannelUser> ChannelUsers { get; set; }
    }
}
