using Api.Music.Repositories.Models;

namespace Api.Music.Services.Models
{
    public class UpdateFavoriteMusicRequest : IMusicUpdateFavoriteQuery
    {
        public bool IsFavorite { get; init; }
    }
}