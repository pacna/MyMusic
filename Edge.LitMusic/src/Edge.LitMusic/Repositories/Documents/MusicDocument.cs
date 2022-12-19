using Edge.LitMusic.Repositories.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Edge.LitMusic.Repositories.Documents;
public class MusicDocument : BaseDocument
{
    [BsonElement("al")]
    public string Album { get; set; }

    [BsonElement("a")]
    public string Artist { get; set; }

    [BsonElement("aai")]
    public AlphabetType ArtistAlphabetIndex { get; set; }

    [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
    public string Id { get; set; }

    [BsonElement("if")]
    public bool IsFavorite { get; set; }

    [BsonElement("l")]
    public int Length { get; set; }

    [BsonElement("p")]
    public string Path { get; set; }

    [BsonElement("t")]
    public string Title { get; set; }
}