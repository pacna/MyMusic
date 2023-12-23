namespace Edge.MyMusic.Shared;

public abstract class BaseCollectionRequest : IPaging
{
    public int Idx { get; init; }
    public int? Qty { get; init; }

    public PagingInfo GetPagingInfo()
    {
        return new PagingInfo
        {
            Idx = this.Idx,
            Qty = this.Qty ?? 20
        };
    }
}