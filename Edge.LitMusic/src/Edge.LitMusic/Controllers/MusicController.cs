using Edge.LitMusic.Controllers.Models;
using Edge.LitMusic.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Edge.LitMusic.Controllers;
[Route("music")]
public class MusicController : BaseController
{
    private readonly IMusicService _service;

    public MusicController(IMusicService service)
    {
        this._service = service;
    }

    [HttpGet]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(List<MusicResponse>))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SearchMusicAsync([FromQuery] MusicSearchRequest request)
    {
        return this.OkIfFound(await this._service.SearchMusicAsync(request: request));
    }

    [HttpPost]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status412PreconditionFailed)]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddMusicAsync([FromBody] MusicAddRequest request)
    {
        return this.OkIfFound(await this._service.AddMusicAsync(request: request));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMusicAsync([FromRoute] string id)
    {
        return this.OkIfFound(await this._service.GetMusicAsync(id: id));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateMusicAsync([FromRoute] string id, [FromBody] MusicUpdateRequest request)
    {
        return this.OkIfFound(await this._service.UpdateMusicAsync(id: id, request: request));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
    public async Task<IActionResult> RemoveMusicAsync([FromRoute] string id)
    {
        await this._service.RemoveMusicAsync(id: id);
        return this.NoContent();
    }

    [HttpPut("{id}/favorite")]
    [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
    [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateFavoriteAsync([FromRoute] string id, [FromBody] MusicUpdateFavoriteRequest request)
    {
        return this.OkIfFound(await this._service.UpdateFavoriteAsync(id: id, request: request));
    }
}