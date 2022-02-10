using System;
using Api.Music.Controllers.Models;
using Api.Music.Repositories.Documents;
using Api.Music.Repositories.Models;

namespace Api.Music.Services
{
    internal static class MusicMongoMapper
    {
        internal static MusicDocument Map(MusicAddRequest request)
        {
            return new MusicDocument
            {
                Album = request.Album,
                Artist = request.Artist,
                ArtistAlphabetIndex = CalculateAlphabetIndex(artistFirstChar: request.Artist[0]),
                IsFavorite = request.IsFavorite,
                Length = request.Length,
                Path = request.Path,
                Title = request.Title,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };
        }

        private static AlphabetType CalculateAlphabetIndex(char artistFirstChar)
        {
            int alphabetIndex = (int)artistFirstChar % 32;

            return (AlphabetType)alphabetIndex - 1;
        }
    }
}