using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Services;

internal static class MapperExtension
{
    public static MusicDocument ToDocument(this SongPostRequest from)
    {
        return new MusicDocument
        {
            Album = from.Album,
            Artist = from.Artist,
            IsFavorite = from.IsFavorite,
            Length = from.Length,
            Path = from.Path,
            Title = from.Title
        };
    }

    public static CollectionModel<SongResponse> ToResponse(this CollectionModel<MusicDocument> from)
    {
        return new CollectionModel<SongResponse>
        {
            List = from.List.ConvertAll(m => m.ToResponse()),
            Total = from.Total
        };
    }

    public static SongResponse ToResponse(this MusicDocument from)
    {
        return new SongResponse
        {
            Album = from.Album,
            Artist = from.Artist,
            Id = from.Id,
            IsFavorite = from.IsFavorite,
            Length = from.Length,
            Path = from.Path,
            Title = from.Title
        };
    }
}