namespace Edge.MyMusic.Settings;

internal interface IArgsSetting
{
    string? AudiosPath { get; set; }
    bool UseInMemory { get; set; }
    bool UseWebApp { get; set; }
}