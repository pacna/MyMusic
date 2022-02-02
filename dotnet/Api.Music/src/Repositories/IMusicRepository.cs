using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;
using Api.Music.Repositories.Documents;

namespace Api.Music.Repositories
{
    public interface IMusicRepository
    {
        Task<List<MusicDocument>> SearchMusicAsync(MusicSearchRequest request);
        Task<MusicDocument> AddMusicAsync(MusicDocument doc);
        Task<MusicDocument> GetMusicAsync(string id);
        Task UpdateMusicAsync(string id, MusicUpdateRequest request);
        Task RemoveMusicAsync(string id);
        Task UpdateFavoriteAsync(string id, MusicUpdateFavoriteRequest request);
    }
}