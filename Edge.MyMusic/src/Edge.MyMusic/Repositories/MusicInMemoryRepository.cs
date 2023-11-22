using Edge.MyMusic;
using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Shared;
using MongoDB.Bson;

namespace Edge.MyMusic.Repositories;

public class MusicInMemoryRepository : IMusicRepository
{
    private static IDictionary<string, MusicDocument> _datastore;

    static MusicInMemoryRepository()
    {
        string musicId1 = ObjectId.GenerateNewId().ToString();
        string musicId2 = ObjectId.GenerateNewId().ToString();
        string musicId3 = ObjectId.GenerateNewId().ToString();

        _datastore = new Dictionary<string, MusicDocument>();

        DateTime now = DateTime.UtcNow;

        _datastore.TryAdd(musicId1, new MusicDocument
        {
            Id = musicId1,
            Artist = "Linkin Park",
            Album = "Meteora",
            ArtistAlphabetIndex = AlphabetType.L,
            IsFavorite = true,
            Length = 185, // 3 mins and 5 secs
            Title = "Numb",
            Path = "www.google.com/numb.mp3",
            CreateDate = now,
            UpdateDate = now
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
            Path = "/music/1000Miles.mp3",
            CreateDate = now,
            UpdateDate = now
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
            Path = "https://www.w3schools.com/tags/horse.mp3",
            CreateDate = now,
            UpdateDate = now
        });
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

    public Task<List<MusicDocument>> SearchMusicAsync()
    {
        return Task.FromResult(_datastore.ToList()); 
    }
}