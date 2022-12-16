using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Edge.LitMusic.Controllers.Models;
using Edge.LitMusic.Repositories;
using Edge.LitMusic.Repositories.Documents;
using Edge.LitMusic.Repositories.Models;
using Edge.LitMusic.Services;
using Edge.LitMusic.Services.Models;
using Moq;
using Xunit;

namespace Edge.LitMusic.Tests;
public class MusicServiceTests
{
    private readonly IMusicService _service;
    private readonly Mock<IValidationService> _validationService;
    private readonly Mock<IMusicRepository> _repo;

    public MusicServiceTests()
    {
        this._repo = new Mock<IMusicRepository>();
        this._validationService = new Mock<IValidationService>();
        this._service = new MusicService(this._repo.Object, this._validationService.Object);
    }

    [Fact]
    public async Task CanSearchAllMusic()
    {
        // ARRANGE
        MusicDocument doc1 = new()
        {
            Id = Guid.NewGuid().ToString(),
            Artist = "Linkin Park",
            Album = "Meteora",
            ArtistAlphabetIndex = AlphabetType.L,
            IsFavorite = true,
            Length = 185, // 3 mins and 5 secs
            Title = "Numb",
            Path = "www.google.com/numb.mp3",
            CreatedDate = DateTime.UtcNow,
            UpdatedDate = DateTime.UtcNow
        };

        MusicDocument doc2 = new()
        {
            Id = Guid.NewGuid().ToString(),
            Artist = "Vanessa Carlton",
            Album = "Legally Blonde",
            ArtistAlphabetIndex = AlphabetType.V,
            IsFavorite = true,
            Length = 240, // 4 mins
            Title = "A Thousand Miles",
            Path = "/music/1000Miles.mp3",
            CreatedDate = DateTime.UtcNow,
            UpdatedDate = DateTime.UtcNow
        };

        List<MusicDocument> expectedResponse = new()
        {
            doc1,
            doc2
        };

        MusicSearchRequest request = new()
        {
            IsFavorite = null
        };

        this._repo
            .Setup(m => m.SearchMusicAsync(It.IsAny<SearchMusicRequest>()))
            .ReturnsAsync(expectedResponse);

        // ACT
        List<MusicResponse> response = await this._service.SearchMusicAsync(request: request);

        // ASSERT
        Assert.NotNull(response);
        Assert.Collection(response,
            x => AssertEqual(x, expectedResponse),
            x => AssertEqual(x, expectedResponse)
        );
        this._repo.Verify(m => m.SearchMusicAsync(It.IsAny<SearchMusicRequest>()), Times.Once);
    }

    [Fact]
    public async Task CanAddMusic()
    {
        // ARRANGE
        MusicAddRequest request = new()
        {
            Album = "Meteora",
            Artist = "Linkin Park",
            IsFavorite = true,
            Length = 185, // 3 mins and 5 secs
            Title = "Numb",
            Path = "www.google.com/numb.mp3",
        };

        MusicDocument doc1 = new()
        {
            Id = Guid.NewGuid().ToString(),
            Artist = "Linkin Park",
            Album = "Meteora",
            ArtistAlphabetIndex = AlphabetType.L,
            IsFavorite = true,
            Length = 185, // 3 mins and 5 secs
            Title = "Numb",
            Path = "www.google.com/numb.mp3",
            CreatedDate = DateTime.UtcNow,
            UpdatedDate = DateTime.UtcNow
        };

        this._repo
            .Setup(m => m.AddMusicAsync(It.Is<MusicDocument>(doc => doc.Artist == request.Artist)))
            .ReturnsAsync(doc1);

        // ACT
        MusicResponse response = await this._service.AddMusicAsync(request);

        // ASSERT
        Assert.NotNull(response);
        AssertEqual(expected: response, actual: doc1);
        this._repo.Verify(m => m.AddMusicAsync(It.Is<MusicDocument>(doc => doc.Artist == request.Artist)), Times.Once);
    }

