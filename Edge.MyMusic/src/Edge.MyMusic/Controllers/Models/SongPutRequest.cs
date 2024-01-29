using System.ComponentModel.DataAnnotations;
using Edge.MyMusic.Services.Models;
using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Controllers.Models;

public sealed class SongPutRequest : IValidatableObject, IMusicUpdateQuery
{
    public string? Album { get; init; }
    public string? Artist { get; init; }

    [Range(1, int.MaxValue)]
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
            { nameof(this.Title), this.Title},
        });
    }

    private IEnumerable<ValidationResult> Validate(IReadOnlyDictionary<string, string?> properties)
    {

        if (!string.IsNullOrEmpty(this.Path) && !Uri.IsWellFormedUriString(this.Path, UriKind.Absolute))
        {
            yield return new ValidationResult("Invalid url", new[] { this.Path });
        }

        foreach(KeyValuePair<string, string?> property in properties.Where(kv => kv.Value != null))
        {
            if (property.Value!.IsEmptyOrWhiteSpace())
            {
                yield return new ValidationResult($"{property.Key} cannot be empty", new[] { property.Key});
            }
        }
    }
}