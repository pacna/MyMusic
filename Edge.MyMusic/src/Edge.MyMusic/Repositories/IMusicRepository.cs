using Edge.MyMusic.Repositories.Models.Documents;

namespace Edge.MyMusic.Repositories;

public interface IMusicRepository
{
    Task<List<MusicDocument>> SearchMusicAsync();
    Task<MusicDocument?> GetMusicAsync(string id);
}