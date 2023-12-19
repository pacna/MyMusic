using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Services;

public interface IMusicService
{
    Task<CollectionModel<SongResponse>> SearchSongsAsync(SongsSearchRequest request);
    Task<SongResponse> AddSongAsync(SongPostRequest request);
    Task<SongResponse?> GetSongAsync(string id);
    Task<SongResponse?> UpdateSongAsync(string id, SongPutRequest request);
    Task DeleteSongAsync(string id);
}