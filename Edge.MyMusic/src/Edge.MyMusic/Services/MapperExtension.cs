using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Repositories.Models.Documents;

namespace Edge.MyMusic.Services;

public static class MapperExtension
{
    public static List<MusicResponse> ToResponse(this List<MusicDocument> docs)
    {
        return docs.ConvertAll(m => m.ToResponse());
    }

    public static MusicResponse ToResponse(this MusicDocument doc)
    {
        return new MusicResponse
        {
            Album = doc.Album,
            Artist = doc.Artist,
            ArtistAlphabetCategory = doc.ArtistAlphabetIndex,
            Id = doc.Id,
            IsFavorite = doc.IsFavorite,
            Length = doc.Length,
            Path = doc.Path,
            Title = doc.Title
        };
    }
}