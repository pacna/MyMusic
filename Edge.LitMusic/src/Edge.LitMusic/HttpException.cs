using System;
using System.Net;

namespace Edge.LitMusic;
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