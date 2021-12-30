using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Music.Controllers
{
    [Route("songs")]
    public class SongsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetSongs()
        {
            return this.Ok("Songs");
        }
    }
}