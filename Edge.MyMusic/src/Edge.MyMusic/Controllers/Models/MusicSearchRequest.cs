using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Controllers.Models;

public sealed class MusicSearchRequest
{
    public bool IsFavorite { get; init; }
#nullable disable

    public List<AlphabetType> ArtistAlphabetCategories { get; init; }

    public string SortBy { get; init; }

    public string Title { get; init; }
#nullable enable
}