using Edge.MyMusic.Providers.Models;
using Edge.MyMusic.Repositories.Models.Documents;

namespace Edge.MyMusic.Processor;

internal static class MapperExtension
{
    internal static MusicDocument ToDocument(this AudioResponse from, string path)
    {
        return new MusicDocument
        {
            Album = from.Album,
            Artist = from.Artist,
            IsFavorite = false,
            Length = from.Duration,
            Path = path,
            Title = from.Title  
        };
    }
}