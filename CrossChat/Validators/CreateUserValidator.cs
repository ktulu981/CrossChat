using CrossChat.Dto;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Validators
{
    public class CreateUserValidator : AbstractValidator<UserToCreateDto>
    {

        public CreateUserValidator()
        {
            RuleFor(m => m.Name).NotEmpty();
            RuleFor(m => m.Surname).NotEmpty();
            RuleFor(m => m.Email).EmailAddress();
            RuleFor(m => m.Password).NotEmpty().MinimumLength(6).MaximumLength(16);
        }
    }
}
