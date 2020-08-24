using CrossChat.Core.Services;
using CrossChat.DataAccess;
using CrossChat.Entities;
using CrossChat.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Services
{
    public class AuthService : IAuthService
    {
        private readonly CrossChatDbContext _context;
        public AuthService(CrossChatDbContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == username);


            if (user == null)
            {
                throw new Exception("User not found");
            }
           

            if (!HelperMethods.VerifyHash(password, user.PasswordHash, user.PasswordSalt))
            {
                throw new Exception("Password not match");

            }
            return user;
        }

        public async Task<User> Register(User u, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == u.Email);

            if (user != null)
            {
                throw new Exception("User already exists");
            }

            byte[] passwordHash, passwordSalt;
            HelperMethods.CreateHash(password, out passwordHash, out passwordSalt);
            u.PasswordHash = passwordHash;
            u.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(u);
            var result=  await _context.SaveChangesAsync();
            if (result > 0)
            {
                return u;
            }
            throw new Exception("Database error!");
        }
    }
}
