using System;
using MongoDB.Driver;
using Api.Music.Repositories.Documents;

namespace Api.Music.Repositories
{
    internal class MongoDataStore
    {
        private MongoClient _client;

        internal MongoDataStore(string collectionName)
        {
            this._client = new MongoClient("mongodb://localhost:27017");

        }
        internal void Setup()
        {
            try
            {
                IMongoDatabase database = this._client.GetDatabase("music");
                IMongoCollection<MusicDocument> collection = database.GetCollection<MusicDocument>("music");
            }
            catch (Exception exception)
            {
                Console.WriteLine($"Unable to connect to database {exception.ToString()}");
            }
        }
    }
}