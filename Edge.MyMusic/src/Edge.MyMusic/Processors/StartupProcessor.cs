using Edge.MyMusic.Providers;
using Edge.MyMusic.Providers.Models;
using Edge.MyMusic.Repositories;
using Edge.MyMusic.Settings;

namespace Edge.MyMusic.Processors;

internal class StartupProcessor : IHostedService
{
    private readonly IHostApplicationLifetime _applicationLifetime;
    private readonly ILogger _logger;
    private readonly IMusicRepository _musicRepository;
    private readonly IAudioProvider _audioProvider;
    private readonly IArgsSetting _argsSetting;

    private const string _baseUri = "http://localhost:5000";

    public StartupProcessor(
        IHostApplicationLifetime applicationLifetime, 
        ILogger<StartupProcessor> logger, 
        IMusicRepository musicRepository, 
        IAudioProvider audioProvider,
        IArgsSetting argsSetting)
    {
        _applicationLifetime = applicationLifetime;
        _logger = logger;
        _musicRepository = musicRepository;
        _audioProvider = audioProvider;
        _argsSetting = argsSetting;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation($"{nameof(StartupProcessor)} is starting...");

        if (string.IsNullOrEmpty(_argsSetting.AudiosPath))
        {
            return Task.CompletedTask;
        }

        // run only after the application host has fully started.
        _applicationLifetime.ApplicationStarted.Register(async () =>
        {
            IEnumerable<string> files = Directory.GetFiles(_argsSetting.AudiosPath);

            foreach(string filePath in files)
            {
                string path = $"{_baseUri}/audios/{Path.GetFileName(filePath)}";
                AudioResponse? audio =  await _audioProvider.GetMetadataAsync(path);

                if (audio == null)
                {
                    _logger.LogWarning($"Unable to find audio file {path}", new[] { path});
                    continue;
                }

                await _musicRepository.AddMusicAsync(audio.ToDocument(path));
            };
        });

        return Task.CompletedTask;

    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation($"{nameof(StartupProcessor)} is stopping...");
        return Task.CompletedTask;
    }
}