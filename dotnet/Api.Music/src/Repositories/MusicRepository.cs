using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;
using Api.Music.Repositories.Documents;
using Api.Music.Repositories.Settings;
using MongoDB.Driver;

namespace Api.Music.Repositories
{
    public class MusicRepository : MongoRepository<MusicDocument>, IMusicRepository
    {
        private FilterDefinitionBuilder<MusicDocument> filterBuilder = Builders<MusicDocument>.Filter;
        private UpdateDefinitionBuilder<MusicDocument> updateBuilder = Builders<MusicDocument>.Update;
        private SortDefinitionBuilder<MusicDocument> sortBuilder = Builders<MusicDocument>.Sort;

        public MusicRepository(IMongoDBSetting setting) : base(setting: setting, collectionName: "music")
        {
        }

        public async Task<List<MusicDocument>> SearchMusic(MusicSearchRequest request)
        {
            FilterDefinition<MusicDocument> filter = CreateFilterDefinitionForSearch(request: request);

            if (!string.IsNullOrEmpty(request.SortBy))
            {
                SortDefinition<MusicDocument> sort = CreateAscendingSortDefinitionForSearch(sortBy: request.SortBy);
                return await base.FindAsync(filter, sort);
            }

            return await base.FindAsync(filter);
        }

        public async Task<MusicDocument> AddMusic(MusicDocument doc)
        {
            return await base.InsertOneAsync(doc);
        }

        public async Task<MusicDocument> GetMusic(string id)
        {
            FilterDefinition<MusicDocument> filter = CreateFilterDefinitionToFindById(id: id);
            return await base.FindAsync(id: id, filter: filter);
        }

        public async Task UpdateMusic(string id, MusicUpdateRequest request)
        {
            FilterDefinition<MusicDocument> filter = CreateFilterDefinitionToFindById(id: id);
            UpdateDefinition<MusicDocument> update = BuildUpdateDefinition(request: request);

            await base.UpdateAsync(filter: filter, update: update);
        }

        public async Task RemoveMusic(string id)
        {
            FilterDefinition<MusicDocument> filter = CreateFilterDefinitionToFindById(id: id);
            await base.RemoveOneAsync(filter);
        }

        public async Task UpdateFavorite(string id, MusicUpdateFavoriteRequest request)
        {
            FilterDefinition<MusicDocument> filter = CreateFilterDefinitionToFindById(id: id);
            List<UpdateDefinition<MusicDocument>> updates = new List<UpdateDefinition<MusicDocument>>();

            updates.Add(updateBuilder.Set(m => m.IsFavorite, request.IsFavorite));
            updates.Add(updateBuilder.Set(m => m.UpdatedDate, DateTime.UtcNow));

            await base.UpdateAsync(filter: filter, update: updateBuilder.Combine(updates));
        }

        private UpdateDefinition<MusicDocument> BuildUpdateDefinition(MusicUpdateRequest request)
        {
            List<UpdateDefinition<MusicDocument>> updates = new List<UpdateDefinition<MusicDocument>>();

            if (!string.IsNullOrEmpty(request.Artist))
            {
                updates.Add(updateBuilder.Set(m => m.Artist, request.Artist));
            }

            if (request.Length > 0)
            {
                updates.Add(updateBuilder.Set(m => m.Length, request.Length));
            }

            if (!string.IsNullOrEmpty(request.Path))
            {
                updates.Add(updateBuilder.Set(m => m.Path, request.Path));
            }

            if (!string.IsNullOrEmpty(request.Title))
            {
                updates.Add(updateBuilder.Set(m => m.Title, request.Title));
            }

            updates.Add(updateBuilder.Set(m => m.UpdatedDate, DateTime.UtcNow));

            return updateBuilder.Combine(updates);
        }

        private SortDefinition<MusicDocument> CreateAscendingSortDefinitionForSearch(string sortBy)
        {
            return sortBuilder.Ascending(sortBy);
        }

        private FilterDefinition<MusicDocument> CreateFilterDefinitionForSearch(MusicSearchRequest request)
        {
            List<FilterDefinition<MusicDocument>> filters = new List<FilterDefinition<MusicDocument>>();

            if (request.IsFavorite.HasValue)
            {
                filters.Add(filterBuilder.Eq(m => m.IsFavorite, request.IsFavorite));
            }

            if (!request.ArtistAlphabetCategories.IsNullOrEmpty())
            {
                filters.Add(filterBuilder.In(m => m.ArtistAlphabetIndex, request.ArtistAlphabetCategories));
            }

            return filters.Any() ? filterBuilder.And(filters) : filterBuilder.Empty;
        }

        private FilterDefinition<MusicDocument> CreateFilterDefinitionToFindById(string id)
        {
            return filterBuilder.Eq(m => m.Id, id);
        }
    }
}