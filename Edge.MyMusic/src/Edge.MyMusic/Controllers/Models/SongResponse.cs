namespace Edge.MyMusic.Controllers.Models;

public sealed class SongResponse
{
#nullable disable
    public string Album { get; init; }
    public string Artist { get; init; }
    public string Id { get; init; }
    public bool IsFavorite { get; init; }
    public int Length { get; init; }
    public string Path { get; init; }
    public string Title { get; init; }
#nullable enable
}