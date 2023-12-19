namespace Edge.MyMusic.Shared;

public class CollectionModel<T>
{
#nullable disable
    public List<T> List { get; init; }
    public int Total { get; init; }
#nullable enable
}