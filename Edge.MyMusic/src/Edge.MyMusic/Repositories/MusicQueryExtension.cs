using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Services.Models;
using MongoDB.Driver;

namespace Edge.MyMusic.Repositories;

public static class MusicQueryExtension
{
    public static FilterDefinition<MusicDocument> ToFilterDefinition(this IMusicSearchQuery query)
    {
        List<FilterDefinition<MusicDocument>> filters = new();

        if (query.IsFavorite.HasValue)
        {
            filters.Add(Builders<MusicDocument>.Filter.Eq(m => m.IsFavorite, query.IsFavorite));
        }

        if(!query.ArtistAlphabetIndices.IsNullOrEmpty())
        {
            filters.Add(Builders<MusicDocument>.Filter.In(m => m.ArtistAlphabetIndex, query.ArtistAlphabetIndices));   
        }

        if (!string.IsNullOrEmpty(query.Title))
        {
            filters.Add(Builders<MusicDocument>.Filter.Where(m => m.Title.ToLowerInvariant().Contains(query.Title.ToLowerInvariant())));
        }

        return filters.Any() ? Builders<MusicDocument>.Filter.And(filters) : Builders<MusicDocument>.Filter.Empty;
    }
}