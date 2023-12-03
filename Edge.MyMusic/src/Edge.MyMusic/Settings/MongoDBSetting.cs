namespace Edge.MyMusic.Settings;

internal class MongoDBSetting : IMongoDBSetting
{
#nullable disable
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
#nullable enable
}