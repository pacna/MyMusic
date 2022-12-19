namespace Edge.LitMusic.Settings;
internal class MongoDBSetting : IMongoDBSetting
{
    public string ConnectionString { get; set; }

    public string DatabaseName { get; set; }
}