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

    public async Task<CollectionModel<MusicResponse>> SearchMusicAsync(MusicSearchRequest request)
    {
        return (await _musicRepository.SearchMusicAsync(request)).ToResponse();
    }

    public async Task<MusicResponse> AddMusicAsync(MusicPostRequest request)
    {
        return (await _musicRepository.AddMusicAsync(request.ToDocument())).ToResponse();
    }

    public async Task<MusicResponse?> GetMusicAsync(string id)
    {
        return (await _musicRepository.GetMusicAsync(id))?.ToResponse();
    }

    public async Task<MusicResponse?> UpdateMusicAsync(string id, MusicPutRequest request)
    {
        return (await _musicRepository.UpdateMusicAsync(id, request))?.ToResponse();
    }

    public Task DeleteMusicAsync(string id)
    {
        return _musicRepository.DeleteMusicAsync(id);
    }
}