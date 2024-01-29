using System.ComponentModel.DataAnnotations;

namespace Edge.MyMusic.Controllers.Models;

public sealed class SongPostRequest(
    string album,
    string artist,
    string path,
    string title) : IValidatableObject
{
    public string Album => album;
    public string Artist => artist;
    public string Path => path;
    public string Title => title;
    public bool IsFavorite { get; init; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return Validate(new Dictionary<string, string>
        {
            { nameof(this.Album), this.Album},
            { nameof(this.Artist), this.Artist},
            { nameof(this.Title), this.Title},
        });
    }

    private IEnumerable<ValidationResult> Validate(IReadOnlyDictionary<string, string> properties)
    {
        if (!Uri.IsWellFormedUriString(this.Path, UriKind.Absolute))
        {
            yield return new ValidationResult("Invalid url", new[] { this.Path });
        }

        foreach(KeyValuePair<string, string> property in properties)
        {
            if (string.IsNullOrWhiteSpace(property.Value))
            {
                yield return new ValidationResult($"{property.Key} cannot be empty", new[] { property.Key});
            }
        }
    }
}