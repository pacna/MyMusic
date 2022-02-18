using System.Collections.Generic;
using Api.Music.Repositories.Models;
using Api.Music.Services.Models;

namespace Api.Music.Controllers.Models
{
    public class MusicSearchRequest
    {
        public bool? IsFavorite { get; init; }

        public List<AlphabetType> ArtistAlphabetCategories { get; init; }

        public string SortBy { get; init; }

        public string Title { get; init; }

        public SearchMusicRequest ToDataLayer()
        {
            return new SearchMusicRequest
            {
                IsFavorite = this.IsFavorite,
                ArtistAlphabetIndices = this.ArtistAlphabetCategories,
                SortBy = this.SortBy,
                Title = this.Title
            };
        }

    }
}