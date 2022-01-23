using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Music.Controllers
{
    [Route("music")]
    public class MusicController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> SearchMusic()
        {
            return this.Ok("Music");
        }

        [HttpPost]
        public async Task<IActionResult> AddMusic()
        {
            return this.Ok("Music");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMusic([FromRoute] string id)
        {
            return this.Ok(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveMusic([FromRoute] string id)
        {
            return this.Ok(id);
        }

        [HttpGet("favorites")]
        public async Task<IActionResult> SearchFavorites()
        {
            return this.Ok("Favorites");
        }

        [HttpPut("favorites/{id}")]
        public async Task<IActionResult> UpdateFavorite([FromRoute] string id)
        {
            return this.Ok(id);
        }
    }
}