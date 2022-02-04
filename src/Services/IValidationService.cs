using Api.Music.Controllers.Models;

namespace Api.Music.Services
{
    public interface IValidationService
    {
        void ThrowIfInvalid(MusicAddRequest request);
    }
}