using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Services.Models;

public interface IMusicSearchQuery
{
    List<AlphabetType>? ArtistAlphabetIndices { get; init; }
    string? SortBy { get; init; }
    string? Title { get; init; }
    bool? IsFavorite { get; init; }
}