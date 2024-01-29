using Edge.MyMusic.Providers;
using Edge.MyMusic.Providers.Models;
using Edge.MyMusic.Repositories;
using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Settings;

namespace Edge.MyMusic.Processors;

public class StartupProcessor(
    ILogger<StartupProcessor> logger,
    IMusicRepository musicRepository,
    IAudioProvider audioProvider,
    IArgsSetting argsSetting) : BaseProcessor
{
    private readonly ILogger<StartupProcessor> _logger = logger;
    private readonly IMusicRepository _musicRepository = musicRepository;
    private readonly IAudioProvider _audioProvider = audioProvider;
    private readonly IArgsSetting _argsSetting = argsSetting;

    private const string _default = "Unknown";

    public override Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation($"{nameof(StartupProcessor)} is starting...");
        return Task.CompletedTask;
    }

    public override Task StartedAsync(CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(_argsSetting.AudiosPath))
        {
            return Task.CompletedTask;
        }

        try
        {
            return Parallel.ForEachAsync(
                Directory.EnumerateFiles(_argsSetting.AudiosPath), 
                new ParallelOptions { MaxDegreeOfParallelism = 3, 
                CancellationToken = cancellationToken }, async (file, ct) => 
            {
                ct.ThrowIfCancellationRequested();

                string path = $"{_argsSetting.BaseUrl}/audios/{Path.GetFileName(file)}";
                AudioResponse? audio =  await _audioProvider.GetMetadataAsync(path);

                if (audio == null)
                {
                    _logger.LogWarning($"Unable to find audio file", new[] { path });
                    return;
                }

                await _musicRepository.AddMusicAsync(new MusicDocument
                {
                    Album = audio.Album ?? _default,
                    Artist = audio.Artist ?? _default,
                    IsFavorite = false,
                    Length = audio.Duration,
                    Path = path,
                    Title = audio.Title ?? _default  
                });
            });
        }
        catch(OperationCanceledException)
        {
            // ignore
            return Task.CompletedTask;
        }
        catch(Exception ex)
        {
            _logger.LogWarning($"An issue occurred in the {nameof(StartupProcessor)} during the {nameof(StartedAsync)}", new[] { ex.Message });
            return Task.CompletedTask;
        }
    }

    public override Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation($"{nameof(StartupProcessor)} is stopping...");
        return Task.CompletedTask;
    }
}