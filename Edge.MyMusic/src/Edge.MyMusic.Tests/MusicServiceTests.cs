using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Repositories;
using Edge.MyMusic.Repositories.Models.Documents;
using Edge.MyMusic.Services;
using Edge.MyMusic.Services.Models;
using MongoDB.Bson;

namespace Edge.MyMusic.Tests;

public class MusicServiceTests
{
    private readonly Mock<IMusicRepository> _repo;
    private readonly IMusicService _service;

    public MusicServiceTests()
    {
        _repo = new Mock<IMusicRepository>(MockBehavior.Strict);
        _service  = new MusicService(_repo.Object);
    }

    [Fact]
    public async Task CanAddSongAsync()
    {
        // ARRANGE
        SongPostRequest request = new(album: "Meteora", artist: "Linkin Park", path: "https://foobar.com/numb.mp3", title: "Numb")
        {
            Length = 185,
            IsFavorite = false
        };

        MusicDocument expected = new()
        {
            Id = ObjectId.GenerateNewId().ToString(),
            Artist = request.Artist,
            Album = request.Album,
            Path = request.Path,
            Title = request.Title,
            Length = request.Length,
            IsFavorite = request.IsFavorite,
            CreateDate = DateTime.UtcNow,
            UpdateDate = DateTime.UtcNow
        };

        _repo
            .Setup(m => m.AddMusicAsync(It.Is<MusicDocument>(r => (
                r.Album == request.Album &&
                r.Artist == request.Artist &&
                r.Path == request.Path &&
                r.Title == request.Title &&
                r.Length == request.Length &&
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
                r.Length == request.Length &&
                r.IsFavorite == request.IsFavorite
        ))));
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
            .Callback(() => expected.IsFavorite = expected.IsFavorite)
            .ReturnsAsync(expected);

        // ACT
        SongResponse? response = await _service.UpdateSongAsync(id, request.ToRequest());

        // ASSERT
        Assert.NotNull(response);
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