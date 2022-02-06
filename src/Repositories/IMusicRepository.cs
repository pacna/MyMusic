using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Repositories.Documents;
using Api.Music.Services.Models;

namespace Api.Music.Repositories
{
    public interface IMusicRepository
    {
        Task<List<MusicDocument>> SearchMusicAsync(SearchMusicRequest request);
        Task<MusicDocument> AddMusicAsync(MusicDocument doc);
        Task<MusicDocument> GetMusicAsync(string id);
        Task UpdateMusicAsync(string id, UpdateMusicRequest request);
        Task RemoveMusicAsync(string id);
        Task UpdateFavoriteAsync(string id, UpdateMusicRequest request);
    }
}