using Edge.MyMusic.Processors;
using Edge.MyMusic.Providers;
using Edge.MyMusic.Repositories;
using Edge.MyMusic.Settings;
using Microsoft.Extensions.Logging;

namespace Edge.MyMusic.Tests;

public class StartupProcessorTests
{
    private readonly Mock<ILogger<StartupProcessor>> _logger;
    private readonly Mock<IMusicRepository> _repo;
    private readonly Mock<IAudioProvider> _audioProvider;
    private readonly Mock<IArgsSetting> _setting;

    private readonly StartupProcessor _processor;

    public StartupProcessorTests()
    {
        _logger = new Mock<ILogger<StartupProcessor>>();
        _repo = new Mock<IMusicRepository>();
        _audioProvider = new Mock<IAudioProvider>();
        _setting = new Mock<IArgsSetting>();

        _processor = new StartupProcessor(_logger.Object, _repo.Object, _audioProvider.Object, _setting.Object);
    }

    [Fact]
    public async Task CanStartAsync()
    {
        // ACT
        await _processor.StartAsync(default);

        // ASSERT
        _logger.Verify(
            log => log.Log(
                It.Is<LogLevel>(l => l == LogLevel.Information),
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString() == $"{nameof(StartupProcessor)} is starting..."),
                It.IsAny<Exception>(),
                It.Is<Func<It.IsAnyType, Exception?, string>>((v, t) => true)),
        Times.Once);
    }

    [Fact]
    public async Task CanStopAsync()
    {
        // ACT
        await _processor.StopAsync(default);

        // ASSERT
        _logger.Verify(
            log => log.Log(
                It.Is<LogLevel>(l => l == LogLevel.Information),
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString() == $"{nameof(StartupProcessor)} is stopping..."),
                It.IsAny<Exception>(),
                It.Is<Func<It.IsAnyType, Exception?, string>>((v, t) => true)),
        Times.Once);
    }
}