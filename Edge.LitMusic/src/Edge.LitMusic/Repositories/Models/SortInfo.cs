namespace Edge.LitMusic.Repositories.Models;
internal class SortInfo
{
    public SortInfo(string sortBy)
    {
        this.Parse(sortBy: sortBy);
    }

    public string PropertyName { get; private set; }
    public string Direction { get; private set; }

    private void Parse(string sortBy)
    {
        string[] parsedValues = sortBy.Split(":");

        if (parsedValues.IsNullOrEmpty() || parsedValues.Length < 2)
        {
            return;
        }

        this.PropertyName = parsedValues[0];
        this.Direction = parsedValues[1];
    }
}