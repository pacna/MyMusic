namespace Edge.MyMusic.Services.Models;

public interface IMusicSearchQuery
{
    string? SortBy { get; init; }
    string? Title { get; init; }
    string? Artist { get; init; }
    bool? IsFavorite { get; init; }
}