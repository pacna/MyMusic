namespace Edge.MyMusic.Controllers.Models;

public sealed class MusicFavoritePatchRequest
{
    public bool IsFavorite { get; init; }

    internal MusicPutRequest ToRequest()
    {
        return new MusicPutRequest
        {
            IsFavorite = this.IsFavorite
        };
    }
}