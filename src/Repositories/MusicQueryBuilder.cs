using System;
using System.Collections.Generic;
using System.Linq;
using Api.Music.Repositories.Documents;
using Api.Music.Repositories.Helpers;
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

            if (!string.IsNullOrWhiteSpace(query.Title))
            {
                filters.Add(filterBuilder.Where(m => m.Title.ToLowerInvariant().Contains(query.Title.ToLowerInvariant())));
            }

            return filters.Any() ? filterBuilder.And(filters) : filterBuilder.Empty;
        }

        public static UpdateDefinition<MusicDocument> BuildUpdateQuery(IMusicUpdateQuery query)
        {
            List<UpdateDefinition<MusicDocument>> updates = new List<UpdateDefinition<MusicDocument>>();

            if (!string.IsNullOrEmpty(query.Album))
            {
                updates.Add(updateBuilder.Set(m => m.Album, query.Album));
            }

            if (!string.IsNullOrEmpty(query.Artist))
            {
                updates.Add(updateBuilder.Set(m => m.Artist, query.Artist));
                updates.Add(updateBuilder.Set(m => m.ArtistAlphabetIndex, MusicHelper.CalculateAlphabetIndex(artistFirstChar: query.Artist[0])));
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

            if (query.IsFavorite.HasValue)
            {
                updates.Add(updateBuilder.Set(m => m.IsFavorite, query.IsFavorite));
            }

            if (updates.Any())
            {
                updates.Add(updateBuilder.Set(m => m.UpdatedDate, DateTime.UtcNow));
            }

            return updates.Any() ? updateBuilder.Combine(updates) : null;
        }

        public static SortDefinition<MusicDocument> BuildSortQuery(string sortBy)
        {
            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                FieldDefinition<MusicDocument> field = null;
                SortInfo sortInfo = new SortInfo(sortBy: sortBy);

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
}