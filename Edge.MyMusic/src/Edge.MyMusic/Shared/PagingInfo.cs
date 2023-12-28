namespace Edge.MyMusic.Shared;

public sealed class PagingInfo : IPaging
{
    public int Idx { get; init; }
    public int? Qty { get; init; }
}