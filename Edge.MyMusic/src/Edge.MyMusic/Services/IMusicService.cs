using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Services;

public interface IMusicService
{
    Task<CollectionModel<MusicResponse>> SearchMusicAsync(MusicSearchRequest request);
    Task<MusicResponse> AddMusicAsync(MusicPostRequest request);
    Task<MusicResponse?> GetMusicAsync(string id);
    Task<MusicResponse?> UpdateMusicAsync(string id, MusicPutRequest request);
    Task DeleteMusicAsync(string id);
}