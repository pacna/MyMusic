using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;
using Api.Music.Repositories;
using Api.Music.Repositories.Documents;

namespace Api.Music.Services
{
    public class MusicService : IMusicService
    {
        private readonly IMusicRepository _musicRepo;

        public MusicService(IMusicRepository musicRepo)
        {
            this._musicRepo = musicRepo;
        }

        public async Task<List<MusicResponse>> SearchMusic(MusicSearchRequest request)
        {
            List<MusicDocument> musics = await this._musicRepo.SearchMusic(request);
            return MusicMapper.Map(musics: musics);
        }

        public async Task<MusicResponse> AddMusic(MusicAddRequest request)
        {
            MusicDocument doc = MusicMongoMapper.Map(request: request);
            return MusicMapper.Map(await this._musicRepo.AddMusic(doc));
        }

        public async Task<MusicResponse> GetMusic(string id)
        {
            MusicDocument music = await this._musicRepo.GetMusic(id: id);
            return MusicMapper.Map(music: music);
        }

        public async Task UpdateMusic(string id, MusicUpdateRequest request)
        {
            await this._musicRepo.UpdateMusic(id: id, request: request);
        }

        public async Task RemoveMusic(string id)
        {
            await this._musicRepo.RemoveMusic(id: id);
        }

        public async Task UpdateFavorite(string id, MusicUpdateFavoriteRequest request)
        {
            await this._musicRepo.UpdateFavorite(id: id, request: request);
        }
    }
}