using Edge.MyMusic.Repositories.Models;
using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Services.Models;
using MongoDB.Driver;

namespace Edge.MyMusic.Repositories;

internal static class MusicQueryExtension
{
    public static FilterDefinition<MusicDocument> ToFilterDefinition(this IMusicSearchQuery query)
    {
        List<FilterDefinition<MusicDocument>> filters = new();

        if (query.IsFavorite.HasValue)
        {
            filters.Add(Builders<MusicDocument>.Filter.Eq(m => m.IsFavorite, query.IsFavorite));
        }

        if (!string.IsNullOrEmpty(query.Title))
        {
            filters.Add(Builders<MusicDocument>.Filter.Where(m => m.Title.ToLowerInvariant().Contains(query.Title.ToLowerInvariant())));
        }

        if(!string.IsNullOrEmpty(query.Artist))
        {
            filters.Add(Builders<MusicDocument>.Filter.Where(m => m.Artist.ToLowerInvariant().Contains(query.Artist.ToLowerInvariant())));
        }

        return filters.Any() ? Builders<MusicDocument>.Filter.And(filters) : Builders<MusicDocument>.Filter.Empty;
    }

    public static IEnumerable<UpdateDefinition<MusicDocument>> ToUpdateDefinition(this IMusicUpdateQuery query)
    {
        bool hasChanged = false;

        if (!string.IsNullOrEmpty(query.Album))
        {
            hasChanged = true;
            yield return Builders<MusicDocument>.Update.Set(m => m.Album, query.Album);
        }

        if (!string.IsNullOrEmpty(query.Artist))
        {
            hasChanged = true;
            yield return Builders<MusicDocument>.Update.Set(m => m.Artist, query.Artist);
        }

        if (query.Length.HasValue)
        {
            hasChanged = true;
            yield return Builders<MusicDocument>.Update.Set(m => m.Length, query.Length);
        }

        if (!string.IsNullOrEmpty(query.Path))
        {
            hasChanged = true;
            yield return Builders<MusicDocument>.Update.Set(m => m.Path, query.Path);

        }

        if (!string.IsNullOrEmpty(query.Title))
        {
            hasChanged = true;
            yield return Builders<MusicDocument>.Update.Set(m => m.Title, query.Title);
        }

        if (query.IsFavorite.HasValue)
        {
            hasChanged = true;
            yield return Builders<MusicDocument>.Update.Set(m => m.IsFavorite, query.IsFavorite);
        }

        if (hasChanged)
        {
            yield return Builders<MusicDocument>.Update.Set(m => m.UpdateDate, DateTime.UtcNow);
        }
    }

    public static SortDefinition<MusicDocument>? ToSortDefinition(this IMusicSearchQuery query)
    {
        SortDefinition<MusicDocument>? sort = null;

        if (string.IsNullOrEmpty(query.SortBy))
        {
            return sort;
        }

        try
        {
            (string propertyName, string direction) = SortKey.Parse(query.SortBy);
            Dictionary<string, FieldDefinition<MusicDocument>> propertyToField = new()
            {
                { nameof(MusicDocument.Artist).ToLowerInvariant(), nameof(MusicDocument.Artist)},
                { nameof(MusicDocument.Title).ToLowerInvariant(), nameof(MusicDocument.Title)}
            };

            if (propertyToField.TryGetValue(propertyName, out FieldDefinition<MusicDocument>? fieldName))
            {
                sort = direction == SortKey.Ascending ? Builders<MusicDocument>.Sort.Ascending(fieldName) : Builders<MusicDocument>.Sort.Descending(fieldName);
            }

            return sort;
        }
        catch
        {
            return sort;
        }
    }
}