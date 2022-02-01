namespace Api.Music.Controllers.Models
{
    public class MusicUpdateFavoriteRequest : BaseUpdateRequest
    {
        public bool IsFavorite { get; init; }
    }
}