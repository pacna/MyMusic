using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Services.Models;

namespace Edge.MyMusic.Repositories;

public interface IMusicRepository
{
    Task<List<MusicDocument>> SearchMusicAsync(IMusicSearchQuery query);
    Task<MusicDocument> AddMusicAsync(MusicDocument doc);
    Task<MusicDocument?> GetMusicAsync(string id);
}