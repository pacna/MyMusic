using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Api.Music
{
    internal class HttpExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public HttpExceptionMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await this._next.Invoke(context);
            }
            catch (HttpException ex)
            {
                HttpResponse response = context.Response;

                int statusCode = (int)ex.StatusCode;

                if (IsServerSideError(statusCode: statusCode))
                {
                    Console.WriteLine("Server exception");
                }

                response.StatusCode = statusCode;
                response.ContentType = "application/json; charset=utf-8";

                await context.Response.WriteAsync(JsonSerializer.Serialize(new
                {
                    Message = ex.Message,
                    StatusCode = statusCode
                }));
            }
        }

        private bool IsServerSideError(int statusCode)
        {
            return statusCode >= 500 && statusCode <= 599;
        }
    }
}