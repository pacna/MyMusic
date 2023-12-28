using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Providers;
using Edge.MyMusic.Providers.Models;
using Edge.MyMusic.Repositories;
using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Services;
using Edge.MyMusic.Services.Models;
using Edge.MyMusic.Shared;
using MongoDB.Bson;

namespace Edge.MyMusic.Tests;

public class MusicServiceTests
{
    private readonly Mock<IMusicRepository> _repo;
    private readonly Mock<IAudioProvider> _audioProvider;
    private readonly IMusicService _service;

    public MusicServiceTests()
    {
        _repo = new Mock<IMusicRepository>(MockBehavior.Strict);
        _audioProvider = new Mock<IAudioProvider>(MockBehavior.Strict);
        _service  = new MusicService(_audioProvider.Object, _repo.Object);
    }

    [Fact]
    public async Task CanSearchSongsAsync()
    {
        // ARRANGE
        SongSearchRequest request = new();

        List<MusicDocument> collection = Enumerable.Range(0, request.GetPagingInfo().Qty!.Value).Select(x => new MusicDocument()).ToList();

        CollectionModel<MusicDocument> expected = new();

        _repo
            .Setup(m => m.SearchMusicAsync(request, It.IsAny<IPaging>()))
            .Callback(() => 
            {
                expected.List = collection;
                expected.Total = collection.Count;
            })
            .ReturnsAsync(expected);

        // ACT
        CollectionModel<SongResponse> response = await _service.SearchSongsAsync(request);

        // ASSERT
        Assert.NotNull(response);
        Assert.Equal(request.GetPagingInfo().Qty, expected.List.Count);
        _repo.Verify(m => m.SearchMusicAsync(request, It.IsAny<IPaging>()), Times.Once);
    }

    [Fact]
    public async Task CanAddSongAsync()
    {
        // ARRANGE
        SongPostRequest request = new(album: "Meteora", artist: "Linkin Park", path: "https://foobar.com/numb.mp3", title: "Numb")
        {
            IsFavorite = false
        };

        AudioResponse expectedMetaData = new(title: request.Title, album: request.Album, artist: request.Artist)
        {
            Duration = 185
        };

        MusicDocument expected = new()
        {
            Id = ObjectId.GenerateNewId().ToString(),
            Artist = request.Artist,
            Album = request.Album,
            Path = request.Path,
            Title = request.Title,
            Length = expectedMetaData.Duration,
            IsFavorite = request.IsFavorite,
            CreateDate = DateTime.UtcNow,
            UpdateDate = DateTime.UtcNow
        };

        _audioProvider
            .Setup(m => m.GetMetadataAsync(request.Path))
            .ReturnsAsync(expectedMetaData);

        _repo
            .Setup(m => m.AddMusicAsync(It.Is<MusicDocument>(r => (
                r.Album == request.Album &&
                r.Artist == request.Artist &&
                r.Path == request.Path &&
                r.Title == request.Title &&
                r.Length == expectedMetaData.Duration &&
                r.IsFavorite == request.IsFavorite
            ))))
            .ReturnsAsync(expected);

        // ACT
        SongResponse response = await _service.AddSongAsync(request);

        // ASSERT
        Assert.NotNull(response);
        AssertEqual(expected, response);
        _repo.Verify(m => m.AddMusicAsync(It.Is<MusicDocument>(r => (
                r.Album == request.Album &&
                r.Artist == request.Artist &&
                r.Path == request.Path &&
                r.Title == request.Title &&
                r.Length == expectedMetaData.Duration &&
                r.IsFavorite == request.IsFavorite
        ))), Times.Once);
        _audioProvider.Verify(m => m.GetMetadataAsync(request.Path), Times.Once);
    }

    [Fact]
    public async Task CanUpdateSongAsync()
    {
        // ARRANGE
        string id = ObjectId.GenerateNewId().ToString();

        SongPutRequest request = new()
        {
            Artist = "Linkin Park",
            Album = "Meteora",
            Path = "https://foobar.com/numb.mp3",
            Title = "Numb"
        };

        MusicDocument expected = new();

        _repo
            .Setup(m => m.UpdateMusicAsync(id, request))
            .Callback(() => 
            {
                expected.Artist = request.Artist;
                expected.Album = request.Album;
                expected.Path = request.Path;
                expected.Title = request.Title;
            })
            .ReturnsAsync(expected);

        // ACT
        SongResponse? response = await _service.UpdateSongAsync(id, request);

        // ASSERT
        Assert.NotNull(response);
        AssertEqual(expected, response);
        _repo.Verify(m => m.UpdateMusicAsync(id, request), Times.Once);
    }

    [Fact]
    public async Task CanGetSongAsync()
    {
        // ARRANGE
        string id = ObjectId.GenerateNewId().ToString();
        MusicDocument expected = new()
        {
            Id = id,
            Artist = "Linkin Park",
            Album = "Meteora",
            Path = "https://foobar.com/numb.mp3",
            Title = "Numb",
            Length = 185,
            IsFavorite = false,
            CreateDate = DateTime.UtcNow,
            UpdateDate = DateTime.UtcNow
        };

        _repo
            .Setup(m => m.GetMusicAsync(id))
            .ReturnsAsync(expected);

        // ACT
        SongResponse? response = await _service.GetSongAsync(id);

        // ASSERT
        Assert.NotNull(response);
        AssertEqual(expected: expected, actual: response);
        _repo.Verify(m => m.GetMusicAsync(id), Times.Once);
    }

    [Fact]
    public async Task CanRemoveSongAsync()
    {
        // ARRANGE
        string id = ObjectId.GenerateNewId().ToString();
        _repo
            .Setup(m => m.DeleteMusicAsync(id))
            .Returns(Task.CompletedTask);

        // ACT
        await _service.DeleteSongAsync(id);

        // ASSERT
        _repo.Verify(m => m.DeleteMusicAsync(id), Times.Once);
    }

    [Fact]
    public async Task CanUpdateFavoriteSongAsync()
    {
        // ARRANGE
        string id = ObjectId.GenerateNewId().ToString();
        SongFavoritePatchRequest request = new()
        {
            IsFavorite = true
        };

        MusicDocument expected = new()
        {
            Id = id,
            Artist = "Linkin Park",
            IsFavorite = false
        };

        _repo
            .Setup(m => m.UpdateMusicAsync(id, It.Is<IMusicUpdateQuery>(r => r.IsFavorite == request.IsFavorite)))
            .Callback(() => expected.IsFavorite = request.IsFavorite)
            .ReturnsAsync(expected);

        // ACT
        SongResponse? response = await _service.UpdateSongAsync(id, request.ToRequest());

        // ASSERT
        Assert.NotNull(response);
        Assert.Equal(request.IsFavorite, response.IsFavorite);
        AssertEqual(expected: expected, actual: response);
        _repo.Verify(m => m.UpdateMusicAsync(id, It.Is<IMusicUpdateQuery>(r => r.IsFavorite == request.IsFavorite)), Times.Once);
    }


    internal void AssertEqual(MusicDocument expected, SongResponse actual)
    {
        Assert.Equal(expected.Id, actual.Id);
        Assert.Equal(expected.Album, actual.Album);
        Assert.Equal(expected.Artist, actual.Artist);
        Assert.Equal(expected.Path, actual.Path);
        Assert.Equal(expected.Title, actual.Title);
        Assert.Equal(expected.Length, actual.Length);
        Assert.Equal(expected.IsFavorite, actual.IsFavorite);
    }
}