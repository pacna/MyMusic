using System.Collections.Generic;
using Edge.LitMusic.Repositories.Models;

namespace Edge.LitMusic.Services.Models
{
    public class SearchMusicRequest : IMusicSearchQuery
    {
        public bool? IsFavorite { get; init; }

        public List<AlphabetType> ArtistAlphabetIndices { get; init; }

        public string SortBy { get; init; }

        public string Title { get; init; }
    }
}