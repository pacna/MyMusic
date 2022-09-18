using System.Collections.Generic;
using System.Threading.Tasks;
using Edge.LitMusic.Controllers.Models;

namespace Edge.LitMusic.Services
{
    public interface IMusicService
    {
        Task<List<MusicResponse>> SearchMusicAsync(MusicSearchRequest request);
        Task<MusicResponse> AddMusicAsync(MusicAddRequest request);
        Task<MusicResponse> GetMusicAsync(string id);
        Task UpdateMusicAsync(string id, MusicUpdateRequest request);
        Task RemoveMusicAsync(string id);
        Task UpdateFavoriteAsync(string id, MusicUpdateFavoriteRequest request);
    }
}