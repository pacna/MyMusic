using System.Collections.Generic;
using System.Threading.Tasks;
using Edge.LitMusic.Controllers.Models;
using Edge.LitMusic.Repositories;
using Edge.LitMusic.Repositories.Documents;

namespace Edge.LitMusic.Services;
public class MusicService : IMusicService
{
    private readonly IMusicRepository _musicRepo;
    private readonly IValidationService _validationService;

    public MusicService(IMusicRepository musicRepo, IValidationService validationService)
    {
        this._musicRepo = musicRepo;
        this._validationService = validationService;
    }

    public async Task<List<MusicResponse>> SearchMusicAsync(MusicSearchRequest request)
    {
        List<MusicDocument> musics = await this._musicRepo.SearchMusicAsync(request: request.ToDataLayer());
        return MusicMapper.Map(musics: musics);
    }

    public async Task<MusicResponse> AddMusicAsync(MusicAddRequest request)
    {
        this._validationService.ThrowIfInvalid(request: request);

        MusicDocument doc = MusicMongoMapper.Map(request: request);
        return MusicMapper.Map(await this._musicRepo.AddMusicAsync(doc));
    }

    public async Task<MusicResponse> GetMusicAsync(string id)
    {
        MusicDocument music = await this._musicRepo.GetMusicAsync(id: id);
        return MusicMapper.Map(music: music);
    }

    public async Task<MusicResponse> UpdateMusicAsync(string id, MusicUpdateRequest request)
    {
        return MusicMapper.Map(await this._musicRepo.UpdateMusicAsync(id: id, request: request.ToDataLayer()));
    }

    public Task RemoveMusicAsync(string id)
    {
        return this._musicRepo.RemoveMusicAsync(id: id);
    }

    public async Task<MusicResponse> UpdateFavoriteAsync(string id, MusicUpdateFavoriteRequest request)
    {
        return MusicMapper.Map(await this._musicRepo.UpdateFavoriteAsync(id: id, request: request.ToDataLayer()));
    }
}