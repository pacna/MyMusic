using Api.Music.Repositories.Models;

namespace Api.Music.Services.Models
{
    public class UpdateMusicRequest : IMusicUpdateQuery
    {
        public string Artist { get; init; }
        public int Length { get; init; }
        public string Path { get; init; }
        public string Title { get; init; }
        public bool? IsFavorite { get; init; }
    }
}