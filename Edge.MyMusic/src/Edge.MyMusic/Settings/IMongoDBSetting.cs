namespace Edge.MyMusic.Settings;

public interface IMongoDBSetting
{
    string? ConnectionString { get; init; }
    string? DatabaseName { get; init; }
}