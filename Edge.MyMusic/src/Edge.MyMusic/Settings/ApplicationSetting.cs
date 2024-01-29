namespace Edge.MyMusic.Settings;

internal class ApplicationSetting : IApplicationSetting
{
    public string? PolicyName { get; init; }
    public string[]? AllowedOrigins { get; init; }
    public string? ConnectionString { get; init; }
    public string? DatabaseName { get; init; }
    public string? AudiosPath { get; init; }
    public string? BaseUrl { get; init; }
    public bool UseInMemory { get; init; }
    public bool UseWebApp { get; init; }
}