using Edge.LitMusic.Services.Models;

namespace Edge.LitMusic.Controllers.Models
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