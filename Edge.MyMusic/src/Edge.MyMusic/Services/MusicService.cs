using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Repositories;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Services;

public class MusicService : IMusicService
{
    private readonly IMusicRepository _musicRepository;

    public MusicService(IMusicRepository musicRepository)
    {
        _musicRepository = musicRepository;
    }

    public async Task<CollectionModel<SongResponse>> SearchSongsAsync(SongSearchRequest request)
    {
        return (await _musicRepository.SearchMusicAsync(request)).ToResponse();
    }

    public async Task<SongResponse> AddSongAsync(SongPostRequest request)
    {
        return (await _musicRepository.AddMusicAsync(request.ToDocument())).ToResponse();
    }

    public async Task<SongResponse?> GetSongAsync(string id)
    {
        return (await _musicRepository.GetMusicAsync(id))?.ToResponse();
    }

    public async Task<SongResponse?> UpdateSongAsync(string id, SongPutRequest request)
    {
        return (await _musicRepository.UpdateMusicAsync(id, request))?.ToResponse();
    }

    public Task DeleteSongAsync(string id)
    {
        return _musicRepository.DeleteMusicAsync(id);
    }
}