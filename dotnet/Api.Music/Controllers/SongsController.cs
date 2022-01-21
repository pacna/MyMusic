using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Music.Controllers
{
    [Route("songs")]
    public class SongsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> SearchSongs()
        {
            return this.Ok("Songs");
        }

        [HttpPost]
        public async Task<IActionResult> AddSong()
        {
            return this.Ok("Added");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSong([FromRoute] string id)
        {
            return this.Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSong([FromRoute] string id)
        {
            return this.Ok(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveSong([FromRoute] string id)
        {
            return this.Ok(id);
        }

        [HttpGet("favorites")]
        public async Task<IActionResult> GetFavorites()
        {
            return this.Ok("Favorites");
        }

        [HttpPut("favorites/{id}")]
        public async Task<IActionResult> UpdateFavoriteSong([FromRoute] string id)
        {
            return this.Ok(id);
        }

    }
}