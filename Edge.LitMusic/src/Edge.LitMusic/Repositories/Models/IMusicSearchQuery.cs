using System.Collections.Generic;

namespace Edge.LitMusic.Repositories.Models
{
    public interface IMusicSearchQuery
    {
        bool? IsFavorite { get; init; }
        List<AlphabetType> ArtistAlphabetIndices { get; init; }
        string SortBy { get; init; }
        string Title { get; init; }
    }
}