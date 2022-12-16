using System.Collections.Generic;
using Edge.LitMusic.Controllers.Models;
using Edge.LitMusic.Repositories.Documents;

namespace Edge.LitMusic.Services;
internal static class MusicMapper
{
    internal static List<MusicResponse> Map(List<MusicDocument> musics)
    {
        return musics.ConvertAll<MusicResponse>(m => Map(music: m));
    }

    internal static MusicResponse Map(MusicDocument music)
    {
        return music == null
            ? null
            : new MusicResponse
            {
                Album = music.Album,
                Artist = music.Artist,
                ArtistAlphabetCategory = music.ArtistAlphabetIndex,
                Id = music.Id,
                IsFavorite = music.IsFavorite,
                Length = music.Length,
                Path = music.Path,
                Title = music.Title,
            };
    }
}