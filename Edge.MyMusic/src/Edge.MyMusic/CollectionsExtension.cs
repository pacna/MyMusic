namespace Edge.MyMusic;

public static class CollectionExtensions
{
    public static bool IsNullOrEmpty<T>(this IList<T>? list)
    {
        return list == null || list.Count == 0;
    }
}