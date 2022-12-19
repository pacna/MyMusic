namespace Edge.LitMusic.Controllers.Models;
public class MusicAddRequest : MusicUpdateRequest
{
    public bool IsFavorite { get; init; }
}