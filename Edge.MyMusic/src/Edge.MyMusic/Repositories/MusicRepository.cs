using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Services.Models;
using Edge.MyMusic.Settings;
using Edge.MyMusic.Shared;
using MongoDB.Driver;

namespace Edge.MyMusic.Repositories;

internal class MusicRepository(ILogger<MusicRepository> logger, IMongoDBSetting setting) : BaseMongoRepository<MusicDocument>(logger, setting), IMusicRepository
{
    protected override string CollectionName => "music";

    public async Task<CollectionModel<MusicDocument>> SearchMusicAsync(IMusicSearchQuery query, IPaging pagingInfo)
    {
        FilterDefinition<MusicDocument> filter = query.ToFilterDefinition();

        return new CollectionModel<MusicDocument>
        {
            List = await base.FindAsync(pagingInfo, query.ToFilterDefinition(), query.ToSortDefinition()).ToListAsync(),
            Total = await this.RawCollection.CountDocumentsAsync(filter)
        };
    }

    public Task<MusicDocument> AddMusicAsync(MusicDocument doc)
    {
        return base.InsertOneAsync(doc);
    }

    public Task<MusicDocument?> GetMusicAsync(string id)
    {
        return base.FindByAsync(id)!;
    }

    public Task<MusicDocument?> UpdateMusicAsync(string id, IMusicUpdateQuery query)
    {
        return base.FindOneAndUpdateAsync(id, query.ToUpdateDefinition())!;
    }

    public Task DeleteMusicAsync(string id)
    {
        return base.RemoveOneAsync(id);
    }
}