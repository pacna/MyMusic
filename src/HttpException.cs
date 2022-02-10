using System;
using System.Net;

namespace Api.Music
{
    public class HttpException : Exception
    {
        public HttpStatusCode StatusCode { get; }

        public HttpException(HttpStatusCode statusCode, string msg) : base(message: msg)
        {
            this.StatusCode = statusCode;
        }

        public HttpException(HttpStatusCode statusCode, string msg, Exception innerException) : base(msg, innerException)
        {
            this.StatusCode = statusCode;
        }
    }
}