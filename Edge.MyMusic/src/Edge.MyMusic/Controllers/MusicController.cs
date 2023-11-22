using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Services;
using Microsoft.AspNetCore.Mvc;

namespace Edge.MyMusic.Controllers;

public class MusicController : BaseController
{

    private readonly ILogger<MusicController> _logger;
    private readonly IMusicService _musicService;

    public MusicController(ILogger<MusicController> logger, IMusicService musicService)
    {
        _logger = logger;
        _musicService = musicService;
    }

    [HttpGet]
    public async Task<IActionResult> SearchMusicAsync([FromQuery] MusicSearchRequest request)
    {
        return OkIfFound(await this._musicService.SearchMusicAsync(request));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMusicAsync([FromRoute] string id)
    {
        return OkIfFound(await _musicService.GetMusicAsync(id));
    }
}
