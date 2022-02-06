namespace Api.Music.Controllers.Models
{
    public class MusicAddRequest : MusicUpdateRequest
    {
        public bool IsFavorite { get; init; }
    }
}