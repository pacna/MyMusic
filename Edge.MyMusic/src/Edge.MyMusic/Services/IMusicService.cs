using Edge.MyMusic.Controllers.Models;

namespace Edge.MyMusic.Services;

public interface IMusicService
{
    Task<MusicResponse?> GetMusicAsync(string id);
    Task<List<MusicResponse>> SearchMusicAsync(MusicSearchRequest request);
}