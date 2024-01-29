namespace Edge.MyMusic.Providers.Models;

public sealed class AudioResponse
{
    public string? Title { get; init; }
    public string? Album { get; init; }
    public string? Artist { get; init; }
    public int Duration { get; init; }
}