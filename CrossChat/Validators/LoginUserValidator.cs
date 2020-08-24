using CrossChat.Dto;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Validators
{
    public class LoginUserValidator : AbstractValidator<UserToLoginDto>
    {

        public LoginUserValidator()
        {
            RuleFor(m => m.Username).NotEmpty();
            RuleFor(m => m.Password).NotEmpty();
        }
    }
}
