namespace Api.Music.Repositories.Models
{
    public interface IMusicUpdateQuery
    {
        string Artist { get; init; }
        int Length { get; init; }
        string Path { get; init; }
        string Title { get; init; }
        bool? IsFavorite { get; init; }
    }
}