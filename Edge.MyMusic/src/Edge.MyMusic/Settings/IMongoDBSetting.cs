namespace Edge.MyMusic.Settings;

internal interface IMongoDBSetting
{
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
}