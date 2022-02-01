using System.Collections.Generic;
using Api.Music.Repositories.Models;

namespace Api.Music.Controllers.Models
{
    public class MusicSearchRequest
    {
        public bool? IsFavorite { get; init; }

        public List<AlphabetType> ArtistAlphabetCategories { get; init; }

        public string SortBy { get; init; }

    }
}