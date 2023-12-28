using MongoDB.Driver;

namespace Edge.MyMusic.Repositories;

internal static class MongoExtension
{
    public static async IAsyncEnumerable<T> ToAsyncEnumerable<T>(this IAsyncCursor<T> cursor)
    {
        while (await cursor.MoveNextAsync())
        {
            foreach (T current in cursor.Current)
            {
                yield return current;
            }
        }
    }
}