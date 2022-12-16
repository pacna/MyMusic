using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Edge.LitMusic.Repositories.Documents;
public abstract class BaseDocument
{
    [BsonElement("cd")]
    public virtual DateTime CreatedDate { get; set; }

    [BsonElement("ud")]
    public virtual DateTime UpdatedDate { get; set; }
}