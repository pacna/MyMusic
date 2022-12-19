using Edge.LitMusic.Repositories.Models;

namespace Edge.LitMusic.Services.Models;
public class UpdateMusicRequest : IMusicUpdateQuery
{
    public string Album { get; init; }
    public string Artist { get; init; }
    public int Length { get; init; }
    public string Path { get; init; }
    public string Title { get; init; }
    public bool? IsFavorite { get; init; }
}