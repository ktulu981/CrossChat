using AutoMapper;
using CrossChat.Dto;
using CrossChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Mappings
{
    public class ChannelProfile:Profile
    {

        public ChannelProfile()
        {
            CreateMap<Channel, ChannelDto>()
            .ForMember(dest =>
           dest.Name,
           opt => opt.MapFrom(src => src.Name))
              .ForMember(dest =>
           dest.Creator,
           opt => opt.MapFrom(src => src.CreatorId));
        }
    }
}
