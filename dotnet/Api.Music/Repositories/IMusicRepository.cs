using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Repositories.Documents;

namespace Api.Music.Repositories
{
    public interface IMusicRepository
    {
        Task<List<MusicDocument>> SearchMusic();
        Task<MusicDocument> AddMusic();
    }
}