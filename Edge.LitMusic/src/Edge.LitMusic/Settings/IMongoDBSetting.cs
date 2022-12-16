namespace Edge.LitMusic.Settings;
public interface IMongoDBSetting
{
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
}