    [Fact]
    public async Task CanRemoveMusic()
    {
        // ARRANGE
        string id = Guid.NewGuid().ToString();
        this._repo
            .Setup(m => m.RemoveMusicAsync(id))
            .Returns(Task.CompletedTask);

        // ACT
        await this._service.RemoveMusicAsync(id);

        // ASSERT
        this._repo.Verify(m => m.RemoveMusicAsync(id), Times.Once);
    }

    [Fact]
    public async Task CanGetMusic()
    {
        // ARRANGE
        string id = Guid.NewGuid().ToString();
        MusicDocument doc = new()
        {
            Id = id,
            Artist = "Linkin Park",
            Album = "Meteora",
            ArtistAlphabetIndex = AlphabetType.L,
            IsFavorite = true,
            Length = 185, // 3 mins and 5 secs
            Title = "Numb",
            Path = "www.google.com/numb.mp3",
            CreatedDate = DateTime.UtcNow,
            UpdatedDate = DateTime.UtcNow
        };

        this._repo
            .Setup(m => m.GetMusicAsync(id))
            .ReturnsAsync(doc);

        // ACT
        MusicResponse response = await this._service.GetMusicAsync(id);

        // ASSERT
        Assert.NotNull(response);
        AssertEqual(expected: response, actual: doc);
        this._repo.Verify(m => m.GetMusicAsync(id), Times.Once);
    }

    [Fact]
    public async Task CanUpdateMusic()
    {
        // ARRANGE
        string id = Guid.NewGuid().ToString();
        MusicUpdateRequest request = new MusicUpdateRequest
        {
            Artist = "foobar"
        };

        this._repo
            .Setup(m => m.UpdateMusicAsync(id, It.IsAny<UpdateMusicRequest>()))
            .ReturnsAsync(new MusicDocument());

        // ACT
        await this._service.UpdateMusicAsync(id, request);

        // ASSERT
        this._repo.Verify(m => m.UpdateMusicAsync(id, It.IsAny<UpdateMusicRequest>()), Times.Once);
    }

    [Fact]
    public async Task CanUpdateFavoriteMusic()
    {
        // ARRANGE
        string id = Guid.NewGuid().ToString();
        MusicUpdateFavoriteRequest favoriteRequest = new()
        {
            IsFavorite = true
        };

        MusicDocument doc1 = new()
        {
            Id = id,
            Artist = "Linkin Park",
            ArtistAlphabetIndex = AlphabetType.L,
            IsFavorite = false
        };

        this._repo
            .Setup(m => m.UpdateFavoriteAsync(id, It.Is<UpdateMusicRequest>(r => r.IsFavorite == favoriteRequest.IsFavorite)))
            .Callback(() => doc1.IsFavorite = favoriteRequest.IsFavorite)
            .ReturnsAsync(doc1);

        // ACT
        await this._service.UpdateFavoriteAsync(id, favoriteRequest);

        // ASSERT
        Assert.Equal(doc1.IsFavorite, favoriteRequest.IsFavorite);
        this._repo.Verify(m => m.UpdateFavoriteAsync(id, It.Is<UpdateMusicRequest>(r => r.IsFavorite == favoriteRequest.IsFavorite)), Times.Once);
    }

    private void AssertEqual(MusicResponse expected, IEnumerable<MusicDocument> actual)
    {
        int foundCount = 0;

        MusicDocument doc = actual.FirstOrDefault(x => x.Id == expected.Id);

        if (doc != null)
        {
            AssertEqual(expected: expected, actual: doc);
            foundCount++;
        }

        Assert.Equal(foundCount, 1);
    }

    private void AssertEqual(MusicResponse expected, MusicDocument actual)
    {
        Assert.Equal(expected.Id, actual.Id);
        Assert.Equal(expected.Artist, actual.Artist);
        Assert.Equal(expected.ArtistAlphabetCategory, actual.ArtistAlphabetIndex);
        Assert.Equal(expected.IsFavorite, actual.IsFavorite);
        Assert.Equal(expected.Length, actual.Length);
        Assert.Equal(expected.Path, actual.Path);
        Assert.Equal(expected.Title, actual.Title);
    }
}
