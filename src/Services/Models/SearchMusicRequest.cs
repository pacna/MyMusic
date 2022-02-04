using System.Collections.Generic;
using Api.Music.Repositories.Models;

namespace Api.Music.Services.Models
{
    public class SearchMusicRequest : IMusicSearchQuery
    {
        public bool? IsFavorite { get; init; }

        public List<AlphabetType> ArtistAlphabetIndices { get; init; }

        public string SortBy { get; init; }
    }
}