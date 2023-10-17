using MongoDB.Driver;
using Edge.LitMusic.Settings;

namespace Edge.LitMusic.Repositories;
internal abstract class MongoRepository<TDocument>
{
    private readonly IMongoCollection<TDocument> _collection;

    protected abstract string CollectionName { get; }

    public MongoRepository(IMongoDBSetting setting)
    {
        try
        {
            IMongoDatabase database = new MongoClient(connectionString: setting.ConnectionString).GetDatabase(name: setting.DatabaseName);
            this._collection = database.GetCollection<TDocument>(this.CollectionName);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Unable to connect to Mongo {ex}");
        }
    }

    public Task<List<TDocument>> FindAsync(FilterDefinition<TDocument> filter)
    {
        return this._collection.Find<TDocument>(filter).ToListAsync();
    }

    public Task<List<TDocument>> FindAsync(FilterDefinition<TDocument> filter, SortDefinition<TDocument> sort)
    {
        return this._collection.Find<TDocument>(filter).Sort(sort).ToListAsync();
    }

    public Task<TDocument> FindByAsync(FilterDefinition<TDocument> filter)
    {
        return this._collection.Find<TDocument>(filter).FirstOrDefaultAsync();
    }

    public Task UpdateAsync(FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update)
    {
        return this._collection.UpdateOneAsync(filter, update);
    }

    public Task<TDocument> FindOneAndUpdateAsync(FilterDefinition<TDocument> filter, IEnumerable<UpdateDefinition<TDocument>> update, CancellationToken cancellationToken = default)
    {
        return this._collection.FindOneAndUpdateAsync(filter, Builders<TDocument>.Update.Combine(update), new FindOneAndUpdateOptions<TDocument, TDocument> { ReturnDocument = ReturnDocument.After }, cancellationToken);
    }

    public async Task<TDocument> InsertOneAsync(TDocument doc)
    {
        await this._collection.InsertOneAsync(doc);
        return doc;
    }

    public Task RemoveOneAsync(FilterDefinition<TDocument> filter)
    {
        return this._collection.DeleteOneAsync(filter);
    }
}