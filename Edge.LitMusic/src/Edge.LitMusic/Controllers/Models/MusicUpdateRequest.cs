using Edge.LitMusic.Services.Models;

namespace Edge.LitMusic.Controllers.Models;
public class MusicUpdateRequest
{
    public string Album { get; init; }
    public string Artist { get; init; }
    public int Length { get; init; }
    public string Path { get; init; }
    public string Title { get; init; }

    public UpdateMusicRequest ToDataLayer()
    {
        return new UpdateMusicRequest
        {
            Album = this.Album,
            Artist = this.Artist,
            Length = this.Length,
            Path = this.Path,
            Title = this.Title
        };
    }
}
