using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Edge.LitMusic.Repositories.Documents;
using Edge.LitMusic.Repositories.Models;
using Edge.LitMusic.Services.Models;
using MongoDB.Bson;

namespace Edge.LitMusic.Repositories;
public class MusicInMemoryRepository : IMusicRepository
{
    private static Dictionary<string, MusicDocument> musicInMemory;

    static MusicInMemoryRepository()
    {
        string musicId1 = ObjectId.GenerateNewId().ToString();
        string musicId2 = ObjectId.GenerateNewId().ToString();
        string musicId3 = ObjectId.GenerateNewId().ToString();

        musicInMemory = new Dictionary<string, MusicDocument>();

        musicInMemory.TryAdd(musicId1, new MusicDocument
        {
            Id = musicId1,
            Artist = "Linkin Park",
            Album = "Meteora",
            ArtistAlphabetIndex = AlphabetType.L,
            IsFavorite = true,
            Length = 185, // 3 mins and 5 secs
            Title = "Numb",
            Path = "www.google.com/numb.mp3",
            CreatedDate = DateTime.UtcNow,
            UpdatedDate = DateTime.UtcNow
        });

        musicInMemory.TryAdd(musicId2, new MusicDocument
        {
            Id = musicId2,
            Artist = "Vanessa Carlton",
            Album = "Legally Blonde",
            ArtistAlphabetIndex = AlphabetType.V,
            IsFavorite = false,
            Length = 240, // 4 mins
            Title = "A Thousand Miles",
            Path = "/music/1000Miles.mp3",
            CreatedDate = DateTime.UtcNow,
            UpdatedDate = DateTime.UtcNow
        });

        musicInMemory.TryAdd(musicId3, new MusicDocument
        {
            Id = musicId3,
            Artist = "Unknown",
            Album = "Unknown",
            ArtistAlphabetIndex = AlphabetType.U,
            IsFavorite = false,
            Length = 1, // 1 sec
            Title = "Horse",
            Path = "https://www.w3schools.com/tags/horse.mp3",
            CreatedDate = DateTime.UtcNow,
            UpdatedDate = DateTime.UtcNow
        });
    }

    public Task<List<MusicDocument>> SearchMusicAsync(SearchMusicRequest request)
    {
        IEnumerable<MusicDocument> musics = musicInMemory.ToList();

        if (request.IsFavorite.HasValue)
        {
            musics = musics.Where(m => m.IsFavorite == request.IsFavorite);
        }

        if (!request.ArtistAlphabetIndices.IsNullOrEmpty())
        {
            musics = musics.Where(m => request.ArtistAlphabetIndices.Contains(m.ArtistAlphabetIndex));
        }

        if (!string.IsNullOrWhiteSpace(request.Title))
        {
            musics = musics.Where(m => m.Title.ToLowerInvariant().Contains(request.Title.ToLowerInvariant()));
        }


        // TODO: Add sort logic

        return Task.FromResult<List<MusicDocument>>(musics.ToList());
    }

    public Task<MusicDocument> AddMusicAsync(MusicDocument doc)
    {
        string id = ObjectId.GenerateNewId().ToString();
        doc.Id = id;

        musicInMemory.TryAdd(id, doc);

        return Task.FromResult<MusicDocument>(doc);
    }

    public Task<MusicDocument> GetMusicAsync(string id)
    {
        musicInMemory.TryGetValue(id, out MusicDocument doc);

        if (doc == null)
        {
            return Task.FromResult<MusicDocument>(null);
        }

        return Task.FromResult<MusicDocument>(doc);
    }


    public Task<MusicDocument> UpdateMusicAsync(string id, UpdateMusicRequest request)
    {
        musicInMemory.TryGetValue(id, out MusicDocument doc);

        if (doc == null)
        {
            return Task.FromResult<MusicDocument>(null);
        }

        musicInMemory[id] = new MusicDocument
        {
            Id = id,
            Album = request.Album ?? doc.Album,
            Artist = request.Artist ?? doc.Artist,
            Length = request.Length != 0 ? request.Length : doc.Length,
            Title = request.Title ?? doc.Title,
            IsFavorite = doc.IsFavorite,
            ArtistAlphabetIndex = doc.ArtistAlphabetIndex,
            Path = doc.Path,
            CreatedDate = doc.CreatedDate,
            UpdatedDate = DateTime.UtcNow
        };

        return Task.FromResult<MusicDocument>(musicInMemory[id]);
    }

    public Task RemoveMusicAsync(string id)
    {
        musicInMemory.Remove(id);
        return Task.CompletedTask;
    }

    public Task<MusicDocument> UpdateFavoriteAsync(string id, UpdateMusicRequest request)
    {
        musicInMemory.TryGetValue(id, out MusicDocument doc);

        if (doc == null)
        {
            return Task.FromResult<MusicDocument>(null);
        }

        musicInMemory[id].IsFavorite = request.IsFavorite.HasValue ? request.IsFavorite.Value : doc.IsFavorite;
        musicInMemory[id].UpdatedDate = DateTime.UtcNow;

        return Task.FromResult<MusicDocument>(musicInMemory[id]);
    }

}