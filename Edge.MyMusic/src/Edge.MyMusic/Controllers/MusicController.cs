using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Services;
using Edge.MyMusic.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Edge.MyMusic.Controllers;

public class MusicController : BaseController
{
    private readonly IMusicService _musicService;

    public MusicController(IMusicService musicService)
    {
        _musicService = musicService;
    }

    [HttpGet]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(CollectionModel<MusicResponse>))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SearchMusicAsync([FromQuery] MusicSearchRequest request)
    {
        return this.OkIfFound(await _musicService.SearchMusicAsync(request));
    }

    [HttpPost]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status412PreconditionFailed)]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddMusicAsync([FromBody] MusicPostRequest request)
    {
        return this.OkIfFound(await _musicService.AddMusicAsync(request));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMusicAsync([FromRoute] string id)
    {
        return this.OkIfFound(await _musicService.GetMusicAsync(id));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status412PreconditionFailed)]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateMusicAsync([FromRoute] string id, [FromBody] MusicPutRequest request)
    {
        return this.OkIfFound(await _musicService.UpdateMusicAsync(id, request));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteMusicAsync([FromRoute] string id)
    {
        await _musicService.DeleteMusicAsync(id);
        return this.NoContent();
    }

    [HttpPatch("{id}/favorite")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateFavoriteAsync([FromRoute] string id, [FromBody] MusicFavoritePatchRequest request)
    {
        return this.OkIfFound(await _musicService.UpdateMusicAsync(id, request.ToRequest()));
    }
}
