using Edge.MyMusic.Providers.Models;

namespace Edge.MyMusic.Providers;

public interface IAudioProvider
{
    Task<AudioResponse?> GetMetadataAsync(string url);
}