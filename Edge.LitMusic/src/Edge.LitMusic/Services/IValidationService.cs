using Edge.LitMusic.Controllers.Models;

namespace Edge.LitMusic.Services;
public interface IValidationService
{
    void ThrowIfInvalid(MusicAddRequest request);
}