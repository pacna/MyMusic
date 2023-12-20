namespace Edge.MyMusic.Providers;

internal abstract class BaseHttpProvider<TProvider>
{
    private readonly IHttpClientFactory _factory;

    protected BaseHttpProvider(IHttpClientFactory factory)
    {
        _factory = factory;
    }

    protected HttpClient GetClient()
    {
        return _factory.CreateClient(nameof(TProvider));
    }
}