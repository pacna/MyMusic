namespace Edge.LitMusic.Repositories;
public static class CollectionExtension
{
    public static List<TValue> ToList<TValue>(this IDictionary<string, TValue> dict)
    {
        return dict.Values.ToList();
    }

    public static bool IsNullOrEmpty<TItem>(this IList<TItem> list)
    {
        return list == null || list.Count == 0;
    }
}