using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;
using Api.Music.Repositories.Documents;
using Api.Music.Repositories.Settings;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Api.Music.Repositories
{
    public class MusicRepository : MongoRepository<MusicDocument>, IMusicRepository
    {
        private FilterDefinitionBuilder<MusicDocument> builder = Builders<MusicDocument>.Filter;
        public MusicRepository(IMongoDBSetting setting) : base(setting: setting, collectionName: "music")
        {
        }

        public async Task<List<MusicDocument>> SearchMusic()
        {
            FilterDefinition<MusicDocument> filter = FilterDefinition<MusicDocument>.Empty;
            return await base.FindAsync(filter);
        }

        public async Task<MusicDocument> AddMusic(MusicAddRequest request)
        {
            MusicDocument doc = new MusicDocument
            {
                Artist = request.Artist,
                IsFavorite = request.IsFavorite,
                Length = request.Length,
                Path = request.Path,
                Title = request.Title,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };

            return await base.InsertOneAsync(doc);
        }

        public async Task<MusicDocument> GetMusic(string id)
        {
            FilterDefinition<MusicDocument> filter = FilterDefinitionToFindById(id: id);
            return await base.FindAsync(id: id, filter: filter);
        }

        public async Task UpdateMusic(string id, MusicUpdateRequest request)
        {
            FilterDefinition<MusicDocument> filter = FilterDefinitionToFindById(id: id);
            UpdateDefinition<MusicDocument> update = BuildUpdateDefinition(request: request);

            await base.UpdateAsync(filter: filter, update: update);
        }

        public async Task RemoveMusic(string id)
        {
            FilterDefinition<MusicDocument> filter = FilterDefinitionToFindById(id: id);
            await base.RemoveOneAsync(filter);
        }

        public async Task UpdateFavorite(string id, MusicUpdateFavoriteRequest request)
        {
            FilterDefinition<MusicDocument> filter = FilterDefinitionToFindById(id: id);

            if (request.IsFavorite.HasValue)
            {
                UpdateDefinitionBuilder<MusicDocument> update = Builders<MusicDocument>.Update;
                List<UpdateDefinition<MusicDocument>> updates = new List<UpdateDefinition<MusicDocument>>();
                updates.Add(update.Set(nameof(request.IsFavorite), request.IsFavorite.Value));
                updates.Add(update.Set("UpdatedDate", DateTime.UtcNow));
                await base.UpdateAsync(filter: filter, update: update.Combine(updates));
            }

        }

        private UpdateDefinition<MusicDocument> BuildUpdateDefinition(MusicUpdateRequest request)
        {
            UpdateDefinitionBuilder<MusicDocument> update = Builders<MusicDocument>.Update;
            List<UpdateDefinition<MusicDocument>> updates = new List<UpdateDefinition<MusicDocument>>();

            if (!string.IsNullOrEmpty(request.Artist))
            {
                updates.Add(update.Set(nameof(request.Artist), request.Artist));
            }

            if (request.Length > 0)
            {
                updates.Add(update.Set(nameof(request.Length), request.Length));
            }

            if (!string.IsNullOrEmpty(request.Path))
            {
                updates.Add(update.Set(nameof(request.Path), request.Path));
            }

            if (!string.IsNullOrEmpty(request.Title))
            {
                updates.Add(update.Set(nameof(request.Title), request.Title));
            }

            updates.Add(update.Set("UpdatedDate", DateTime.UtcNow));

            return update.Combine(updates);
        }

        private FilterDefinition<MusicDocument> FilterDefinitionToFindById(string id)
        {
            return builder.Eq("_id", ObjectId.Parse(id));
        }
    }
}