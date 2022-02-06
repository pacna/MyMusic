using Api.Music.Services.Models;

namespace Api.Music.Controllers.Models
{
    public class MusicUpdateFavoriteRequest
    {
        public bool IsFavorite { get; init; }

        public UpdateMusicRequest ToDataLayer()
        {
            return new UpdateMusicRequest
            {
                IsFavorite = this.IsFavorite
            };
        }
    }
}