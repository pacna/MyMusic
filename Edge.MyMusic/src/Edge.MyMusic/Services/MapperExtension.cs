using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Services;

internal static class MapperExtension
{
    public static MusicDocument ToDocument(this MusicPostRequest request)
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

    public static CollectionModel<MusicResponse> ToResponse(this List<MusicDocument> docs)
    {
        return new CollectionModel<MusicResponse>
        {
            List = docs.ConvertAll(m => m.ToResponse()),
            Num = 1,
            Total = docs.Count
        };
    }

    public static MusicResponse ToResponse(this MusicDocument doc)
    {
        return new MusicResponse
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