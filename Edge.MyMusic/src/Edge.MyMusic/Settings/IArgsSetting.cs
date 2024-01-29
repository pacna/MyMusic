namespace Edge.MyMusic.Settings;

public interface IArgsSetting
{
    string? AudiosPath { get; init; }
    string? BaseUrl { get; init; }
    bool UseInMemory { get; init; }
    bool UseWebApp { get; init; }
}