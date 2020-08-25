using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrossChat.Dto
{
    public class ResponseDto<T> where T:class
    {

        public T Data { get; set; }

        public bool Status { get; set; }

        public string Message { get; set; }
    }
}
