using System;
using System.Net;
using Api.Music.Controllers.Models;

namespace Api.Music.Services
{
    public class ValidationService : IValidationService
    {
        public void ThrowIfInvalid(MusicAddRequest request)
        {

            if (string.IsNullOrEmpty(request.Album))
            {
                throw new HttpException(statusCode: HttpStatusCode.PreconditionFailed, msg: $"{nameof(request.Album)} is required");
            }

            if (string.IsNullOrWhiteSpace(request.Artist))
            {
                throw new HttpException(statusCode: HttpStatusCode.PreconditionFailed, msg: $"{nameof(request.Artist)} is required");
            }

            if (request.Length == 0)
            {
                throw new HttpException(statusCode: HttpStatusCode.PreconditionFailed, msg: $"{nameof(request.Length)} is required");
            }

            if (string.IsNullOrWhiteSpace(request.Path))
            {
                throw new HttpException(statusCode: HttpStatusCode.PreconditionFailed, msg: $"{nameof(request.Path)} is required");
            }

            if (string.IsNullOrWhiteSpace(request.Title))
            {
                throw new HttpException(statusCode: HttpStatusCode.PreconditionFailed, msg: $"{nameof(request.Title)} is required");
            }
        }
    }
}