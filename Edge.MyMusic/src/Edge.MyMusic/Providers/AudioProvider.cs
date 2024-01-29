using Edge.MyMusic.Providers.Models;

namespace Edge.MyMusic.Providers;

internal class AudioProvider(ILogger<AudioProvider> logger, IHttpClientFactory factory) : BaseHttpProvider<IAudioProvider>(factory), IAudioProvider
{
    private readonly ILogger<AudioProvider> _logger = logger;

    public async Task<AudioResponse?> GetMetadataAsync(string url)
    {
        string tempFilePath = Path.Combine(Path.GetTempPath(), Path.GetFileName(url));

        try
        {
            using (HttpClient client = this.GetClient())
            {
                HttpResponseMessage? response = await client.GetAsync(url);
                await File.WriteAllBytesAsync(tempFilePath, await response.Content.ReadAsByteArrayAsync());
            }

            using TagLib.File metadata = TagLib.File.Create(tempFilePath);

            return new AudioResponse
            {
                Title = metadata.Tag.Title,
                Album = metadata.Tag.Album,
                Artist = metadata.Tag.FirstPerformer,
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