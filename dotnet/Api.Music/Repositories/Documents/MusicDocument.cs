using MongoDB.Bson.Serialization.Attributes;

namespace Api.Music.Repositories.Documents
{
    public class MusicDocument
    {
        [BsonElement("a")]
        public string Artist { get; set; }

        [BsonId]
        public string EntityId { get; set; }

        [BsonElement("f")]
        public string Favorite { get; set; }

        [BsonElement("l")]
        public int Length { get; set; }

        [BsonElement("p")]
        public string Path { get; set; }

        [BsonElement("t")]
        public string Title { get; set; }
    }
}