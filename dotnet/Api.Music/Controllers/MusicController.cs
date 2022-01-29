using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Music.Controllers.Models;
using Api.Music.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Music.Controllers
{
    [Route("music")]
    public class MusicController : ControllerBase
    {
        private readonly IMusicService _service;
        public MusicController(IMusicService service)
        {
            this._service = service;
        }

        [HttpGet]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(List<MusicResponse>))]
        public async Task<IActionResult> SearchMusic()
        {
            return this.Ok(await this._service.SearchMusic());
        }

        [HttpPost]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(MusicResponse))]
        public async Task<IActionResult> AddMusic([FromBody] MusicAddRequest request)
        {
            return this.Ok(await this._service.AddMusic(request: request));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UpdateMusic([FromRoute] string id, [FromBody] MusicUpdateRequest request)
        {
            await this._service.UpdateMusic(id: id, request: request);
            return this.NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
        public async Task<IActionResult> RemoveMusic([FromRoute] string id)
        {
            await this._service.RemoveMusic(id: id);
            return this.NoContent();
        }

        [HttpPut("favorites/{id}")]
        [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UpdateFavorite([FromRoute] string id, [FromBody] MusicUpdateFavoriteRequest request)
        {
            await this._service.UpdateFavorite(id: id, request: request);
            return this.NoContent();
        }
    }
}