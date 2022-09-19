using Edge.LitMusic.Controllers.Models;
using Edge.LitMusic.Services;
using Xunit;

namespace Edge.LitMusic.Tests
{
    public class ValidationServiceTests
    {
        private readonly IValidationService _service;

        public ValidationServiceTests()
        {
            this._service = new ValidationService();
        }

        [Fact]
        public void CanValidateAddRequest()
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

            // ACT/ASSERT
            Assert.Throws<HttpException>(() => this._service.ThrowIfInvalid(request: request));
        }
    }
}