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

        public async Task<List<MusicResponse>> SearchMusic()
        {
            List<MusicDocument> musics = await this._musicRepo.SearchMusic();
            return MusicMapper.Map(musics: musics);
        }

        public async Task<MusicResponse> AddMusic()
        {
            MusicDocument music = await this._musicRepo.AddMusic();
            return MusicMapper.Map(music: music);
        }
    }
}