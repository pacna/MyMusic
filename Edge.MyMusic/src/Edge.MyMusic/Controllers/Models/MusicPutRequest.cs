using System.ComponentModel.DataAnnotations;
using Edge.MyMusic.Services.Models;

namespace Edge.MyMusic.Controllers.Models;

public sealed class MusicPutRequest : IValidatableObject, IMusicUpdateQuery
{
    public string? Album { get; init; }
    public string? Artist { get; init; }
    public int? Length { get; init; }
    public string? Path { get; init; }
    public string? Title { get; init; }
    public bool? IsFavorite { get; init; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (this.Length.HasValue && this.Length <= 0)
        {
            yield return new ValidationResult($"{nameof(this.Length)} needs to be greater than 0", new[] { nameof(this.Length)});
        }
    }
}