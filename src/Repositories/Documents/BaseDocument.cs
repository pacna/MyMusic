using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Music.Repositories.Documents
{
    public class BaseDocument
    {
        [BsonElement("cd")]
        public DateTime CreatedDate { get; set; }

        [BsonElement("ud")]
        public DateTime UpdatedDate { get; set; }
    }
}