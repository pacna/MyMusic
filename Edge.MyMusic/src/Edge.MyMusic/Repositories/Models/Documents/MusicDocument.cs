using MongoDB.Bson.Serialization.Attributes;

namespace Edge.MyMusic.Repositories.Models.Documents;

public sealed class MusicDocument : BaseDocument
{
#nullable disable
    [BsonElement("al")]
    public string Album { get; set; }

    [BsonElement("a")]
    public string Artist { get; set; }

    [BsonElement("p")]
    public string Path { get; set; }

    [BsonElement("t")]
    public string Title { get; set; }
#nullable enable

    [BsonElement("if")]
    public bool IsFavorite { get; set; }

    [BsonElement("l")]
    public int Length { get; set; }
}