using Edge.LitMusic.Repositories.Documents;
using Edge.LitMusic.Services.Models;
using Edge.LitMusic.Settings;
using MongoDB.Driver;

namespace Edge.LitMusic.Repositories;
internal class MusicRepository : MongoRepository<MusicDocument>, IMusicRepository
{
    protected override string CollectionName => "music";

    public MusicRepository(IMongoDBSetting setting) : base(setting: setting)
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

    public Task<MusicDocument> UpdateMusicAsync(string id, UpdateMusicRequest request)
    {
        FilterDefinition<MusicDocument> filter = MusicQueryBuilder.BuildEntityIdQuery(id: id);
        IEnumerable<UpdateDefinition<MusicDocument>> update = MusicQueryBuilder.BuildUpdateQuery(query: request);

        return base.FindOneAndUpdateAsync(filter: filter, update: update);
    }

    public Task RemoveMusicAsync(string id)
    {
        FilterDefinition<MusicDocument> filter = MusicQueryBuilder.BuildEntityIdQuery(id: id);
        return base.RemoveOneAsync(filter);
    }

    public Task<MusicDocument> UpdateFavoriteAsync(string id, UpdateMusicRequest request)
    {
        FilterDefinition<MusicDocument> filter = MusicQueryBuilder.BuildEntityIdQuery(id: id);
        IEnumerable<UpdateDefinition<MusicDocument>> update = MusicQueryBuilder.BuildUpdateQuery(query: request);

        return base.FindOneAndUpdateAsync(filter: filter, update: update);
    }
}