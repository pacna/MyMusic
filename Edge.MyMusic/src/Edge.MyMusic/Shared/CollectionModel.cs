namespace Edge.MyMusic.Shared;

public class CollectionModel<T>
{
#nullable disable
    public List<T> List { get; set; }
#nullable enable
    public long Total { get; set; }
}