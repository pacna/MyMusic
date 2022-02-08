namespace Api.Music.Settings
{
    public class MongoDBSetting : IMongoDBSetting
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }
    }
}