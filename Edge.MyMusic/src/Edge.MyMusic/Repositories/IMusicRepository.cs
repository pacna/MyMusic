using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Services.Models;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Repositories;

public interface IMusicRepository
{
    Task<CollectionModel<MusicDocument>> SearchMusicAsync(IMusicSearchQuery query, IPaging pagingInfo);
    Task<MusicDocument> AddMusicAsync(MusicDocument doc);
    Task<MusicDocument?> GetMusicAsync(string id);
    Task<MusicDocument?> UpdateMusicAsync(string id, IMusicUpdateQuery query);
    Task DeleteMusicAsync(string id);
}