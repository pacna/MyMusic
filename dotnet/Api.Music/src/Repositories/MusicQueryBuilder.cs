using System;
using System.Collections.Generic;
using System.Linq;
using Api.Music.Repositories.Documents;
using Api.Music.Repositories.Models;
using MongoDB.Driver;

namespace Api.Music.Repositories
{
    public static class MusicQueryBuilder
    {
        private static FilterDefinitionBuilder<MusicDocument> filterBuilder = Builders<MusicDocument>.Filter;
        private static UpdateDefinitionBuilder<MusicDocument> updateBuilder = Builders<MusicDocument>.Update;
        private static SortDefinitionBuilder<MusicDocument> sortBuilder = Builders<MusicDocument>.Sort;

        public static FilterDefinition<MusicDocument> BuildSearchQuery(IMusicSearchQuery query)
        {
            List<FilterDefinition<MusicDocument>> filters = new List<FilterDefinition<MusicDocument>>();

            if (query.IsFavorite.HasValue)
            {
                filters.Add(filterBuilder.Eq(m => m.IsFavorite, query.IsFavorite));
            }

            if (!query.ArtistAlphabetIndices.IsNullOrEmpty())
            {
                filters.Add(filterBuilder.In(m => m.ArtistAlphabetIndex, query.ArtistAlphabetIndices));
            }

            return filters.Any() ? filterBuilder.And(filters) : filterBuilder.Empty;
        }

        public static UpdateDefinition<MusicDocument> BuildUpdateQuery(IMusicUpdateQuery query)
        {
            List<UpdateDefinition<MusicDocument>> updates = new List<UpdateDefinition<MusicDocument>>();

            if (!string.IsNullOrEmpty(query.Artist))
            {
                updates.Add(updateBuilder.Set(m => m.Artist, query.Artist));
            }

            if (query.Length > 0)
            {
                updates.Add(updateBuilder.Set(m => m.Length, query.Length));
            }

            if (!string.IsNullOrEmpty(query.Path))
            {
                updates.Add(updateBuilder.Set(m => m.Path, query.Path));
            }

            if (!string.IsNullOrEmpty(query.Title))
            {
                updates.Add(updateBuilder.Set(m => m.Title, query.Title));
            }

            if (updates.Any())
            {
                updates.Add(updateBuilder.Set(m => m.UpdatedDate, DateTime.UtcNow));
            }

            return updates.Any() ? updateBuilder.Combine(updates) : null;
        }

        public static SortDefinition<MusicDocument> BuildSortQuery(string sortBy)
        {
            return sortBuilder.Ascending(sortBy);
        }

        public static UpdateDefinition<MusicDocument> BuildUpdateFavoriteQuery(IMusicUpdateFavoriteQuery query)
        {
            List<UpdateDefinition<MusicDocument>> updates = new List<UpdateDefinition<MusicDocument>>();

            updates.Add(updateBuilder.Set(m => m.IsFavorite, query.IsFavorite));
            updates.Add(updateBuilder.Set(m => m.UpdatedDate, DateTime.UtcNow));

            return updateBuilder.Combine(updates);
        }

        public static FilterDefinition<MusicDocument> BuildEntityIdQuery(string id)
        {
            return filterBuilder.Eq(m => m.Id, id);
        }
    }
}