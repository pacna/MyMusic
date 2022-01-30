using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;
using Api.Music.Repositories.Documents;

namespace Api.Music.Repositories
{
    public interface IMusicRepository
    {
        Task<List<MusicDocument>> SearchMusic();
        Task<MusicDocument> AddMusic(MusicAddRequest request);
        Task<MusicDocument> GetMusic(string id);
        Task UpdateMusic(string id, MusicUpdateRequest request);
        Task RemoveMusic(string id);
        Task UpdateFavorite(string id, MusicUpdateFavoriteRequest request);
    }
}