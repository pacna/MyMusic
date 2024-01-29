using Edge.MyMusic.Controllers.Models;
using Edge.MyMusic.Services;
using Edge.MyMusic.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Edge.MyMusic.Controllers;

public class SongController(IMusicService musicService) : BaseController
{
    private readonly IMusicService _musicService = musicService;

    [HttpGet]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(CollectionModel<SongResponse>))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SearchSongsAsync([FromQuery] SongSearchRequest request)
    {
        return this.OkIfFound(await _musicService.SearchSongsAsync(request));
    }

    [HttpPost]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(SongResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status412PreconditionFailed)]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddSongAsync([FromBody] SongPostRequest request)
    {
        return this.OkIfFound(await _musicService.AddSongAsync(request));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(SongResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetSongAsync([FromRoute] string id)
    {
        return this.OkIfFound(await _musicService.GetSongAsync(id));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(SongResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status412PreconditionFailed)]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateSongAsync([FromRoute] string id, [FromBody] SongPutRequest request)
    {
        return this.OkIfFound(await _musicService.UpdateSongAsync(id, request));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteSongAsync([FromRoute] string id)
    {
        await _musicService.DeleteSongAsync(id);
        return this.NoContent();
    }

    [HttpPatch("{id}/favorite")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(SongResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateFavoriteAsync([FromRoute] string id, [FromBody] SongFavoritePatchRequest request)
    {
        return this.OkIfFound(await _musicService.UpdateSongAsync(id, request.ToRequest()));
    }
}
