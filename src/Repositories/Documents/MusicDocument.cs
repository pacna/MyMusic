using Api.Music.Repositories.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Music.Repositories.Documents
{
    public class MusicDocument : BaseDocument
    {
        [BsonElement("a")]
        public string Artist { get; set; }

        [BsonElement("aai")]
        public AlphabetType ArtistAlphabetIndex { get; set; }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
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
}