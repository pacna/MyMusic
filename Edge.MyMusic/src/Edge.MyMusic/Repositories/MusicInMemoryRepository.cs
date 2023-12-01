using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Services.Models;
using Edge.MyMusic.Shared;
using MongoDB.Bson;

namespace Edge.MyMusic.Repositories;

public class MusicInMemoryRepository : IMusicRepository
{
    private readonly static IDictionary<string, MusicDocument> _datastore;

    static MusicInMemoryRepository()
    {
        string musicId1 = ObjectId.GenerateNewId().ToString();
        string musicId2 = ObjectId.GenerateNewId().ToString();
        string musicId3 = ObjectId.GenerateNewId().ToString();

        _datastore = new Dictionary<string, MusicDocument>();

        _datastore.TryAdd(musicId1, new MusicDocument
        {
            Id = musicId1,
            Artist = "Linkin Park",
            Album = "Meteora",
            ArtistAlphabetIndex = AlphabetType.L,
            IsFavorite = true,
            Length = 185, // 3 mins and 5 secs
            Title = "Numb",
            Path = "www.google.com/numb.mp3"
        });

        _datastore.TryAdd(musicId2, new MusicDocument
        {
            Id = musicId2,
            Artist = "Vanessa Carlton",
            Album = "Legally Blonde",
            ArtistAlphabetIndex = AlphabetType.V,
            IsFavorite = false,
            Length = 240, // 4 mins
            Title = "A Thousand Miles",
            Path = "/music/1000Miles.mp3"
        });

        _datastore.TryAdd(musicId3, new MusicDocument
        {
            Id = musicId3,
            Artist = "Unknown",
            Album = "Unknown",
            ArtistAlphabetIndex = AlphabetType.U,
            IsFavorite = false,
            Length = 1, // 1 sec
            Title = "Horse",
            Path = "https://www.w3schools.com/tags/horse.mp3"
        });
    }

    public Task<List<MusicDocument>> SearchMusicAsync(IMusicSearchQuery query)
    {
        IEnumerable<MusicDocument> collection = _datastore.Values;

        if (query.IsFavorite.HasValue)
        {
            collection = collection.Where(x => x.IsFavorite == query.IsFavorite);
        }

        if (!string.IsNullOrEmpty(query.Title))
        {
            collection = collection.Where(x => x.Title.ToLowerInvariant().Contains(query.Title.ToLowerInvariant()));
        }
        
        return Task.FromResult(collection.ToList()); 
    }

    public Task<MusicDocument> AddMusicAsync(MusicDocument doc)
    {
        if (string.IsNullOrEmpty(doc.Id))
        {
            doc.Id = ObjectId.GenerateNewId().ToString();
        }

        _datastore.TryAdd(doc.Id, doc);

        return Task.FromResult(doc);
    }

    public Task<MusicDocument?> GetMusicAsync(string id)
    {
        _datastore.TryGetValue(id, out MusicDocument? doc);

        if (doc == null)
        {
            return Task.FromResult<MusicDocument?>(null);
        }

        return Task.FromResult<MusicDocument?>(doc);
    }
}