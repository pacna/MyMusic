namespace Edge.MyMusic.Shared;

public abstract class BaseCollectionRequest : IPaging
{
    public int Start { get; init; }
    public int Qty { get; init; }
}