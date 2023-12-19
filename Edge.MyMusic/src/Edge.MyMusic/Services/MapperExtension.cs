using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Services;

internal static class MapperExtension
{
    public static MusicDocument ToDocument(this SongPostRequest request)
    {
        return new MusicDocument
        {
            Album = request.Album,
            Artist = request.Artist,
            IsFavorite = request.IsFavorite,
            Length = request.Length,
            Path = request.Path,
            Title = request.Title
        };
    }

    public static CollectionModel<SongResponse> ToResponse(this List<MusicDocument> docs)
    {
        return new CollectionModel<SongResponse>
        {
            List = docs.ConvertAll(m => m.ToResponse()),
            Total = docs.Count
        };
    }

    public static SongResponse ToResponse(this MusicDocument doc)
    {
        return new SongResponse
        {
            Album = doc.Album,
            Artist = doc.Artist,
            Id = doc.Id,
            IsFavorite = doc.IsFavorite,
            Length = doc.Length,
            Path = doc.Path,
            Title = doc.Title
        };
    }
}