using System.Collections.Generic;
using System.Linq;

namespace Api.Music.Repositories
{
    public static class MusicExtension
    {
        public static List<TDocument> ToList<TDocument>(this Dictionary<string, TDocument> dict)
        {
            return dict.Values.ToList();
        }
    }
}