using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Music.Controllers
{
    [Route("artists")]
    public class ArtistsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetArtists()
        {
            return this.Ok("Artists");
        }
    }
}