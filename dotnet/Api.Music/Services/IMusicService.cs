using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;

namespace Api.Music.Services
{
    public interface IMusicService
    {
        Task<List<MusicResponse>> SearchMusic();
        Task<MusicResponse> AddMusic();
    }
}