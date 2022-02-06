namespace Api.Music.Repositories.Settings
{
    public class MongoDBSetting : IMongoDBSetting
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }
    }
}