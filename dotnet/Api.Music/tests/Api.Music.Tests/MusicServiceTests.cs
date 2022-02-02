using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;
using Api.Music.Repositories;
using Api.Music.Repositories.Documents;
using Api.Music.Repositories.Models;
using Api.Music.Services;
using Moq;
using Xunit;

namespace Api.Music.Tests
{
    public class MusicServiceTests
    {
        private readonly IMusicService _service;
        private readonly Mock<IMusicRepository> _repo;
        public MusicServiceTests()
        {
            this._repo = new Mock<IMusicRepository>();
            this._service = new MusicService(this._repo.Object);
        }

        [Fact]
        public async Task CanSearchAllMusic()
        {
            // ARRANGE
            MusicDocument doc1 = new MusicDocument
            {
                Id = Guid.NewGuid().ToString(),
                Artist = "Linkin Park",
                ArtistAlphabetIndex = AlphabetType.L,
                IsFavorite = true,
                Length = 185, // 3 mins and 5 secs
                Title = "Numb",
                Path = "www.google.com/numb.mp3",
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };

            MusicDocument doc2 = new MusicDocument
            {
                Id = Guid.NewGuid().ToString(),
                Artist = "Vanessa Carlton",
                ArtistAlphabetIndex = AlphabetType.V,
                IsFavorite = false,
                Length = 240, // 4 mins
                Title = "A Thousand Miles",
                Path = "/music/1000Miles.mp3",
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };

            List<MusicDocument> expectedResponse = new List<MusicDocument>
            {
                doc1,
                doc2
            };

            this._repo
                .Setup(m => m.SearchMusicAsync(It.IsAny<MusicSearchRequest>()))
                .ReturnsAsync(expectedResponse);

            // ACT
            List<MusicResponse> response = await this._service.SearchMusicAsync(It.IsAny<MusicSearchRequest>());

            // ASSERT
            Assert.NotNull(response);
            Assert.Collection(response,
                x => AssertEqual(x, expectedResponse),
                x => AssertEqual(x, expectedResponse)
            );
            this._repo.Verify(m => m.SearchMusicAsync(It.IsAny<MusicSearchRequest>()), Times.Once);
        }

        [Fact]
        public async Task CanAddMusic()
        {
            // ARRANGE
            MusicAddRequest request = new MusicAddRequest
            {
                Artist = "Linkin Park",
                IsFavorite = true,
                Length = 185, // 3 mins and 5 secs
                Title = "Numb",
                Path = "www.google.com/numb.mp3",
            };

            MusicDocument doc1 = new MusicDocument
            {
                Id = Guid.NewGuid().ToString(),
                Artist = "Linkin Park",
                ArtistAlphabetIndex = AlphabetType.L,
                IsFavorite = true,
                Length = 185, // 3 mins and 5 secs
                Title = "Numb",
                Path = "www.google.com/numb.mp3",
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };

            this._repo
                .Setup(m => m.AddMusicAsync(It.IsAny<MusicDocument>()))
                .ReturnsAsync(doc1);

            // ACT
            MusicResponse response = await this._service.AddMusicAsync(request);

            // ASSERT
            Assert.NotNull(response);
            AssertEqual(expected: response, actual: doc1);
            this._repo.Verify(m => m.AddMusicAsync(It.IsAny<MusicDocument>()), Times.Once);
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
            MusicDocument doc = new MusicDocument
            {
                Id = id,
                Artist = "Linkin Park",
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

            this._repo
                .Setup(m => m.UpdateMusicAsync(id, It.IsAny<MusicUpdateRequest>()))
                .Returns(Task.CompletedTask);

            // ACT
            await this._service.UpdateMusicAsync(id, It.IsAny<MusicUpdateRequest>());

            // ASSERT
            this._repo.Verify(m => m.UpdateMusicAsync(id, It.IsAny<MusicUpdateRequest>()), Times.Once);
        }

        [Fact]
        public async Task CanUpdateFavoriteMusic()
        {
            // ARRANGE
            string id = Guid.NewGuid().ToString();
            MusicUpdateFavoriteRequest favoriteRequest = new MusicUpdateFavoriteRequest
            {
                IsFavorite = true
            };

            MusicDocument doc1 = new MusicDocument
            {
                Id = id,
                Artist = "Linkin Park",
                ArtistAlphabetIndex = AlphabetType.L,
                IsFavorite = false
            };

            this._repo
                .Setup(m => m.UpdateFavoriteAsync(id, favoriteRequest))
                .Callback(() => doc1.IsFavorite = favoriteRequest.IsFavorite)
                .Returns(Task.CompletedTask);

            // ACT
            await this._service.UpdateFavoriteAsync(id, favoriteRequest);

            // ASSERT
            Assert.Equal(doc1.IsFavorite, favoriteRequest.IsFavorite);
            this._repo.Verify(m => m.UpdateFavoriteAsync(id, favoriteRequest), Times.Once);
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
}
