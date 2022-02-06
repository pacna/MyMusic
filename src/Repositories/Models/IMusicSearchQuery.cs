using System.Collections.Generic;

namespace Api.Music.Repositories.Models
{
    public interface IMusicSearchQuery
    {
        bool? IsFavorite { get; init; }
        List<AlphabetType> ArtistAlphabetIndices { get; init; }
        string SortBy { get; init; }
    }
}