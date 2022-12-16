namespace Edge.LitMusic.Repositories.Models;
public interface IMusicUpdateQuery
{
    string Album { get; init; }
    string Artist { get; init; }
    int Length { get; init; }
    string Path { get; init; }
    string Title { get; init; }
    bool? IsFavorite { get; init; }
}