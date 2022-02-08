using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Repositories.Documents;
using Api.Music.Services.Models;
using Api.Music.Settings;
using MongoDB.Driver;

namespace Api.Music.Repositories
{
    public class MusicRepository : MongoRepository<MusicDocument>, IMusicRepository
    {
        public MusicRepository(IMongoDBSetting setting) : base(setting: setting, collectionName: "music")
        {
        }

        public Task<List<MusicDocument>> SearchMusicAsync(SearchMusicRequest request)
        {
            FilterDefinition<MusicDocument> filter = MusicQueryBuilder.BuildSearchQuery(query: request);

            if (!string.IsNullOrEmpty(request.SortBy))
            {
                SortDefinition<MusicDocument> sort = MusicQueryBuilder.BuildSortQuery(sortBy: request.SortBy);
                return base.FindAsync(filter, sort);
            }

            return base.FindAsync(filter);
        }

        public Task<MusicDocument> AddMusicAsync(MusicDocument doc)
        {
            return base.InsertOneAsync(doc);
        }

        public Task<MusicDocument> GetMusicAsync(string id)
        {
            FilterDefinition<MusicDocument> filter = MusicQueryBuilder.BuildEntityIdQuery(id: id);
            return base.FindByAsync(filter: filter);
        }

        public Task UpdateMusicAsync(string id, UpdateMusicRequest request)
        {
            FilterDefinition<MusicDocument> filter = MusicQueryBuilder.BuildEntityIdQuery(id: id);
            UpdateDefinition<MusicDocument> update = MusicQueryBuilder.BuildUpdateQuery(query: request);

            return base.UpdateAsync(filter: filter, update: update);
        }

        public Task RemoveMusicAsync(string id)
        {
            FilterDefinition<MusicDocument> filter = MusicQueryBuilder.BuildEntityIdQuery(id: id);
            return base.RemoveOneAsync(filter);
        }

        public Task UpdateFavoriteAsync(string id, UpdateMusicRequest request)
        {
            FilterDefinition<MusicDocument> filter = MusicQueryBuilder.BuildEntityIdQuery(id: id);
            UpdateDefinition<MusicDocument> update = MusicQueryBuilder.BuildUpdateQuery(query: request);

            return base.UpdateAsync(filter: filter, update: update);
        }
    }
}