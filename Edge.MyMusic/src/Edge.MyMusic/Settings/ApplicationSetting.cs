namespace Edge.MyMusic.Settings;

internal class ApplicationSetting : ICORSPolicySetting, IArgsSetting, IMongoDBSetting
{
#nullable disable
    public string PolicyName { get; set; }
    public string[] AllowedOrigins { get; set; }
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
#nullable enable
    public string? AudiosPath { get; set; }
    public bool UseInMemory { get; set; }
    public bool UseWebApp { get; set; }
}