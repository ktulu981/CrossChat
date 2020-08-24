using CrossChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Core.Services
{
    /// <summary>
    /// user registration and login management
    /// </summary>
   public interface IAuthService
    {
        Task<User> Register(User u, string password);
        Task<User> Login(string username, string password);
    }
}
