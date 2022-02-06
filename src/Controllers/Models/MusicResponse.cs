using Api.Music.Repositories.Models;

namespace Api.Music.Controllers.Models
{
    public class MusicResponse
    {
        public string Artist { get; init; }
        public AlphabetType ArtistAlphabetCategory { get; init; }
        public string Id { get; init; }
        public bool IsFavorite { get; init; }
        public int Length { get; init; }
        public string Path { get; init; }
        public string Title { get; init; }
    }
}