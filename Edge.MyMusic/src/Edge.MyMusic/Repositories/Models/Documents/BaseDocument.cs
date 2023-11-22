using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Edge.MyMusic.Repositories.Models.Documents;

public abstract class BaseDocument
{
#nullable disable
    [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
    public string Id { get; set; }
#nullable enable

    [BsonElement("cd")]
    public DateTime CreateDate { get; set; }

    [BsonElement("ud")]
    public DateTime UpdateDate { get; set; }
}