using System;
using Api.Music.Controllers.Models;
using Api.Music.Repositories.Documents;
using Api.Music.Repositories.Helpers;

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
                ArtistAlphabetIndex = MusicHelper.CalculateAlphabetIndex(artistFirstChar: request.Artist[0]),
                IsFavorite = request.IsFavorite,
                Length = request.Length,
                Path = request.Path,
                Title = request.Title,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };
        }
    }
}