using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Repositories.Documents;

namespace Api.Music.Repositories
{
    public class MusicInMemory : IMusicRepository
    {
        private static Dictionary<string, MusicDocument> musicInMemory;

        static MusicInMemory()
        {
            musicInMemory = new Dictionary<string, MusicDocument>();
        }

        public async Task<List<MusicDocument>> SearchMusic()
        {
            return new List<MusicDocument>();
        }

        public async Task<MusicDocument> AddMusic()
        {
            return new MusicDocument();
        }
    }
}