using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.DataAccess.Seeder
{
    public class DatabaseSeeder
    {

        public static void Seed(CrossChatDbContext _context)
        {

            if (_context.Users.Any())
            {
                return;   // Data was already seeded
            }


        }
    }
}
