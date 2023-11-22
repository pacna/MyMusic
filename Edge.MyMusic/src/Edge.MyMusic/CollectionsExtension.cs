namespace Edge.MyMusic;

public static class CollectionExtensions
{
    public static List<TValue> ToList<TKey, TValue>(this IDictionary<TKey, TValue> dict) where TKey: notnull
    {
        return dict.Values.ToList();
    }
}