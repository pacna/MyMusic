using Edge.MyMusic.Providers.Models;

namespace Edge.MyMusic.Providers;

internal class AudioProvider : BaseHttpProvider<IAudioProvider>, IAudioProvider
{
    private readonly ILogger<AudioProvider> _logger;

    public AudioProvider(ILogger<AudioProvider> logger, IHttpClientFactory factory) : base(factory)
    {
        _logger = logger;
    }

    public async Task<AudioResponse?> GetMetadataAsync(string url)
    {
        string tempFilePath = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName() + Path.GetExtension(url));

        try
        {
            using (HttpClient client = this.GetClient())
            {
                HttpResponseMessage? response = await client.GetAsync(url);
                await File.WriteAllBytesAsync(tempFilePath, await response.Content.ReadAsByteArrayAsync());
            }

            TagLib.File metadata = TagLib.File.Create(tempFilePath);

            return new AudioResponse(title: metadata.Tag.Title, album: metadata.Tag.Album, artist: metadata.Tag.FirstPerformer)
            {
                Duration = (int) metadata.Properties.Duration.TotalSeconds
            };
        }
        catch(Exception ex)
        {
            _logger.LogError(ex.Message, new[] { url});

            return null;
        }
        finally
        {
            File.Delete(tempFilePath);
        }
    }
}