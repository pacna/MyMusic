using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;

namespace Api.Music.Services
{
    public interface IMusicService
    {
        Task<List<MusicResponse>> SearchMusic(MusicSearchRequest request);
        Task<MusicResponse> AddMusic(MusicAddRequest request);
        Task<MusicResponse> GetMusic(string id);
        Task UpdateMusic(string id, MusicUpdateRequest request);
        Task RemoveMusic(string id);
        Task UpdateFavorite(string id, MusicUpdateFavoriteRequest request);
    }
}