using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;
using Api.Music.Repositories.Documents;
using Api.Music.Repositories.Settings;

namespace Api.Music.Repositories
{
    public class MusicInMemory : IMusicRepository
    {
        private static Dictionary<string, MusicDocument> musicInMemory;

        static MusicInMemory()
        {
            musicInMemory = new Dictionary<string, MusicDocument>();
        }

        public async Task<List<MusicDocument>> SearchMusic(MusicSearchRequest request)
        {
            return musicInMemory.ToList();
        }

        public async Task<MusicDocument> AddMusic(MusicDocument doc)
        {
            musicInMemory.TryAdd(doc.Id, doc);
            return doc;
        }

        public async Task<MusicDocument> GetMusic(string id)
        {
            musicInMemory.TryGetValue(id, out MusicDocument doc);

            if (doc == null)
            {
                return null;
            }

            return doc;
        }

        public async Task UpdateMusic(string id, MusicUpdateRequest request)
        {
            musicInMemory.TryGetValue(id, out MusicDocument musicBeforeUpdate);

            if (musicBeforeUpdate == null)
            {
                return;
            }

            musicInMemory[id].Artist = request.Artist ?? musicBeforeUpdate.Artist;
            musicInMemory[id].Length = request.Length != 0 ? request.Length : musicBeforeUpdate.Length;
            musicInMemory[id].Path = request.Path ?? musicBeforeUpdate.Path;
            musicInMemory[id].Title = request.Title ?? musicBeforeUpdate.Title;
        }

        public async Task RemoveMusic(string id)
        {
            musicInMemory.Remove(id);
        }

        public async Task UpdateFavorite(string id, MusicUpdateFavoriteRequest request)
        {
            musicInMemory[id].IsFavorite = request.IsFavorite;
        }
    }
}