using Edge.LitMusic.Repositories.Documents;
using Edge.LitMusic.Repositories.Helpers;
using Edge.LitMusic.Repositories.Models;
using MongoDB.Driver;

namespace Edge.LitMusic.Repositories;
internal static class MusicQueryBuilder
{
    private static FilterDefinitionBuilder<MusicDocument> filterBuilder = Builders<MusicDocument>.Filter;
    private static UpdateDefinitionBuilder<MusicDocument> updateBuilder = Builders<MusicDocument>.Update;
    private static SortDefinitionBuilder<MusicDocument> sortBuilder = Builders<MusicDocument>.Sort;

    public static FilterDefinition<MusicDocument> BuildSearchQuery(IMusicSearchQuery query)
    {
        List<FilterDefinition<MusicDocument>> filters = new();

        if (query.IsFavorite.HasValue)
        {
            filters.Add(filterBuilder.Eq(m => m.IsFavorite, query.IsFavorite));
        }

        if (!query.ArtistAlphabetIndices.IsNullOrEmpty())
        {
            filters.Add(filterBuilder.In(m => m.ArtistAlphabetIndex, query.ArtistAlphabetIndices));
        }

        if (!string.IsNullOrWhiteSpace(query.Title))
        {
            filters.Add(filterBuilder.Where(m => m.Title.ToLowerInvariant().Contains(query.Title.ToLowerInvariant())));
        }

        return filters.Any() ? filterBuilder.And(filters) : filterBuilder.Empty;
    }

    public static IEnumerable<UpdateDefinition<MusicDocument>> BuildUpdateQuery(IMusicUpdateQuery query)
    {
        bool hasChanged = false;

        if (!string.IsNullOrEmpty(query.Album))
        {
            hasChanged = true;
            yield return updateBuilder.Set(m => m.Album, query.Album);
        }

        if (!string.IsNullOrEmpty(query.Artist))
        {
            hasChanged = true;
            yield return updateBuilder.Set(m => m.Artist, query.Artist);
            yield return updateBuilder.Set(m => m.ArtistAlphabetIndex, MusicHelper.CalculateAlphabetIndex(artistFirstChar: query.Artist[0]));

        }

        if (query.Length > 0)
        {
            hasChanged = true;
            yield return updateBuilder.Set(m => m.Length, query.Length);

        }

        if (!string.IsNullOrEmpty(query.Path))
        {
            hasChanged = true;
            yield return updateBuilder.Set(m => m.Path, query.Path);

        }

        if (!string.IsNullOrEmpty(query.Title))
        {
            hasChanged = true;
            yield return updateBuilder.Set(m => m.Title, query.Title);
        }

        if (query.IsFavorite.HasValue)
        {
            hasChanged = true;
            yield return updateBuilder.Set(m => m.IsFavorite, query.IsFavorite);

        }

        if (hasChanged)
        {
            yield return updateBuilder.Set(m => m.UpdatedDate, DateTime.UtcNow);
        }
    }

    public static SortDefinition<MusicDocument> BuildSortQuery(string sortBy)
    {
        if (!string.IsNullOrWhiteSpace(sortBy))
        {
            FieldDefinition<MusicDocument> field = null;
            SortInfo sortInfo = new(sortBy: sortBy);

            string propertyName = sortInfo.PropertyName.ToLowerInvariant();

            if (propertyName == nameof(MusicDocument.Artist).ToLowerInvariant())
            {
                field = nameof(MusicDocument.Artist);
            }
            else if (propertyName == nameof(MusicDocument.Title).ToLowerInvariant())
            {
                field = nameof(MusicDocument.Title);
            }

            if (field != null)
            {
                return sortInfo.Direction == SortKeyType.Ascending ? sortBuilder.Ascending(field) : sortBuilder.Descending(field);
            }
        }

        return null;
    }

    public static FilterDefinition<MusicDocument> BuildEntityIdQuery(string id)
    {
        return filterBuilder.Eq(m => m.Id, id);
    }
}