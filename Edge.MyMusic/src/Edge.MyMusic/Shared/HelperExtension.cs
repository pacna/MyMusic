namespace Edge.MyMusic.Shared;

public static class HelperExtension
{
    public static bool IsNullOrEmpty<T>(this IList<T>? list)
    {
        return list == null || list.Count == 0;
    }

    public static bool IsEmptyOrWhiteSpace(this string value)
    {
        return value.All(char.IsWhiteSpace);
    }
}