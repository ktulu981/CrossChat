using AutoMapper;
using CrossChat.Dto;
using CrossChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
             .ForMember(dest =>
            dest.FullName,
            opt => opt.MapFrom(src => src.Name+" "+src.Surname))
            .ForMember(dest =>
            dest.Email,
            opt => opt.MapFrom(src => src.Email))
             .ForMember(dest =>
            dest.Id,
            opt => opt.MapFrom(src => src.Id));

        }
    }
}
