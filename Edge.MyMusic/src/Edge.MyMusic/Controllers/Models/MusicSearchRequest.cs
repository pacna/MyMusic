using Edge.MyMusic.Services.Models;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Controllers.Models;

public sealed class MusicSearchRequest : IMusicSearchQuery
{
    public List<AlphabetType>? ArtistAlphabetIndices { get; init; }

    public string? SortBy { get; init; }

    public string? Title { get; init; }
    public bool? IsFavorite { get; init; }
}