namespace Edge.MyMusic.Providers;

internal abstract class BaseHttpProvider<TProvider>(IHttpClientFactory factory)
{
    private readonly IHttpClientFactory _factory = factory;

    protected HttpClient GetClient()
    {
        return _factory.CreateClient(typeof(TProvider).Name);
    }
}