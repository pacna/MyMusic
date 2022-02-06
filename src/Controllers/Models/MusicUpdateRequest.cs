using Api.Music.Services.Models;

namespace Api.Music.Controllers.Models
{
    public class MusicUpdateRequest
    {
        public string Artist { get; init; }
        public int Length { get; init; }
        public string Path { get; init; }
        public string Title { get; init; }

        public UpdateMusicRequest ToDataLayer()
        {
            return new UpdateMusicRequest
            {
                Artist = this.Artist,
                Length = this.Length,
                Path = this.Path,
                Title = this.Title
            };
        }
    }
}