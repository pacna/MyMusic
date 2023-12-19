namespace Edge.MyMusic.Controllers.Models;

public sealed class SongFavoritePatchRequest
{
    public bool IsFavorite { get; init; }

    internal SongPutRequest ToRequest()
    {
        return new SongPutRequest
        {
            IsFavorite = this.IsFavorite
        };
    }
}