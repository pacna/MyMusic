using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Repositories;

namespace Edge.MyMusic.Services;

public class MusicService : IMusicService
{
    private readonly IMusicRepository _musicRepository;

    public MusicService(IMusicRepository musicRepository)
    {
        this._musicRepository = musicRepository;
    }

    public async Task<MusicResponse?> GetMusicAsync(string id)
    {
        return (await this._musicRepository.GetMusicAsync(id))?.ToResponse();
    }

    public async Task<List<MusicResponse>> SearchMusicAsync(MusicSearchRequest request)
    {
        return (await this._musicRepository.SearchMusicAsync()).ToResponse();
    }
}