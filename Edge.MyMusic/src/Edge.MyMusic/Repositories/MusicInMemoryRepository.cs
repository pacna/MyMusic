using System.Collections.Concurrent;
using Edge.MyMusic.Repositories.Models;
using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Services.Models;
using Edge.MyMusic.Shared;
using MongoDB.Bson;

namespace Edge.MyMusic.Repositories;

internal class MusicInMemoryRepository : IMusicRepository
{
    private readonly static IDictionary<string, MusicDocument> _datastore;

    static MusicInMemoryRepository()
    {
        string musicId1 = "mid1";
        string musicId2 = "mid2";
        string musicId3 = "mid3";

        _datastore = new ConcurrentDictionary<string, MusicDocument>();

        _datastore.TryAdd(musicId1, new MusicDocument
        {
            Id = musicId1,
            Artist = "Unknown",
            Album = "Unknown",
            IsFavorite = true,
            Length = 169, // 2m 49s
            Title = "Anitek Komorebi",
            Path = "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3"
        });

        _datastore.TryAdd(musicId2, new MusicDocument
        {
            Id = musicId2,
            Artist = "Unknown",
            Album = "Unknown",
            IsFavorite = false,
            Length = 2, // 2s
            Title = "T-Rex",
            Path = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
        });

        _datastore.TryAdd(musicId3, new MusicDocument
        {
            Id = musicId3,
            Artist = "Unknown",
            Album = "Unknown",
            IsFavorite = false,
            Length = 1, // 1s
            Title = "Horse",
            Path = "https://www.w3schools.com/tags/horse.mp3"
        });
    }

    public Task<CollectionModel<MusicDocument>> SearchMusicAsync(IMusicSearchQuery query, IPaging pagingInfo)
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

        if (!string.IsNullOrEmpty(query.Artist))
        {
            collection = collection.Where(x => x.Artist == query.Artist);
        }

        if (!string.IsNullOrEmpty(query.SortBy))
        {
            collection = SortBy(query.SortBy, collection);
        }

        return Task.FromResult(new CollectionModel<MusicDocument>
        {
            List = collection.Skip(pagingInfo.Idx).Take(pagingInfo.Qty!.Value).ToList(),
            Total = collection.Count()
        }); 
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
        if (_datastore.TryGetValue(id, out MusicDocument? doc))
        {
            return Task.FromResult<MusicDocument?>(doc);
        }

        return Task.FromResult<MusicDocument?>(null);
    }

    public Task<MusicDocument?> UpdateMusicAsync(string id, IMusicUpdateQuery query)
    {

        if (_datastore.TryGetValue(id, out MusicDocument? doc))
        {
            MusicDocument updatedDoc = new()
            {
                Id = id,
                Artist = query.Artist ?? doc!.Artist,
                Album = query.Album ?? doc!.Album,
                IsFavorite = query.IsFavorite ?? doc!.IsFavorite,
                Length = query.Length ?? doc!.Length,
                Title = query.Title ?? doc!.Title,
                Path = query.Path ?? doc!.Path,
                CreateDate = doc!.CreateDate,
                UpdateDate = DateTime.UtcNow
            };

            _datastore[id] = updatedDoc;

            return Task.FromResult<MusicDocument?>(updatedDoc);
        }

        return Task.FromResult<MusicDocument?>(null);
    }

    public Task DeleteMusicAsync(string id)
    {
        _datastore.Remove(id);
        return Task.CompletedTask;
    }

    private static IEnumerable<MusicDocument> SortBy(string sortBy, IEnumerable<MusicDocument> collection)
    {
        Dictionary<string, Func<MusicDocument, string>> propertyToFunc = new()
        {
            { nameof(IMusicSearchQuery.Artist).ToLowerInvariant(), x => x.Artist },
            { nameof(IMusicSearchQuery.Title).ToLowerInvariant(), x => x.Title }
        };

        (string propertyName, string direction) = SortKey.Parse(sortBy);

        if (propertyToFunc.TryGetValue(propertyName, out Func<MusicDocument, string>? func))
        {
            collection = direction == SortKey.Ascending
                ? collection.OrderBy(func)
                : collection.OrderByDescending(func);
        }

        return collection;
    }
}