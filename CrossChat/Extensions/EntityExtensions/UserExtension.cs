using CrossChat.Dto;
using CrossChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Extensions.EntityExtensions
{
    public static class UserExtension
    {
        public static User CreateUser(this User u,UserToCreateDto model)
        {
            u.Email = model.Email;
            u.Name = model.Name;
            u.Surname = model.Surname;

            return u;
        }
    }
}
