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
    private readonly CommandArgsSetting _commandArgsSetting;

    private const string _baseUri = "http://localhost:5000";

    public StartupProcessor(
        IHostApplicationLifetime applicationLifetime, 
        ILogger<StartupProcessor> logger, 
        IMusicRepository musicRepository, 
        IAudioProvider audioProvider,
        CommandArgsSetting commandArgsSetting)
    {
        _applicationLifetime = applicationLifetime;
        _logger = logger;
        _musicRepository = musicRepository;
        _audioProvider = audioProvider;
        _commandArgsSetting = commandArgsSetting;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation($"{nameof(StartupProcessor)} is starting...");

        if (string.IsNullOrEmpty(_commandArgsSetting.AudiosPath))
        {
            return Task.CompletedTask;
        }

        // run only after the application host has fully started.
        _applicationLifetime.ApplicationStarted.Register(async () =>
        {
            IEnumerable<string> files = Directory.GetFiles(_commandArgsSetting.AudiosPath);

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