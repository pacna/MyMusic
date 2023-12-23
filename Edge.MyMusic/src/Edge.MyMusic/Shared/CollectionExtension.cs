namespace Edge.MyMusic.Shared;

public static class CollectionExtension
{
    public static bool IsNullOrEmpty<T>(this IList<T>? list)
    {
        return list == null || list.Count == 0;
    }
}