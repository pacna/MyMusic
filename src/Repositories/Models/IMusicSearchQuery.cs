using System.Collections.Generic;

namespace Api.Music.Repositories.Models
{
    public interface IMusicSearchQuery
    {
        bool? IsFavorite { get; init; }
        List<AlphabetType> ArtistAlphabetIndices { get; init; }
        public string SortBy { get; init; }
    }
}