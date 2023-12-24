namespace Edge.MyMusic.Shared;

public class CollectionModel<T>
{
#nullable disable
    public List<T> List { get; set; }
#nullable enable
    public int Total { get; set; }
}