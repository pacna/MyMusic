using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Edge.MyMusic.Repositories.Models.Documents;

public abstract class BaseDocument
{
#nullable disable
    [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
    protected string Id { get; set; }
#nullable enable

    [BsonElement("cd")]
    protected DateTime CreateDate { get; set; }

    [BsonElement("ud")]
    protected DateTime UpdateDate { get; set; }
}