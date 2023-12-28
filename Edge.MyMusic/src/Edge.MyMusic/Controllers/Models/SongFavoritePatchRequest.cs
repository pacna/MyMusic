namespace Edge.MyMusic.Controllers.Models;

public sealed class SongFavoritePatchRequest
{
    public bool IsFavorite { get; init; }

    public SongPutRequest ToRequest()
    {
        return new SongPutRequest
        {
            IsFavorite = this.IsFavorite
        };
    }
}