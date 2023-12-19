using Edge.MyMusic.Services.Models;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Controllers.Models;

public sealed class SongsSearchRequest : BaseCollectionRequest, IMusicSearchQuery
{
    public string? SortBy { get; init; }
    public string? Title { get; init; }
    public string? Artist { get; init; }
    public bool? IsFavorite { get; init; }
}