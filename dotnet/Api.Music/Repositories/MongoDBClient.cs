using System;
using MongoDB.Driver;
using Api.Music.Repositories.Documents;

namespace Api.Music.Repositories
{
    public class MongoDBClient : IMongoDBClient
    {
        private MongoClient _client;

        public MongoDBClient()
        {
            this._client = new MongoClient("mongodb://localhost:27017");
        }
        public void Setup()
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