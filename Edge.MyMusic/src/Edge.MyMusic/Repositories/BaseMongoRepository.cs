using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Settings;
using Edge.MyMusic.Shared;
using MongoDB.Driver;

namespace Edge.MyMusic.Repositories;

internal abstract class BaseMongoRepository<TDocument> where TDocument : notnull, BaseDocument
{
    private readonly IMongoCollection<TDocument> _collection;

    public BaseMongoRepository(ILogger<BaseMongoRepository<TDocument>> logger, IMongoDBSetting setting)
    {
        try
        {            
            IMongoDatabase database = new MongoClient(setting.ConnectionString).GetDatabase(setting.DatabaseName);
            _collection = database.GetCollection<TDocument>(CollectionName);
        }
        catch(MongoException ex)
        {
            logger.LogError($"Unable to connection to Mongo: {ex.Message}");
            throw;
        }
    }

    public async IAsyncEnumerable<TDocument> FindAsync(
        IPaging paging,
        FilterDefinition<TDocument> filter,
        SortDefinition<TDocument>? sort = null)
    {
        IFindFluent<TDocument, TDocument> query = _collection.Find(filter);

        if (sort != null)
        {
            query = query.Sort(sort);
        }

        using IAsyncCursor<TDocument> cursor = await query.Skip(paging.Idx).Limit(paging.Qty).ToCursorAsync();

        while (await cursor.MoveNextAsync())
        {
            foreach (TDocument current in cursor.Current)
            {
                yield return current;
            }
        }
    }

    public Task<TDocument> FindByAsync(string id)
    {
        return _collection.Find(GetEntityIdDefinition(id)).FirstOrDefaultAsync();
    }

    public async Task<TDocument> InsertOneAsync(TDocument doc)
    {
        await _collection.InsertOneAsync(doc);
        return doc;
    }

    public Task<TDocument> FindOneAndUpdateAsync(string id, IEnumerable<UpdateDefinition<TDocument>> updates, CancellationToken cancellationToken = default)
    {
        FindOneAndUpdateOptions<TDocument> options = new()
        {
            ReturnDocument = ReturnDocument.After,
            IsUpsert = true
        };

        return _collection.FindOneAndUpdateAsync(GetEntityIdDefinition(id), Builders<TDocument>.Update.Combine(updates), options, cancellationToken);
    }

    public Task RemoveOneAsync(string id, CancellationToken cancellationToken = default)
    {
        return _collection.DeleteOneAsync(GetEntityIdDefinition(id), cancellationToken);
    }

    protected abstract string CollectionName { get; }
    protected IMongoCollection<TDocument> RawCollection => _collection;

    protected static FilterDefinition<TDocument> GetEntityIdDefinition(string id)
    {
        return Builders<TDocument>.Filter.Eq(m => m.Id, id);;
    }
}