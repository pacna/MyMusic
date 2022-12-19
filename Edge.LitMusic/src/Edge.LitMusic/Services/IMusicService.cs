using Edge.LitMusic.Controllers.Models;

namespace Edge.LitMusic.Services;
public interface IMusicService
{
    Task<List<MusicResponse>> SearchMusicAsync(MusicSearchRequest request);
    Task<MusicResponse> AddMusicAsync(MusicAddRequest request);
    Task<MusicResponse> GetMusicAsync(string id);
    Task<MusicResponse> UpdateMusicAsync(string id, MusicUpdateRequest request);
    Task<MusicResponse> UpdateFavoriteAsync(string id, MusicUpdateFavoriteRequest request);
    Task RemoveMusicAsync(string id);
}