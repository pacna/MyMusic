using Edge.MyMusic.Controllers.Models;
using Microsoft.AspNetCore.Mvc;

namespace Edge.MyMusic.Controllers;

public class MusicController : BaseController
{

    private readonly ILogger<MusicController> _logger;

    public MusicController(ILogger<MusicController> logger)
    {
        _logger = logger;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMusicAsync([FromRoute] string id)
    {
        return this.OkIfFound(new MusicResponse());
    }
}
