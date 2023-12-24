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
    public string Path { get; init; }
    public string Title { get; init; }
    public bool IsFavorite { get; init; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return Validate(new Dictionary<string, string>
        {
            { nameof(this.Album), this.Album},
            { nameof(this.Artist), this.Artist},
            { nameof(this.Path), this.Path},
            { nameof(this.Title), this.Title},
        });
    }

    internal IEnumerable<ValidationResult> Validate(IReadOnlyDictionary<string, string> propertiesAndValues)
    {
        foreach(KeyValuePair<string, string> kv in propertiesAndValues)
        {
            if (string.IsNullOrWhiteSpace(kv.Value))
            {
                yield return new ValidationResult($"{kv.Key} cannot be empty", new[] { kv.Key});
            }
        }
    }
}