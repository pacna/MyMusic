using System.ComponentModel.DataAnnotations;

namespace Edge.MyMusic.Controllers.Models;

public sealed class SongPostRequest: IValidatableObject
{
    public SongPostRequest(
        string album, 
        string artist,
        string path, 
        string title)
    {
        this.Album = album;
        this.Artist = artist;
        this.Path = path;
        this.Title = title;
    }

    public string Album { get; init; }
    public string Artist { get; init; }
    public int Length { get; init; }
    public string Path { get; init; }
    public string Title { get; init; }
    public bool IsFavorite { get; init; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (this.Length <= 0)
        {
            yield return new ValidationResult($"{nameof(this.Length)} needs to be greater than 0", new[] { nameof(this.Length)});
        }
    }
}