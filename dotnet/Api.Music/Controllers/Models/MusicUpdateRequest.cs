namespace Api.Music.Controllers.Models
{
    public class MusicUpdateRequest : BaseUpdateRequest
    {
        public string Artist { get; init; }
        public int Length { get; init; }
        public string Path { get; init; }
        public string Title { get; init; }
    }
}