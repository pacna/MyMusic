using System;
using MongoDB.Driver;
using Api.Music.Repositories.Settings;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Api.Music.Repositories
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

        public async Task<List<TDocument>> FindAsync(FilterDefinition<TDocument> filter)
        {
            return await this._collection.Find<TDocument>(filter).ToListAsync();
        }

        public async Task<List<TDocument>> FindAsync(FilterDefinition<TDocument> filter, SortDefinition<TDocument> sort)
        {
            return await this._collection.Find<TDocument>(filter).Sort(sort).ToListAsync();
        }

        public async Task<TDocument> FindAsync(string id, FilterDefinition<TDocument> filter)
        {
            return await this._collection.Find<TDocument>(filter).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update)
        {
            await this._collection.UpdateOneAsync(filter, update);
        }

        public async Task<TDocument> InsertOneAsync(TDocument doc)
        {
            await this._collection.InsertOneAsync(doc);
            return doc;
        }

        public async Task RemoveOneAsync(FilterDefinition<TDocument> filter)
        {
            await this._collection.DeleteOneAsync(filter);
        }

    }
}