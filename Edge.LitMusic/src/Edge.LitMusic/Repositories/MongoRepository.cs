using System;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Collections.Generic;
using Edge.LitMusic.Settings;
using System.Threading;

namespace Edge.LitMusic.Repositories
{
    public class MongoRepository<TDocument>
    {
        private readonly IMongoCollection<TDocument> _collection;
        public MongoRepository(IMongoDBSetting setting, string collectionName)
        {
            try
            {
                IMongoDatabase database = new MongoClient(setting.ConnectionString).GetDatabase(setting.DatabaseName);
                this._collection = database.GetCollection<TDocument>(collectionName);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unable to connect to Mongo {ex.ToString()}");
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

        public Task<TDocument> FindOneAndUpdateAsync(FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update, CancellationToken cancellationToken = default)
        {
            return this._collection.FindOneAndUpdateAsync(filter, update, new FindOneAndUpdateOptions<TDocument, TDocument> { ReturnDocument = ReturnDocument.After }, cancellationToken);
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
}