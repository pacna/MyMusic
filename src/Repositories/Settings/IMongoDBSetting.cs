namespace Api.Music.Repositories.Settings
{
    public interface IMongoDBSetting
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}