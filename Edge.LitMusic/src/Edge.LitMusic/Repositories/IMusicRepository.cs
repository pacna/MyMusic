using System.Collections.Generic;
using System.Threading.Tasks;
using Edge.LitMusic.Repositories.Documents;
using Edge.LitMusic.Services.Models;

namespace Edge.LitMusic.Repositories
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