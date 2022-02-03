using Api.Music.Services.Models;

namespace Api.Music.Controllers.Models
{
    public class MusicUpdateFavoriteRequest
    {
        public bool IsFavorite { get; init; }

        public UpdateFavoriteMusicRequest ToDataLayer()
        {
            return new UpdateFavoriteMusicRequest
            {
                IsFavorite = this.IsFavorite
            };
        }
    }
}