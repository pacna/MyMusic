using System.ComponentModel.DataAnnotations;
using Edge.MyMusic.Services.Models;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Controllers.Models;

public sealed class SongPutRequest : IValidatableObject, IMusicUpdateQuery
{
    public string? Album { get; init; }
    public string? Artist { get; init; }
    public int? Length { get; init; }
    public string? Path { get; init; }
    public string? Title { get; init; }
    public bool? IsFavorite { get; init; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return Validate(new Dictionary<string, string?>
        {
            { nameof(this.Album), this.Album},
            { nameof(this.Artist), this.Artist},
            { nameof(this.Path), this.Path},
            { nameof(this.Title), this.Title},
        });
    }

    internal IEnumerable<ValidationResult> Validate(IReadOnlyDictionary<string, string?> propertiesAndValues)
    {
        if (this.Length <= 0)
        {
            yield return new ValidationResult($"{nameof(this.Length)} needs to be greater than 0", new[] { nameof(this.Length)});
        }

        foreach(KeyValuePair<string, string?> kv in propertiesAndValues)
        {
            if (kv.Value == null)
            {
                continue;
            }

            if (kv.Value.IsEmptyOrWhiteSpace())
            {
                yield return new ValidationResult($"{kv.Key} cannot be empty", new[] { kv.Key});
            }
        }
    }
}