using Edge.MyMusic.Shared;

namespace Edge.MyMusic.Repositories.Models;

internal static class SortKey
{
    public const string Ascending = "asc";
    public const string Descending = "desc";

    public static (string, string) Parse(string sortBy)
    {
        string[] parsedValues = sortBy.Split(":");
        
        if (parsedValues.IsNullOrEmpty() || parsedValues.Length != 2)
        {
            throw new Exception("Invalid sort format");
        }

        if (parsedValues[1] != Ascending && parsedValues[1] != Descending)
        {
            throw new Exception("Invalid direction");
        }

        return (parsedValues[0], parsedValues[1]);
    }
}